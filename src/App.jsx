import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './locales/translations';
import { Header } from './components/Header';
import { TenderOverview } from './components/TenderOverview';
import { RequirementsLoader } from './components/RequirementsLoader';
import { FileUploadSection } from './components/FileUploadSection';
import { DocumentChecklist } from './components/DocumentChecklist';
import { PackageGeneratorModal } from './components/PackageGeneratorModal';
import { SealSignatureModal } from './components/SealSignatureModal';
import { AppFooter } from './components/AppFooter';
import { identifyDuplicates } from './utils/duplicateDetector';
import { validateAllRequirements } from './utils/statusCalculator';
import { processUploadedFile } from './utils/fileValidators';

const STORAGE_KEY_TENDER = 'tender_builder_tender';
const STORAGE_KEY_REQS = 'tender_builder_requirements';
const STORAGE_KEY_MATCHES = 'tender_builder_matches';
const STORAGE_KEY_LANG = 'tender_builder_lang';

export function App() {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEY_LANG) || 'en');
  const t = translations[lang] || translations.en;

  const [tender, setTender] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TENDER);
    return saved ? JSON.parse(saved) : null;
  });

  const [requirements, setRequirements] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REQS);
    return saved ? JSON.parse(saved) : [];
  });

  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MATCHES);
    return saved ? JSON.parse(saved) : {};
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isStampModalOpen, setIsStampModalOpen] = useState(false);
  const [stampConfig, setStampConfig] = useState(null);

  // Auto-save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  }, [lang]);

  useEffect(() => {
    if (tender) localStorage.setItem(STORAGE_KEY_TENDER, JSON.stringify(tender));
    else localStorage.removeItem(STORAGE_KEY_TENDER);
  }, [tender]);

  useEffect(() => {
    if (requirements.length > 0) localStorage.setItem(STORAGE_KEY_REQS, JSON.stringify(requirements));
    else localStorage.removeItem(STORAGE_KEY_REQS);
  }, [requirements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(matches));
  }, [matches]);

  // Re-calculate duplicate flags whenever uploadedFiles change
  const processedFiles = useMemo(() => {
    return identifyDuplicates(uploadedFiles);
  }, [uploadedFiles]);

  // Validation calculation
  const validation = useMemo(() => {
    if (!tender || requirements.length === 0) {
      return { isValid: false, issues: [], statusMap: {} };
    }
    return validateAllRequirements(
      requirements,
      matches,
      tender.submission_deadline,
      processedFiles
    );
  }, [tender, requirements, matches, processedFiles]);

  const readyCount = useMemo(() => {
    if (!validation.statusMap) return 0;
    return Object.values(validation.statusMap).filter(s => s.status === 'OK').length;
  }, [validation]);

  const handleRequirementsLoaded = (data) => {
    setTender(data.tender);
    setRequirements(data.requirements || []);
    
    // Initialize blank matches
    const initMatches = {};
    (data.requirements || []).forEach(req => {
      initMatches[req.id] = { fileId: null, expiryDate: '' };
    });
    setMatches(initMatches);
  };

  const handleQuickLoadSamplePack = async () => {
    // Determine base path for deployment portability (works on root domain, subpaths like GitHub Pages, etc.)
    const baseUrl = (import.meta.env.BASE_URL || './').replace(/\/+$/, '') + '/';
    const samplePackBase = baseUrl.startsWith('.') ? './sample-pack/' : `${baseUrl}sample-pack/`;

    // 1. Fetch requirements.json
    let reqRes = await fetch(`${samplePackBase}requirements.json`);
    if (!reqRes.ok) {
      // Fallback try relative
      reqRes = await fetch('./sample-pack/requirements.json');
    }
    if (!reqRes.ok) throw new Error('Could not find sample-pack/requirements.json');
    const data = await reqRes.json();
    handleRequirementsLoaded(data);

    // 2. Fetch sample PDF documents
    const docNames = [
      '01_financial_proposal.pdf',
      '02_technical_proposal.pdf',
      '03_tin_certificate.pdf',
      '04_vat_certificate.pdf',
      'bank_solvency.pdf',
      'experience_cert.pdf',
      'experience_cert (1).pdf',
      'scan_0042.pdf',
      'trade_license_2025.pdf',
      'trade_license_2026.pdf',
      'company_logo.png' // to demonstrate file type rejection safely
    ];

    const loadedDocs = [];
    for (const name of docNames) {
      try {
        let fileRes = await fetch(`${samplePackBase}documents/${encodeURIComponent(name)}`);
        if (!fileRes.ok) {
          fileRes = await fetch(`./sample-pack/documents/${encodeURIComponent(name)}`);
        }
        if (!fileRes.ok) continue;
        const blob = await fileRes.blob();
        const file = new File([blob], name, { type: blob.type || 'application/pdf' });
        
        try {
          const processed = await processUploadedFile(file);
          loadedDocs.push(processed);
        } catch (fileErr) {
          console.warn(`Sample file ${name} was skipped:`, fileErr.message);
        }
      } catch (err) {
        console.warn(`Failed to fetch ${name}:`, err);
      }
    }

    setUploadedFiles(loadedDocs);
  };

  const handleAutoSolveDemo = () => {
    // 1. Remove duplicate files (specifically experience_cert (1).pdf)
    const seenHashes = new Set();
    const cleanFiles = [];
    uploadedFiles.forEach(f => {
      if (!seenHashes.has(f.hash)) {
        seenHashes.add(f.hash);
        cleanFiles.push(f);
      }
    });
    setUploadedFiles(cleanFiles);

    // 2. Build the problem-free match state per sample-pack specifications
    const newMatches = {};
    const tradeLic = cleanFiles.find(f => f.name === 'trade_license_2026.pdf') || cleanFiles.find(f => f.name.includes('trade_license_2026'));
    const tinCert = cleanFiles.find(f => f.name === '03_tin_certificate.pdf') || cleanFiles.find(f => f.name.includes('tin'));
    const vatCert = cleanFiles.find(f => f.name === '04_vat_certificate.pdf') || cleanFiles.find(f => f.name.includes('vat'));
    const bankSolvency = cleanFiles.find(f => f.name === 'bank_solvency.pdf') || cleanFiles.find(f => f.name.includes('solvency'));
    const expCert = cleanFiles.find(f => f.name === 'experience_cert.pdf') || cleanFiles.find(f => f.name.includes('experience'));
    const techProposal = cleanFiles.find(f => f.name === '02_technical_proposal.pdf') || cleanFiles.find(f => f.name.includes('technical'));
    const finProposal = cleanFiles.find(f => f.name === '01_financial_proposal.pdf') || cleanFiles.find(f => f.name.includes('financial'));
    const declScan = cleanFiles.find(f => f.name === 'scan_0042.pdf') || cleanFiles.find(f => f.name.includes('scan'));

    requirements.forEach(req => {
      if (req.id === 'R01') {
        newMatches[req.id] = { fileId: tradeLic?.id || null, expiryDate: '2026-12-31' };
      } else if (req.id === 'R02') {
        newMatches[req.id] = { fileId: tinCert?.id || null, expiryDate: '' };
      } else if (req.id === 'R03') {
        newMatches[req.id] = { fileId: vatCert?.id || null, expiryDate: '' };
      } else if (req.id === 'R04') {
        newMatches[req.id] = { fileId: bankSolvency?.id || null, expiryDate: '2026-11-15' };
      } else if (req.id === 'R05') {
        newMatches[req.id] = { fileId: expCert?.id || null, expiryDate: '' };
      } else if (req.id === 'R08') {
        newMatches[req.id] = { fileId: techProposal?.id || null, expiryDate: '' };
      } else if (req.id === 'R09') {
        newMatches[req.id] = { fileId: finProposal?.id || null, expiryDate: '' };
      } else if (req.id === 'R10') {
        newMatches[req.id] = { fileId: declScan?.id || null, expiryDate: '' };
      } else {
        newMatches[req.id] = { fileId: null, expiryDate: '' };
      }
    });

    setMatches(newMatches);
    alert(t.autoSolveSuccess);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data and matches?')) {
      setTender(null);
      setRequirements([]);
      setMatches({});
      setUploadedFiles([]);
      setStampConfig(null);
      localStorage.clear();
    }
  };

  return (
    <div className="app-container">
      <Header 
        lang={lang} 
        setLang={setLang} 
        t={t} 
        onReset={handleReset} 
        hasData={!!tender}
      />

      {!tender ? (
        <RequirementsLoader 
          onRequirementsLoaded={handleRequirementsLoaded}
          onQuickLoadSamplePack={handleQuickLoadSamplePack}
          t={t}
        />
      ) : (
        <>
          <TenderOverview 
            tender={tender} 
            requirements={requirements} 
            readyCount={readyCount}
            t={t}
            onChangeRequirements={() => setTender(null)}
          />

          <div className="main-grid">
            {/* Left column: File Uploads & Management */}
            <div>
              <FileUploadSection 
                uploadedFiles={processedFiles}
                setUploadedFiles={setUploadedFiles}
                matches={matches}
                setMatches={setMatches}
                t={t}
              />
            </div>

            {/* Right column: Requirements Checklist & 1-to-1 Matching */}
            <div>
              <DocumentChecklist 
                tender={tender}
                requirements={requirements}
                matches={matches}
                setMatches={setMatches}
                uploadedFiles={processedFiles}
                statusMap={validation.statusMap}
                lang={lang}
                t={t}
                onOpenStampModal={() => setIsStampModalOpen(true)}
                onAutoSolveDemo={handleAutoSolveDemo}
              />
            </div>
          </div>

          {/* Sticky Bottom Generation Bar */}
          <PackageGeneratorModal 
            tender={tender}
            requirements={requirements}
            matches={matches}
            uploadedFiles={processedFiles}
            validation={validation}
            stampConfig={stampConfig}
            t={t}
          />
        </>
      )}

      {/* Seal / Signature Modal */}
      <SealSignatureModal 
        isOpen={isStampModalOpen}
        onClose={() => setIsStampModalOpen(false)}
        stampConfig={stampConfig}
        setStampConfig={setStampConfig}
        t={t}
      />

      {/* Developer Credit Footer (always visible at bottom) */}
      <AppFooter />
    </div>
  );
}
export default App;
