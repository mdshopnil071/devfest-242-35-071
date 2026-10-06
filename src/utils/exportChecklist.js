/**
 * Export current tender checklist as a CSV file
 */
export function exportChecklistToCSV(tender, requirements, matches, uploadedFiles, statusMap) {
  const headers = [
    'Order',
    'Document ID',
    'Document Title (EN)',
    'Document Title (BN)',
    'Type',
    'Requires Expiry',
    'Matched File Name',
    'Pages',
    'Expiry Date',
    'Status',
    'Blocks Package'
  ];

  const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);

  const rows = sortedReqs.map(req => {
    const match = matches[req.id];
    const file = match?.fileId ? uploadedFiles.find(f => f.id === match.fileId) : null;
    const stat = statusMap[req.id] || { status: 'Missing', blocks: req.mandatory };

    return [
      req.order,
      `"${req.id}"`,
      `"${req.title_en.replace(/"/g, '""')}"`,
      `"${req.title_bn.replace(/"/g, '""')}"`,
      req.mandatory ? 'Mandatory' : 'Optional',
      req.has_expiry ? 'Yes' : 'No',
      file ? `"${file.name.replace(/"/g, '""')}"` : 'None',
      file ? file.pageCount : 0,
      match?.expiryDate || '',
      `"${stat.status}"`,
      stat.blocks ? 'Yes' : 'No'
    ].join(',');
  });

  const metadata = [
    `# Tender ID: ${tender.tender_id}`,
    `# Title: ${tender.title}`,
    `# Procuring Entity: ${tender.procuring_entity}`,
    `# Bidder: ${tender.bidder}`,
    `# Submission Deadline: ${tender.submission_deadline}`,
    `# Exported At: ${new Date().toISOString()}`,
    ''
  ].join('\n');

  const csvContent = '\uFEFF' + metadata + headers.join(',') + '\n' + rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${tender.tender_id || 'Tender'}_Checklist.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
