import { readFile } from "fs/promises";
import path from "path";

export const alt = "Waldo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const data = await readFile(path.join(process.cwd(), "public", "assets", "meta", "og-image.png"));
  return new Response(new Uint8Array(data), {
    headers: { "Content-Type": contentType },
  });
}
