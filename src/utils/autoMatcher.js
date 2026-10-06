/**
 * Auto-match files to requirements based on keyword and string similarity
 */
export function autoMatchFiles(requirements, uploadedFiles, currentMatches) {
  const newMatches = { ...currentMatches };
  const matchedFileIds = new Set(
    Object.values(currentMatches)
      .map(m => m?.fileId)
      .filter(Boolean)
  );

  // Available files that are not already matched
  // If duplicate files exist, only consider the first one
  const seenHashes = new Set();
  const availableFiles = uploadedFiles.filter(f => {
    if (matchedFileIds.has(f.id)) return false;
    if (seenHashes.has(f.hash)) return false; // Skip identical duplicates
    seenHashes.add(f.hash);
    return true;
  });

  let matchCount = 0;

  // Sorting requirements by order
  const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);

  for (const req of sortedReqs) {
    // If already matched, skip
    if (newMatches[req.id]?.fileId) continue;

    const keywordsEn = req.title_en.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    
    // Score each available file
    let bestFile = null;
    let highestScore = 0;

    for (const file of availableFiles) {
      if (matchedFileIds.has(file.id)) continue;

      const fname = file.name.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      let score = 0;

      // Exact phrase match
      if (fname.includes(req.title_en.toLowerCase())) {
        score += 10;
      }

      // Keyword matches
      for (const kw of keywordsEn) {
        if (fname.includes(kw)) {
          score += 3;
        }
      }

      // Specific known terms
      if (req.id === 'R01' && (fname.includes('trade') || fname.includes('license'))) score += 5;
      if (req.id === 'R02' && fname.includes('tin')) score += 5;
      if (req.id === 'R03' && fname.includes('vat')) score += 5;
      if (req.id === 'R04' && (fname.includes('solvency') || fname.includes('bank'))) score += 5;
      if (req.id === 'R05' && fname.includes('experience')) score += 5;
      if (req.id === 'R06' && (fname.includes('audit') || fname.includes('financial_statement'))) score += 5;
      if (req.id === 'R07' && (fname.includes('authorization') || fname.includes('manufacturer'))) score += 5;
      if (req.id === 'R08' && fname.includes('technical')) score += 5;
      if (req.id === 'R09' && fname.includes('financial') && !fname.includes('statement')) score += 5;
      if (req.id === 'R10' && (fname.includes('declaration') || fname.includes('scan'))) score += 4;

      if (score > highestScore && score >= 3) {
        highestScore = score;
        bestFile = file;
      }
    }

    if (bestFile) {
      newMatches[req.id] = {
        fileId: bestFile.id,
        expiryDate: newMatches[req.id]?.expiryDate || ''
      };
      matchedFileIds.add(bestFile.id);
      matchCount++;
    }
  }

  return { newMatches, matchCount };
}
