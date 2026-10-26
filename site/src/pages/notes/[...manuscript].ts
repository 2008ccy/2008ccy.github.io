import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { manuscriptFiles } from "../../../scripts/manuscripts.mjs";

export const getStaticPaths: GetStaticPaths = async () => {
  const root = fileURLToPath(new URL("../../../../", import.meta.url));
  return (await manuscriptFiles(root)).map(file => ({
    params: { manuscript: file.route },
    props: { source: file.source },
  }));
};

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await readFile(props.source)), {
    headers: { "Content-Type": "application/pdf" },
  });
