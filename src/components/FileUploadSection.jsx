import React, { useRef, useState } from 'react';
import { Upload, FileText, Trash2, AlertTriangle, Copy, ExternalLink, AlertOctagon } from 'lucide-react';
import { processUploadedFile } from '../utils/fileValidators';

export function FileUploadSection({ 
  uploadedFiles, 
  setUploadedFiles, 
  matches, 
  setMatches, 
  t 
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage('');
    setIsProcessing(true);

    const newFiles = [];
    const errors = [];

    // Max 30 files & 50MB limit check (Section 8)
    if (uploadedFiles.length + fileList.length > 30) {
      setErrorMessage('Limit reached: Maximum 30 files can be uploaded.');
      setIsProcessing(false);
      return;
    }

    const currentTotalSize = uploadedFiles.reduce((sum, f) => sum + (f.size || 0), 0);
    const incomingSize = Array.from(fileList).reduce((sum, f) => sum + (f.size || 0), 0);
    if (currentTotalSize + incomingSize > 50 * 1024 * 1024) {
      setErrorMessage('Limit reached: Total file size cannot exceed 50 MB.');
      setIsProcessing(false);
      return;
    }

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      try {
        const processed = await processUploadedFile(file);
        newFiles.push(processed);
      } catch (err) {
        if (err.message === 'NOT_A_PDF' || err.message === 'INVALID_PDF_FORMAT') {
          errors.push(`"${file.name}": ${t.nonPdfRejected}`);
        } else if (err.message === 'DAMAGED_OR_ENCRYPTED_PDF') {
          errors.push(`"${file.name}": ${t.badPdfError}`);
        } else {
          errors.push(`"${file.name}": Failed to process file.`);
        }
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(' | '));
    }

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }

    setIsProcessing(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId) => {
    // Remove from uploadedFiles
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    
    // Also unmatch from any matched requirements
    setMatches(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(reqId => {
        if (updated[reqId]?.fileId === fileId) {
          updated[reqId] = {
            ...updated[reqId],
            fileId: null
          };
        }
      });
      return updated;
    });
  };

  const previewFile = (file) => {
    const blob = new Blob([file.arrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const duplicatesExist = uploadedFiles.some(f => f.isDuplicate);

  // Auto remove redundant duplicates (keep the primary one)
  const handleRemoveRedundantDuplicates = () => {
    const seenHashes = new Set();
    const filesToKeep = [];
    const removedFileIds = new Set();

    uploadedFiles.forEach(file => {
      if (!seenHashes.has(file.hash)) {
        seenHashes.add(file.hash);
        filesToKeep.push(file);
      } else {
        removedFileIds.add(file.id);
      }
    });

    setUploadedFiles(filesToKeep);

    // Unmatch any removed duplicates
    setMatches(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(reqId => {
        if (removedFileIds.has(updated[reqId]?.fileId)) {
          updated[reqId] = { ...updated[reqId], fileId: null };
        }
      });
      return updated;
    });
  };

  // Find names of duplicate files for clear explanation
  const duplicateNames = uploadedFiles
    .filter(f => f.isDuplicate)
    .map(f => f.name)
    .join(', ');

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="var(--accent-primary)" />
          {t.uploadFiles} ({uploadedFiles.length})
        </h3>
      </div>

      {/* Drag & Drop Area */}
      <div 
        className={`dropzone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{ marginBottom: '16px' }}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Upload size={32} color="var(--accent-primary)" style={{ margin: '0 auto 10px', display: 'block' }} />
        <p style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', marginBottom: '4px' }}>
          {isProcessing ? 'Processing files...' : t.dropHere}
        </p>
        <p style={{ color: 'var(--text-sub)', fontSize: '0.785rem' }}>
          {t.uploadFilesDesc}
        </p>
      </div>

      {/* Error alert banner */}
      {errorMessage && (
        <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px', color: 'var(--danger-text)', fontSize: '0.825rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <AlertOctagon size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Duplicate warning banner with 1-click resolve button */}
      {duplicatesExist && (
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#fbbf24', fontSize: '0.825rem' }}>
            <Copy size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '2px' }}>
                {t.duplicateDetectedTitle || 'Duplicate Content Detected'}
              </div>
              <div style={{ color: '#fde68a', fontSize: '0.785rem', marginBottom: '8px' }}>
                {t.duplicateWarning}
                {duplicateNames && (
                  <div style={{ marginTop: '4px', fontStyle: 'italic', color: '#fcd34d' }}>
                    Duplicates found: {duplicateNames}
                  </div>
                )}
              </div>
              <button 
                className="btn btn-warning btn-sm"
                onClick={handleRemoveRedundantDuplicates}
                style={{ background: '#f59e0b', color: '#000', fontWeight: 700, padding: '5px 12px', borderRadius: '6px' }}
              >
                {t.duplicateActionRemove}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded File List */}
      <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
        {uploadedFiles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-sub)', fontSize: '0.85rem', padding: '20px 0' }}>
            {t.noFilesUploaded}
          </p>
        ) : (
          uploadedFiles.map(file => (
            <div key={file.id} className="file-item">
              <div style={{ minWidth: 0, flex: 1, marginRight: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={15} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={file.name}>
                    {file.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {file.pageCount} {file.pageCount > 1 ? t.pages : t.page} • {(file.size / 1024).toFixed(1)} KB
                  </span>
                  {file.isDuplicate && (
                    <span className="badge badge-warning" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                      <Copy size={10} />
                      {t.duplicateBadge}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => previewFile(file)}
                  title="Preview PDF"
                  style={{ padding: '6px 8px' }}
                >
                  <ExternalLink size={13} />
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => removeFile(file.id)}
                  title={t.removeFile}
                  style={{ padding: '6px 8px' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
