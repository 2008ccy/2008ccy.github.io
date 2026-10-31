import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { libraryBooks } from "../../../../scripts/books.mjs";

export const getStaticPaths: GetStaticPaths = async () =>
  (await libraryBooks(resolve(process.cwd(), ".."))).map(book => ({
    params: { book: book.route },
    props: { source: book.source },
  }));

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await readFile(props.source)), {
    headers: { "Content-Type": "application/pdf" },
  });
