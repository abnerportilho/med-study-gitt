/// <reference types="vite/client" />
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { extractLines, type PageLines } from './extract';

let pdfjs: Promise<typeof import('pdfjs-dist')> | null = null;

/** Carrega o pdf.js só quando o primeiro PDF chega (fica fora do bundle principal). */
function loadPdfJs() {
  pdfjs ??= import('pdfjs-dist').then((mod) => {
    mod.GlobalWorkerOptions.workerSrc = workerUrl;
    return mod;
  });
  return pdfjs;
}

/** Linhas de texto de um PDF escolhido pelo usuário. Tudo acontece no navegador. */
export async function readPdfFile(file: File): Promise<PageLines[]> {
  const [mod, data] = await Promise.all([loadPdfJs(), file.arrayBuffer()]);
  return extractLines(data, mod);
}
