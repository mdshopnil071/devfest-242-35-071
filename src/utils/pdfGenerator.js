import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generate the final Tender Package PDF adhering strictly to Section 6 and Bonus rules
 */
export async function generateTenderPackage({
  tender,
  requirements,
  matches,
  uploadedFiles,
  options = { includeIndexPage: true, stampConfig: null }
}) {
  const mergedPdf = await PDFDocument.create();
  const fontRegular = await mergedPdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await mergedPdf.embedFont(StandardFonts.HelveticaBold);

  const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);

  // Filter only matched requirements (skip optional documents with no file as per 6.2)
  const includedDocs = [];
  for (const req of sortedReqs) {
    const match = matches[req.id];
    if (match && match.fileId) {
      const file = uploadedFiles.find(f => f.id === match.fileId);
      if (file) {
        includedDocs.push({
          req,
          match,
          file
        });
      }
    }
  }

  // Pre-calculate page counts and starting page numbers for Index Page
  const hasIndexPage = !!options.includeIndexPage;
  const initialOffset = hasIndexPage ? 2 : 1; // 1 = cover only, 2 = cover + index

  let runningPageNumber = initialOffset + 1;
  const docPageRanges = includedDocs.map(item => {
    const startPage = runningPageNumber;
    const endPage = runningPageNumber + item.file.pageCount - 1;
    runningPageNumber += item.file.pageCount;
    return {
      ...item,
      startPage,
      endPage
    };
  });

  const packageDate = new Date().toISOString().split('T')[0];

  // -------------------------------------------------------------
  // 6.1 PAGE 1: COVER PAGE (A4, 595.28 x 841.89 pt) in English
  // -------------------------------------------------------------
  const coverPage = mergedPdf.addPage([595.28, 841.89]);
  const pageWidth = 595.28;
  const pageHeight = 841.89;

  // Header Banner Background
  coverPage.drawRectangle({
    x: 0,
    y: pageHeight - 110,
    width: pageWidth,
    height: 110,
    color: rgb(0.08, 0.16, 0.32) // Deep navy
  });

  coverPage.drawText('TENDER SUBMISSION PACKAGE', {
    x: 40,
    y: pageHeight - 50,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1)
  });

  coverPage.drawText('Official Bid Documentation Package', {
    x: 40,
    y: pageHeight - 75,
    size: 11,
    font: fontRegular,
    color: rgb(0.8, 0.88, 1)
  });

  // Tender Details Box
  let yPos = pageHeight - 145;

  const drawField = (label, value) => {
    coverPage.drawText(label, {
      x: 40,
      y: yPos,
      size: 10,
      font: fontBold,
      color: rgb(0.3, 0.35, 0.42)
    });
    coverPage.drawText(String(value || 'N/A'), {
      x: 200,
      y: yPos,
      size: 10.5,
      font: fontRegular,
      color: rgb(0.1, 0.12, 0.15)
    });
    yPos -= 22;
  };

  drawField('Tender ID:', tender.tender_id);
  drawField('Tender Title:', tender.title);
  drawField('Procuring Entity:', tender.procuring_entity);
  drawField('Bidder Name:', tender.bidder);
  drawField('Submission Deadline:', tender.submission_deadline);
  drawField('Package Created Date:', packageDate);

  // Divider Line
  yPos -= 8;
  coverPage.drawLine({
    start: { x: 40, y: yPos },
    end: { x: pageWidth - 40, y: yPos },
    thickness: 1,
    color: rgb(0.85, 0.88, 0.92)
  });
  yPos -= 25;

  // List of Included Documents in Order (Rule 6.1)
  coverPage.drawText('LIST OF INCLUDED DOCUMENTS (IN ORDER)', {
    x: 40,
    y: yPos,
    size: 11.5,
    font: fontBold,
    color: rgb(0.08, 0.16, 0.32)
  });
  yPos -= 20;

  // Table header
  coverPage.drawRectangle({
    x: 40,
    y: yPos - 5,
    width: pageWidth - 80,
    height: 22,
    color: rgb(0.94, 0.96, 0.98)
  });

  coverPage.drawText('#', { x: 50, y: yPos, size: 9, font: fontBold, color: rgb(0.3, 0.35, 0.4) });
  coverPage.drawText('Document Name', { x: 80, y: yPos, size: 9, font: fontBold, color: rgb(0.3, 0.35, 0.4) });
  coverPage.drawText('Type', { x: 310, y: yPos, size: 9, font: fontBold, color: rgb(0.3, 0.35, 0.4) });
  coverPage.drawText('Expiry Date', { x: 385, y: yPos, size: 9, font: fontBold, color: rgb(0.3, 0.35, 0.4) });
  coverPage.drawText('Pages', { x: 495, y: yPos, size: 9, font: fontBold, color: rgb(0.3, 0.35, 0.4) });

  yPos -= 24;

  docPageRanges.forEach((item, idx) => {
    if (yPos < 60) return; // Prevent overflowing cover page

    const isEven = idx % 2 === 0;
    if (isEven) {
      coverPage.drawRectangle({
        x: 40,
        y: yPos - 4,
        width: pageWidth - 80,
        height: 19,
        color: rgb(0.98, 0.99, 1.0)
      });
    }

    coverPage.drawText(String(item.req.order), { x: 50, y: yPos, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    
    // Truncate title if too long
    let titleStr = item.req.title_en;
    if (titleStr.length > 38) titleStr = titleStr.substring(0, 35) + '...';
    coverPage.drawText(titleStr, { x: 80, y: yPos, size: 9, font: fontRegular, color: rgb(0.1, 0.1, 0.1) });

    const typeStr = item.req.mandatory ? 'Mandatory' : 'Optional';
    coverPage.drawText(typeStr, { x: 310, y: yPos, size: 8.5, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });

    const expStr = item.req.has_expiry ? (item.match.expiryDate || 'N/A') : '-';
    coverPage.drawText(expStr, { x: 385, y: yPos, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });

    coverPage.drawText(`${item.file.pageCount}`, { x: 505, y: yPos, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });

    yPos -= 20;
  });

  // -------------------------------------------------------------
  // BONUS: INDEX PAGE (Table of Contents with Starting Page)
  // -------------------------------------------------------------
  if (hasIndexPage) {
    const indexPage = mergedPdf.addPage([595.28, 841.89]);
    let idxY = pageHeight - 60;

    indexPage.drawText('DOCUMENT INDEX & DIRECTORY', {
      x: 40,
      y: idxY,
      size: 16,
      font: fontBold,
      color: rgb(0.08, 0.16, 0.32)
    });
    idxY -= 20;

    indexPage.drawText('Detailed page location for each attached document in this package', {
      x: 40,
      y: idxY,
      size: 10,
      font: fontRegular,
      color: rgb(0.4, 0.45, 0.5)
    });
    idxY -= 35;

    // Index Table Header
    indexPage.drawRectangle({
      x: 40,
      y: idxY - 5,
      width: pageWidth - 80,
      height: 22,
      color: rgb(0.92, 0.94, 0.97)
    });

    indexPage.drawText('Order', { x: 50, y: idxY, size: 9, font: fontBold, color: rgb(0.2, 0.25, 0.3) });
    indexPage.drawText('Document Title', { x: 100, y: idxY, size: 9, font: fontBold, color: rgb(0.2, 0.25, 0.3) });
    indexPage.drawText('Attached File', { x: 300, y: idxY, size: 9, font: fontBold, color: rgb(0.2, 0.25, 0.3) });
    indexPage.drawText('Start Page', { x: 440, y: idxY, size: 9, font: fontBold, color: rgb(0.2, 0.25, 0.3) });
    indexPage.drawText('End Page', { x: 505, y: idxY, size: 9, font: fontBold, color: rgb(0.2, 0.25, 0.3) });
    idxY -= 25;

    docPageRanges.forEach((item, idx) => {
      if (idxY < 60) return;

      if (idx % 2 === 0) {
        indexPage.drawRectangle({
          x: 40,
          y: idxY - 4,
          width: pageWidth - 80,
          height: 19,
          color: rgb(0.97, 0.98, 0.99)
        });
      }

      indexPage.drawText(String(item.req.order), { x: 55, y: idxY, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
      
      let tName = item.req.title_en;
      if (tName.length > 32) tName = tName.substring(0, 30) + '...';
      indexPage.drawText(tName, { x: 100, y: idxY, size: 9, font: fontBold, color: rgb(0.1, 0.1, 0.1) });

      let fName = item.file.name;
      if (fName.length > 25) fName = fName.substring(0, 23) + '...';
      indexPage.drawText(fName, { x: 300, y: idxY, size: 8.5, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });

      indexPage.drawText(`Page ${item.startPage}`, { x: 445, y: idxY, size: 9, font: fontBold, color: rgb(0.1, 0.35, 0.7) });
      indexPage.drawText(`Page ${item.endPage}`, { x: 510, y: idxY, size: 9, font: fontRegular, color: rgb(0.4, 0.4, 0.4) });

      idxY -= 20;
    });
  }

  // -------------------------------------------------------------
  // 6.2 MERGE ATTACHED DOCUMENTS IN ORDER
  // -------------------------------------------------------------
  for (const item of docPageRanges) {
    const srcDoc = await PDFDocument.load(item.file.arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
    copiedPages.forEach(p => mergedPdf.addPage(p));
  }

  // -------------------------------------------------------------
  // BONUS: EMBED SEAL / SIGNATURE IF PROVIDED
  // -------------------------------------------------------------
  let embeddedStamp = null;
  if (options.stampConfig && options.stampConfig.pngBuffer) {
    try {
      embeddedStamp = await mergedPdf.embedPng(options.stampConfig.pngBuffer);
    } catch (err) {
      console.warn('Failed to embed stamp PNG:', err);
    }
  }

  // -------------------------------------------------------------
  // 6.3 & 6.4: FOOTER ON EVERY PAGE (<tender_id> | Page X of Y)
  // -------------------------------------------------------------
  const totalPages = mergedPdf.getPageCount();
  const allPages = mergedPdf.getPages();

  for (let i = 0; i < totalPages; i++) {
    const page = allPages[i];
    const { width } = page.getSize();
    const pageNumber = i + 1;
    const footerText = `${tender.tender_id} | Page ${pageNumber} of ${totalPages}`;

    const textWidth = fontRegular.widthOfTextAtSize(footerText, 9);
    const xPos = (width - textWidth) / 2;
    const yPosFooter = 15;

    // Clean background pill for readability without obscuring document content (Rule 6.4)
    page.drawRectangle({
      x: xPos - 8,
      y: yPosFooter - 4,
      width: textWidth + 16,
      height: 15,
      color: rgb(1, 1, 1),
      opacity: 0.92
    });

    // Draw Footer Text
    page.drawText(footerText, {
      x: xPos,
      y: yPosFooter,
      size: 9,
      font: fontRegular,
      color: rgb(0.2, 0.22, 0.28)
    });

    // Draw Seal / Signature if targeted
    if (embeddedStamp) {
      const targetOption = options.stampConfig.applyTo || 'all';
      let shouldStamp = false;

      if (targetOption === 'all') shouldStamp = true;
      else if (targetOption === 'first' && pageNumber === 1) shouldStamp = true;
      else if (targetOption === 'last' && pageNumber === totalPages) shouldStamp = true;

      if (shouldStamp) {
        const stampW = 100;
        const stampH = (embeddedStamp.height / embeddedStamp.width) * stampW;
        page.drawImage(embeddedStamp, {
          x: width - stampW - 35,
          y: 35,
          width: stampW,
          height: stampH,
          opacity: 0.88
        });
      }
    }
  }

  // Save final combined PDF
  const pdfBytes = await mergedPdf.save();
  return {
    pdfBytes,
    filename: `${tender.tender_id}_Package.pdf`,
    totalPages
  };
}
