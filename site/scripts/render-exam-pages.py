"""Render visible exams for the website; run with Python and pypdfium2 installed."""
import hashlib
import json
from pathlib import Path

import pypdfium2 as pdfium

root = Path(__file__).resolve().parents[2]
catalog = json.loads((root / "test/catalog.json").read_text())
output = root / "site/public/exams"
output.mkdir(parents=True, exist_ok=True)
manifest = {}
for subject in ["caculus_test", "linalg_test"]:
    for source in sorted((root / "test" / subject).rglob("*.pdf")):
        route = source.relative_to(root / "test").as_posix()
        if route in catalog.get("hidden", []):
            continue
        digest = hashlib.sha256(source.read_bytes()).hexdigest()
        directory = output / digest[:16]
        directory.mkdir(exist_ok=True)
        document = pdfium.PdfDocument(str(source))
        answer_start = catalog.get("answersStart", {}).get(route)
        if answer_start is not None and not 1 < answer_start <= len(document):
            raise ValueError(f"Invalid answer start: {route}")
        pages = []
        for index in range(len(document)):
            filename = f"page-{index + 1:02}.webp"
            page = document[index]
            bitmap = page.render(scale=2)
            image = bitmap.to_pil().convert("RGB")
            image.save(directory / filename, "WEBP", quality=90, method=6)
            pages.append({"src": f"exams/{digest[:16]}/{filename}", "width": image.width, "height": image.height})
            bitmap.close()
            page.close()
        document.close()
        manifest[route] = {"sha256": digest, "answersStart": answer_start, "pages": pages}
        print(f"Rendered {route}: {len(pages)} pages", flush=True)
(output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
