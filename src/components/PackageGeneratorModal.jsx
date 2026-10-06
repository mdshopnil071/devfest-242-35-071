import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  AlertOctagon, 
  Loader2, 
  BookOpen, 
  CheckCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateTenderPackage } from '../utils/pdfGenerator';

export function PackageGeneratorModal({
  tender,
  requirements,
  matches,
  uploadedFiles,
  validation,
  stampConfig,
  t
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeIndexPage, setIncludeIndexPage] = useState(true);
  const [generatedPdfBlob, setGeneratedPdfBlob] = useState(null);
  const [generatedFilename, setGeneratedFilename] = useState('');
  const [totalPagesGenerated, setTotalPagesGenerated] = useState(0);

  const { isValid, issues } = validation;

  const handleGenerate = async () => {
    if (!isValid || isGenerating) return;

    try {
      setIsGenerating(true);
      const { pdfBytes, filename, totalPages } = await generateTenderPackage({
        tender,
        requirements,
        matches,
        uploadedFiles,
        options: {
          includeIndexPage,
          stampConfig
        }
      });

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setGeneratedPdfBlob(blob);
      setGeneratedFilename(filename);
      setTotalPagesGenerated(totalPages);

      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.85 }
      });

      // Automatically trigger download as per 4.8
      triggerDownload(blob, filename);
    } catch (err) {
      console.error('Error generating package:', err);
      alert('Failed to generate package: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return (
    <div className="generation-bar">
      <div className="generation-bar-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '16px', flexWrap: 'wrap' }}>
        {/* Left side: Status summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isValid ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
              <CheckCircle size={22} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>All Requirements Satisfied</div>
                <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>Ready to assemble final PDF package</div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171' }}>
              <AlertOctagon size={24} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  {t.blockingIssuesCount.replace('{count}', issues.length)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '520px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {issues[0]?.reason} {issues.length > 1 ? `(+${issues.length - 1} more)` : ''}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Controls & Generate Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <input 
              type="checkbox" 
              checked={includeIndexPage} 
              onChange={(e) => setIncludeIndexPage(e.target.checked)} 
              style={{ cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
            />
            <BookOpen size={15} />
            <span>{t.includeIndexPage}</span>
          </label>

          {generatedPdfBlob && isValid && (
            <button 
              className="btn btn-secondary" 
              onClick={() => triggerDownload(generatedPdfBlob, generatedFilename)}
              title="Download again"
            >
              <Download size={16} />
              <span>{generatedFilename}</span>
            </button>
          )}

          <button
            className={`btn ${isValid ? 'btn-success' : 'btn-primary'}`}
            onClick={handleGenerate}
            disabled={!isValid || isGenerating}
            style={{ minWidth: '200px' }}
            title={!isValid ? issues.map(i => i.reason).join('\n') : t.generatePackage}
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>{t.generating}</span>
              </>
            ) : (
              <>
                <FileCheck2 size={18} />
                <span>{t.generatePackage}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Persistent Developer Credit Line */}
      <div className="generation-bar-credit">
        Developed by <strong className="developer-name">Md. Khairul Anam Shopnil</strong>
      </div>
    </div>
  );
}
