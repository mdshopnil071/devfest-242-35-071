/**
 * Calculate SHA-256 hash of an ArrayBuffer using native browser crypto API
 */
export async function calculateHash(arrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Identify duplicate files based on content hash.
 * If two or more files have identical content, they are marked with duplicateOf or duplicateGroup.
 */
export function identifyDuplicates(filesList) {
  const hashToFiles = {};
  
  filesList.forEach(file => {
    if (!hashToFiles[file.hash]) {
      hashToFiles[file.hash] = [];
    }
    hashToFiles[file.hash].push(file.id);
  });

  return filesList.map(file => {
    const matchingIds = hashToFiles[file.hash] || [];
    const isDuplicate = matchingIds.length > 1;
    return {
      ...file,
      isDuplicate,
      duplicateIds: matchingIds.filter(id => id !== file.id)
    };
  });
}
