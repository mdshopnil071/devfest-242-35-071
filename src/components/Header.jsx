import React from 'react';
import { FileStack, Languages, RotateCcw, CheckCheck } from 'lucide-react';

export function Header({ lang, setLang, t, onReset, hasData }) {
  return (
    <header className="app-header">
      <div className="brand-wrapper">
        <div className="brand-icon">
          <FileStack size={26} />
        </div>
        <div>
          <h1 className="brand-title">{t.appTitle}</h1>
          <p className="brand-subtitle">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="header-actions">
        {hasData && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.785rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '8px' }}>
            <CheckCheck size={14} />
            <span>{t.saveStateNotice}</span>
          </div>
        )}

        <button 
          className="lang-toggle-btn" 
          onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
          title="Switch Language / ভাষা পরিবর্তন"
        >
          <Languages size={17} />
          <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
        </button>

        {hasData && (
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={onReset}
            title={t.resetBtn}
            style={{ padding: '8px 12px' }}
          >
            <RotateCcw size={15} />
            <span>{t.resetBtn}</span>
          </button>
        )}
      </div>
    </header>
  );
}
