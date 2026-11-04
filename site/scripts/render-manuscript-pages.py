"""Render publishable handwritten PDFs into cached WebP pages for the site."""

import argparse
import hashlib
import json
from pathlib import Path
import subprocess

import pypdfium2 as pdfium


def inventory(root):
    code = """
const { publishedManuscripts } = await import(process.argv[1]);
process.stdout.write(JSON.stringify(await publishedManuscripts(process.argv[2])));
"""
    result = subprocess.run(
        ["node", "--input-type=module", "-e", code,
         (root / "site/scripts/manuscripts.mjs").as_uri(), str(root)],
        text=True, capture_output=True, check=True,
    )
    return json.loads(result.stdout)


def hash_file(path):
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def cached(entry, digest, public):
    if not entry or entry.get("sha256") != digest or not entry.get("pages"):
        return False
    for page in entry["pages"]:
        src = page.get("src", "")
        if not src.startswith(f"manuscripts/{digest[:16]}/"):
            return False
        target = public / src
        if (not target.is_file() or not target.stat().st_size
                or not isinstance(page.get("width"), int) or page["width"] <= 0
                or not isinstance(page.get("height"), int) or page["height"] <= 0):
            return False
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", action="append", default=[],
                        help="Render only this manuscript route or absolute PDF path; repeatable")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    public = root / "site/public"
    output = public / "manuscripts"
    output.mkdir(parents=True, exist_ok=True)
    manifest_path = output / "manifest.json"
    old = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    files = inventory(root)
    requested = set(args.source)
    selected = [file for file in files if not requested
                or file["route"] in requested or file["source"] in requested]
    unmatched = requested - {value for file in selected
                             for value in (file["route"], file["source"])}
    if unmatched:
        parser.error("Not a publishable manuscript: " + ", ".join(sorted(unmatched)))
    # Drop stale catalog records, while retaining images and all unrelated files.
    manifest = {file["route"]: old[file["route"]] for file in files if file["route"] in old}
    for file in selected:
        source = Path(file["source"])
        route = file["route"]
        digest = hash_file(source)
        if cached(manifest.get(route), digest, public):
            print(f"Cached {route}: {len(manifest[route]['pages'])} pages", flush=True)
            continue
        # Identical copies of a PDF share page files and metadata.
        same = next((entry for entry in manifest.values() if cached(entry, digest, public)), None)
        if same:
            manifest[route] = same
            print(f"Reused {route}: {len(same['pages'])} pages", flush=True)
            continue
        directory = output / digest[:16]
        directory.mkdir(exist_ok=True)
        document = pdfium.PdfDocument(str(source))
        pages = []
        try:
            for index in range(len(document)):
                filename = f"page-{index + 1:02}.webp"
                page = document[index]
                bitmap = None
                try:
                    bitmap = page.render(scale=2)
                    image = bitmap.to_pil().convert("RGB")
                    image.save(directory / filename, "WEBP", quality=90, method=6)
                    pages.append({"src": f"manuscripts/{digest[:16]}/{filename}",
                                  "width": image.width, "height": image.height})
                    image.close()
                finally:
                    if bitmap is not None:
                        bitmap.close()
                    page.close()
        finally:
            document.close()
        if not pages:
            raise ValueError(f"Manuscript has no pages: {route}")
        manifest[route] = {"sha256": digest, "pages": pages}
        # Save progress after each PDF, so an interrupted run resumes cheaply.
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
        print(f"Rendered {route}: {len(pages)} pages", flush=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
