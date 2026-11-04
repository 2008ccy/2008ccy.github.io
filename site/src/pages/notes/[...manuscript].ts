import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { publishedManuscripts } from "../../../scripts/manuscripts.mjs";

export const getStaticPaths: GetStaticPaths = async () => {
  const root = resolve(process.cwd(), "..");
  return (await publishedManuscripts(root)).map(file => ({
    params: { manuscript: file.route },
    props: { source: file.source },
  }));
};

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await readFile(props.source)), {
    headers: { "Content-Type": "application/pdf" },
  });
