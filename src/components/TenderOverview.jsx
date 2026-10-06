import React from 'react';
import { Building2, Calendar, FileCheck, Layers, UserCheck } from 'lucide-react';

export function TenderOverview({ tender, requirements, readyCount, t, onChangeRequirements }) {
  if (!tender) return null;

  const total = requirements.length;
  const mandatoryCount = requirements.filter(r => r.mandatory).length;
  const optionalCount = total - mandatoryCount;

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="badge badge-info" style={{ marginBottom: '6px' }}>
            {t.tenderId}: {tender.tender_id}
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
            {tender.title}
          </h2>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={onChangeRequirements}>
          {t.changeRequirements}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
            <Building2 size={16} />
            <span>{t.procuringEntity}</span>
          </div>
          <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{tender.procuring_entity}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
            <UserCheck size={16} />
            <span>{t.bidder}</span>
          </div>
          <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{tender.bidder}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
            <Calendar size={16} />
            <span>{t.submissionDeadline}</span>
          </div>
          <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.95rem', fontFamily: 'monospace' }}>
            {tender.submission_deadline}
          </div>
        </div>
      </div>

      {/* Progress pill stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
        <span className="badge badge-secondary">
          <Layers size={13} />
          {total} Documents Total
        </span>
        <span className="badge badge-danger">
          {mandatoryCount} {t.mandatory}
        </span>
        <span className="badge badge-secondary">
          {optionalCount} {t.optional}
        </span>
        <span className={`badge ${readyCount === total ? 'badge-success' : 'badge-warning'}`} style={{ marginLeft: 'auto' }}>
          <FileCheck size={13} />
          {t.resolvedSummary.replace('{ready}', readyCount).replace('{total}', total)}
        </span>
      </div>
    </div>
  );
}
