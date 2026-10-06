import React, { useRef, useState } from 'react';
import { FileJson, UploadCloud, Zap, AlertCircle, FileCode } from 'lucide-react';
import { processUploadedFile } from '../utils/fileValidators';

export function RequirementsLoader({ onRequirementsLoaded, onQuickLoadSamplePack, t }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [loadingSample, setLoadingSample] = useState(false);

  const handleJsonUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.tender || !Array.isArray(parsed.requirements)) {
          throw new Error('Invalid structure. Must contain "tender" object and "requirements" array.');
        }
        onRequirementsLoaded(parsed);
      } catch (err) {
        setError('Failed to parse requirements.json: ' + err.message);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file.');
    };
    reader.readAsText(file);
  };

  const handleQuickLoad = async () => {
    try {
      setLoadingSample(true);
      setError('');
      await onQuickLoadSamplePack();
    } catch (err) {
      setError('Failed to load sample pack: ' + err.message);
    } finally {
      setLoadingSample(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '40px auto' }}>
      <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#fff', boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)' }}>
          <FileJson size={34} />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          {t.loadRequirements}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
          {t.uploadJSONDesc}
        </p>

        {error && (
          <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: 'var(--danger-text)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Button */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleJsonUpload}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', maxWidth: '340px', padding: '12px 20px' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud size={20} />
            <span>{t.selectFiles} (requirements.json)</span>
          </button>

          <div style={{ color: 'var(--text-sub)', fontSize: '0.8rem', margin: '4px 0' }}>
            — OR FOR INSTANT CONTEST JUDGING —
          </div>

          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', maxWidth: '340px', padding: '12px 20px', borderColor: 'rgba(99, 102, 241, 0.4)', background: 'rgba(99, 102, 241, 0.08)' }}
            onClick={handleQuickLoad}
            disabled={loadingSample}
          >
            <Zap size={18} color="#818cf8" />
            <span>{loadingSample ? t.loadingSample : t.loadSamplePackBtn}</span>
          </button>
        </div>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '0.785rem', color: 'var(--text-sub)' }}>
          Supports tender specifications formatted per Section 2 & 4 of DevFest problem statement.
        </div>
      </div>
    </div>
  );
}
