import React from 'react';
import { 
  Sparkles, 
  FileSpreadsheet, 
  Stamp, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Clock, 
  HelpCircle,
  X,
  FileCheck,
  Zap
} from 'lucide-react';
import { autoMatchFiles } from '../utils/autoMatcher';
import { exportChecklistToCSV } from '../utils/exportChecklist';

export function DocumentChecklist({
  tender,
  requirements,
  matches,
  setMatches,
  uploadedFiles,
  statusMap,
  lang,
  t,
  onOpenStampModal,
  onAutoSolveDemo
}) {
  const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);

  // Set of all currently matched file IDs across requirements
  const matchedFileIds = new Set(
    Object.values(matches)
      .map(m => m?.fileId)
      .filter(Boolean)
  );

  // Group matched files by hash to detect duplicate conflicts
  const matchedFileHashes = new Set();
  Object.values(matches).forEach(m => {
    if (m?.fileId) {
      const f = uploadedFiles.find(file => file.id === m.fileId);
      if (f?.hash) {
        matchedFileHashes.add(f.hash);
      }
    }
  });

  const handleMatchChange = (reqId, fileId) => {
    setMatches(prev => {
      const updated = { ...prev };
      
      // If setting a file, ensure 1-to-1: remove this file from any other requirement
      if (fileId) {
        Object.keys(updated).forEach(rId => {
          if (rId !== reqId && updated[rId]?.fileId === fileId) {
            updated[rId] = { ...updated[rId], fileId: null };
          }
        });
      }

      updated[reqId] = {
        ...updated[reqId],
        fileId: fileId || null
      };

      return updated;
    });
  };

  const handleExpiryChange = (reqId, dateStr) => {
    setMatches(prev => ({
      ...prev,
      [reqId]: {
        ...prev[reqId],
        expiryDate: dateStr
      }
    }));
  };

  const handleAutoMatch = () => {
    const { newMatches, matchCount } = autoMatchFiles(requirements, uploadedFiles, matches);
    setMatches(newMatches);
    alert(t.autoMatchedSuccess.replace('{count}', matchCount));
  };

  const handleExportCSV = () => {
    exportChecklistToCSV(tender, requirements, matches, uploadedFiles, statusMap);
  };

  const getStatusBadge = (stat) => {
    if (!stat) return null;
    switch (stat.status) {
      case 'OK':
        return (
          <span className="badge badge-success" title={stat.reason}>
            <CheckCircle2 size={13} />
            {t.statusOK}
          </span>
        );
      case 'Missing':
        return (
          <span className="badge badge-danger" title={stat.reason}>
            <XCircle size={13} />
            {t.statusMissing}
          </span>
        );
      case 'Expiry date needed':
        return (
          <span className="badge badge-warning" title={stat.reason}>
            <Clock size={13} />
            {t.statusExpiryNeeded}
          </span>
        );
      case 'Expired':
        return (
          <span className="badge badge-danger" title={stat.reason}>
            <AlertCircle size={13} />
            {t.statusExpired}
          </span>
        );
      case 'Not provided':
        return (
          <span className="badge badge-secondary" title={stat.reason}>
            <HelpCircle size={13} />
            {t.statusNotProvided}
          </span>
        );
      default:
        return (
          <span className="badge badge-danger">
            {stat.status}
          </span>
        );
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      {/* Section Header & Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCheck size={22} color="var(--accent-primary)" />
            {t.checklistTitle}
          </h3>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.825rem', marginTop: '2px' }}>
            Matched files must be unique (1-to-1). Expiry dates will be validated against {tender.submission_deadline}.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {onAutoSolveDemo && (
            <button 
              className="btn btn-primary btn-sm" 
              onClick={onAutoSolveDemo}
              title={t.autoSolveDemoBtn}
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', boxShadow: '0 2px 10px rgba(16, 185, 129, 0.4)' }}
            >
              <Zap size={14} />
              <span>{t.autoSolveDemoBtn}</span>
            </button>
          )}

          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleAutoMatch}
            disabled={uploadedFiles.length === 0}
            title={t.autoMatchBtn}
          >
            <Sparkles size={15} color="#818cf8" />
            <span>{t.autoMatchBtn}</span>
          </button>

          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleExportCSV}
            title={t.exportCsvBtn}
          >
            <FileSpreadsheet size={15} color="#34d399" />
            <span>{t.exportCsvBtn}</span>
          </button>

          <button 
            className="btn btn-secondary btn-sm" 
            onClick={onOpenStampModal}
            title={t.signatureBtn}
          >
            <Stamp size={15} color="#f472b6" />
            <span>{t.signatureBtn}</span>
          </button>
        </div>
      </div>

      {/* Checklist Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="checklist-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>{t.order}</th>
              <th>{t.documentName}</th>
              <th style={{ width: '110px' }}>{t.type}</th>
              <th style={{ minWidth: '220px' }}>{t.matchedFile}</th>
              <th style={{ minWidth: '150px' }}>{t.expiryDate}</th>
              <th style={{ minWidth: '150px' }}>{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {sortedReqs.map(req => {
              const currentMatch = matches[req.id];
              const matchedFile = currentMatch?.fileId 
                ? uploadedFiles.find(f => f.id === currentMatch.fileId) 
                : null;
              const docStatus = statusMap[req.id];
              const title = lang === 'bn' ? (req.title_bn || req.title_en) : req.title_en;

              return (
                <tr key={req.id}>
                  {/* Order */}
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                      #{req.order}
                    </span>
                  </td>

                  {/* Document Name */}
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.925rem' }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontFamily: 'monospace' }}>
                      {req.id} • {req.has_expiry ? 'Requires Expiry Date' : 'No Expiry Needed'}
                    </div>
                  </td>

                  {/* Type (Mandatory / Optional) */}
                  <td>
                    {req.mandatory ? (
                      <span className="badge badge-danger">
                        {t.mandatory}
                      </span>
                    ) : (
                      <span className="badge badge-secondary">
                        {t.optional}
                      </span>
                    )}
                  </td>

                  {/* Matched File Selector */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <select
                        className="custom-select"
                        value={currentMatch?.fileId || ''}
                        onChange={(e) => handleMatchChange(req.id, e.target.value)}
                      >
                        <option value="">-- {t.selectFileToMatch} --</option>
                        {uploadedFiles.map(file => {
                          const isCurrentlySelected = currentMatch?.fileId === file.id;
                          const isMatchedElsewhere = !isCurrentlySelected && matchedFileIds.has(file.id);
                          
                          // Check if another file with the exact same content is matched to another requirement
                          const isDuplicateMatchedElsewhere = !isCurrentlySelected && 
                            file.isDuplicate && 
                            matchedFileHashes.has(file.hash);

                          return (
                            <option 
                              key={file.id} 
                              value={file.id}
                              disabled={isDuplicateMatchedElsewhere}
                            >
                              {file.name} ({file.pageCount} p)
                              {isMatchedElsewhere ? ' [Used in another doc]' : ''}
                              {isDuplicateMatchedElsewhere ? ' [Duplicate of matched file]' : ''}
                            </option>
                          );
                        })}
                      </select>

                      {currentMatch?.fileId && (
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '6px', borderRadius: '4px' }}
                          title={t.unmatchAction}
                          onClick={() => handleMatchChange(req.id, null)}
                        >
                          <X size={14} color="#f87171" />
                        </button>
                      )}
                    </div>
                    {matchedFile && (
                      <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '3px' }}>
                        ✓ {matchedFile.pageCount} pages included
                      </div>
                    )}
                  </td>

                  {/* Expiry Date Input */}
                  <td>
                    {req.has_expiry ? (
                      <div>
                        <input
                          type="date"
                          className="custom-input"
                          value={currentMatch?.expiryDate || ''}
                          onChange={(e) => handleExpiryChange(req.id, e.target.value)}
                          disabled={!currentMatch?.fileId}
                          title={!currentMatch?.fileId ? "Match a file first" : "Enter expiry date"}
                        />
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)', marginTop: '2px' }}>
                          Deadline: {tender.submission_deadline}
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-sub)', fontSize: '0.8rem' }}>
                        N/A
                      </span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td>
                    {getStatusBadge(docStatus)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
