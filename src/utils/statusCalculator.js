/**
 * Calculate status for a requirement according to Section 5
 * 
 * Statuses:
 * - Missing (Mandatory = true, no file matched) -> Blocks: true
 * - Expiry date needed (has_expiry = true, file matched, no expiry entered) -> Blocks: true
 * - Expired (expiry date < submission deadline) -> Blocks: true
 * - Not provided (Mandatory = false, no file matched) -> Blocks: false
 * - OK (File matched, and if has_expiry, expiry date >= submission deadline) -> Blocks: false
 */
export function calculateDocumentStatus(req, match, submissionDeadline) {
  const isMatched = !!match && !!match.fileId;

  if (!isMatched) {
    if (req.mandatory) {
      return {
        status: 'Missing',
        labelKey: 'statusMissing',
        blocks: true,
        reason: 'Mandatory document has no file matched.',
        variant: 'danger'
      };
    } else {
      return {
        status: 'Not provided',
        labelKey: 'statusNotProvided',
        blocks: false,
        reason: 'Optional document not provided.',
        variant: 'secondary'
      };
    }
  }

  // File is matched
  if (req.has_expiry) {
    const expiryDate = match.expiryDate ? match.expiryDate.trim() : '';
    if (!expiryDate) {
      return {
        status: 'Expiry date needed',
        labelKey: 'statusExpiryNeeded',
        blocks: true,
        reason: 'Expiry date must be specified for this document.',
        variant: 'warning'
      };
    }

    // Compare with submission_deadline (YYYY-MM-DD string comparison is ISO valid)
    if (expiryDate < submissionDeadline) {
      return {
        status: 'Expired',
        labelKey: 'statusExpired',
        blocks: true,
        reason: `Document expired on ${expiryDate} (Before submission deadline ${submissionDeadline}).`,
        variant: 'danger'
      };
    }
  }

  return {
    status: 'OK',
    labelKey: 'statusOK',
    blocks: false,
    reason: 'Document validated successfully.',
    variant: 'success'
  };
}

/**
 * Validates the entire package state.
 * Returns overall validity and blocking reasons list.
 */
export function validateAllRequirements(requirements, matches, submissionDeadline, uploadedFiles) {
  const issues = [];
  const statusMap = {};

  // Check duplicate match collision:
  // If two different requirements are matched with duplicate files (files with same content hash)
  const matchedFilesByHash = {};
  
  requirements.forEach(req => {
    const match = matches[req.id];
    const stat = calculateDocumentStatus(req, match, submissionDeadline);
    statusMap[req.id] = stat;

    if (stat.blocks) {
      issues.push({
        reqId: req.id,
        order: req.order,
        title_en: req.title_en,
        title_bn: req.title_bn,
        status: stat.status,
        reason: stat.reason
      });
    }

    if (match && match.fileId) {
      const fileObj = uploadedFiles.find(f => f.id === match.fileId);
      if (fileObj && fileObj.hash) {
        if (!matchedFilesByHash[fileObj.hash]) {
          matchedFilesByHash[fileObj.hash] = [];
        }
        matchedFilesByHash[fileObj.hash].push({ req, file: fileObj });
      }
    }
  });

  // Check duplicate matching rule (Section 4.6: "Do not allow them to be matched to different documents")
  Object.keys(matchedFilesByHash).forEach(hash => {
    const items = matchedFilesByHash[hash];
    if (items.length > 1) {
      const reqNames = items.map(i => i.req.title_en).join(', ');
      issues.push({
        isDuplicateConflict: true,
        status: 'Duplicate matched',
        reason: `Duplicate file content used across multiple documents: ${reqNames}. Each document must have unique content.`
      });
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    statusMap
  };
}
