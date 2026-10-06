import { PDFDocument } from 'pdf-lib';
import { calculateHash } from './duplicateDetector';

/**
 * Validate and process an uploaded file.
 * Returns parsed metadata or throws descriptive error.
 */
export async function processUploadedFile(file) {
  // Check extension or type
  const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
  if (!isPdf) {
    throw new Error('NOT_A_PDF');
  }

  const arrayBuffer = await file.arrayBuffer();

  // Validate PDF header magic bytes
  const header = new Uint8Array(arrayBuffer.slice(0, 5));
  const headerStr = String.fromCharCode(...header);
  if (headerStr !== '%PDF-') {
    throw new Error('INVALID_PDF_FORMAT');
  }

  // Calculate content SHA-256 hash
  const hash = await calculateHash(arrayBuffer);

  // Parse with pdf-lib to get page count and ensure valid/unlocked
  let pageCount = 1;
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
    pageCount = pdfDoc.getPageCount();
  } catch (err) {
    console.error('Failed to parse PDF:', err);
    throw new Error('DAMAGED_OR_ENCRYPTED_PDF');
  }

  return {
    id: 'f_' + Math.random().toString(36).substr(2, 9),
    name: file.name,
    size: file.size,
    pageCount,
    hash,
    arrayBuffer,
    uploadedAt: Date.now()
  };
}
