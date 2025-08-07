import fs from 'fs';
import path from 'path';

export function getImageBase64(imagePath: string) {
  const filePath = path.resolve(process.cwd(), imagePath);
  const file = fs.readFileSync(filePath);

  return `data:image/jpeg;base64,${file.toString('base64')}`;
}

export async function fetchFileAsBase64(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file from URL: ${url}`);
  }

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const contentType =
    response.headers.get('Content-Type') || 'application/octet-stream';

  return `data:${contentType};base64,${base64}`;
}
