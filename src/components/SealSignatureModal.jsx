import React, { useRef, useState } from 'react';
import { Stamp, Upload, X, Check } from 'lucide-react';

export function SealSignatureModal({ isOpen, onClose, stampConfig, setStampConfig, t }) {
  const fileInputRef = useRef(null);
  const [applyTo, setApplyTo] = useState(stampConfig?.applyTo || 'all');
  const [previewUrl, setPreviewUrl] = useState(stampConfig?.previewUrl || null);
  const [pngBuffer, setPngBuffer] = useState(stampConfig?.pngBuffer || null);

  if (!isOpen) return null;

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('png') && !file.name.toLowerCase().endsWith('.png')) {
      alert('Please upload a valid PNG image for the stamp/signature.');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const url = URL.createObjectURL(file);

    setPngBuffer(arrayBuffer);
    setPreviewUrl(url);
  };

  const handleSave = () => {
    if (pngBuffer && previewUrl) {
      setStampConfig({
        applyTo,
        previewUrl,
        pngBuffer
      });
    } else {
      setStampConfig(null);
    }
    onClose();
  };

  const handleRemove = () => {
    setPngBuffer(null);
    setPreviewUrl(null);
    setStampConfig(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Stamp size={20} color="#f472b6" />
            {t.stampModalTitle}
          </h3>
          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>
          Upload an official seal or authorized signature image to be overlaid on package pages.
        </p>

        {/* Upload area */}
        <div 
          className="dropzone"
          style={{ padding: '20px', marginBottom: '18px' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/png" 
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <Upload size={28} color="#f472b6" style={{ margin: '0 auto 8px', display: 'block' }} />
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
            {t.stampUploadLabel}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
            Transparent PNG works best
          </div>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', marginBottom: '18px', border: '1px solid var(--border-color)' }}>
            <img 
              src={previewUrl} 
              alt="Seal Preview" 
              style={{ maxWidth: '90px', maxHeight: '70px', objectFit: 'contain', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px' }}
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10b981' }}>
                Seal Image Loaded
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                Will be placed neatly at the bottom right corner of selected pages.
              </div>
            </div>
          </div>
        )}

        {/* Page selector */}
        <div style={{ marginBottom: '22px' }}>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
            {t.stampPagesOption}
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['all', 'first', 'last'].map(opt => (
              <button
                key={opt}
                type="button"
                className={`btn btn-sm ${applyTo === opt ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1 }}
                onClick={() => setApplyTo(opt)}
              >
                {opt === 'all' && t.allPages}
                {opt === 'first' && t.firstPageOnly}
                {opt === 'last' && t.lastPageOnly}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {previewUrl ? (
            <button className="btn btn-danger btn-sm" onClick={handleRemove}>
              {t.removeStamp}
            </button>
          ) : <div />}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              {t.close}
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <Check size={14} />
              {t.saveStamp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
