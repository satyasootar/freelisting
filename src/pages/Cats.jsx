import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchRandomCat } from '../api';
import PageShell from '../components/PageShell';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import { RefreshCw, ExternalLink } from 'lucide-react';

const STAT_FIELDS = [
  ['Adaptability', 'adaptability'],
  ['Affection', 'affection_level'],
  ['Child Friendly', 'child_friendly'],
  ['Dog Friendly', 'dog_friendly'],
  ['Energy', 'energy_level'],
  ['Grooming', 'grooming'],
  ['Health Issues', 'health_issues'],
  ['Intelligence', 'intelligence'],
  ['Shedding', 'shedding_level'],
  ['Social Needs', 'social_needs'],
  ['Stranger Friendly', 'stranger_friendly'],
  ['Vocalisation', 'vocalisation'],
];

const BOOL_FIELDS = [
  ['Indoor', 'indoor'],
  ['Lap Cat', 'lap'],
  ['Experimental', 'experimental'],
  ['Hairless', 'hairless'],
  ['Natural', 'natural'],
  ['Rare', 'rare'],
  ['Rex', 'rex'],
  ['Suppressed Tail', 'suppressed_tail'],
  ['Short Legs', 'short_legs'],
  ['Hypoallergenic', 'hypoallergenic'],
];

const sectionClass = 'border border-dashed border-border-dot rounded-xl p-5';
const sectionTitle = 'text-[0.7rem] font-semibold uppercase tracking-widest text-dim mb-3';
const linkClass = 'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-dashed border-border-dot text-muted transition-colors duration-150 hover:text-pink-500 hover:border-pink-500 hover:bg-surface-hover';

export default function Cats() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialized = useRef(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchRandomCat()
      .then(setCat)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      load();
    }
  }, [load]);

  return (
    <PageShell title="Random Cats">
      {loading && <Loader />}
      {error && <ErrorMsg message={error} onRetry={load} />}
      {!loading && !error && cat && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Image + Description (sticky) */}
          <div className="md:sticky md:top-20 flex flex-col gap-4">
            <div className="border border-dashed border-border-dot rounded-xl overflow-hidden bg-surface-hover">
              <img src={cat.image} alt={cat.name} width={500} className="w-full h-auto block" />
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {cat.description}
            </p>
          </div>

          {/* Right: All info */}
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl font-bold tracking-tight">{cat.name}</h2>
              <span className="text-xs font-medium text-muted px-2.5 py-0.5 border border-dashed border-border-dot rounded-full">
                {cat.origin} ({cat.country_code})
              </span>
            </div>

            {cat.alt_names && (
              <span className="text-xs text-dim italic">Also known as: {cat.alt_names}</span>
            )}

            {/* Temperament */}
            <div className={sectionClass}>
              <h3 className={sectionTitle}>Temperament</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.temperament?.split(', ').map((t) => (
                  <span key={t} className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-dashed border-pink-500 text-pink-500">{t}</span>
                ))}
              </div>
            </div>

            {/* Stat bars */}
            <div className={sectionClass}>
              <h3 className={sectionTitle}>Attributes</h3>
              <div className="flex flex-col gap-2">
                {STAT_FIELDS.map(([label, key]) => (
                  <div key={key} className="flex items-center gap-2.5">
                    <span className="text-xs font-medium text-muted w-28 shrink-0">{label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-surface-hover border border-dashed border-border-dot overflow-hidden">
                      <div className="h-full rounded-full bg-pink-500 transition-[width] duration-400" style={{ width: `${(cat[key] / 5) * 100}%` }} />
                    </div>
                    <span className="text-[0.7rem] font-medium text-dim w-7 text-right shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {cat[key]}/5
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boolean traits */}
            <div className={sectionClass}>
              <h3 className={sectionTitle}>Traits</h3>
              <div className="flex flex-wrap gap-1.5">
                {BOOL_FIELDS.map(([label, key]) => (
                  <div
                    key={key}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border border-dashed ${
                      cat[key]
                        ? 'border-emerald-500 text-emerald-500'
                        : 'border-border-dot text-dim opacity-55'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cat[key] ? 'bg-emerald-500' : 'bg-border-dot'}`} aria-hidden="true" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className={sectionClass}>
              <h3 className={sectionTitle}>Details</h3>
              <div className="flex flex-col gap-1.5">
                {[
                  ['Lifespan', `${cat.life_span} years`],
                  ['Weight', `${cat.weight?.metric} kg (${cat.weight?.imperial} lbs)`],
                  ['Origin', cat.origin],
                  ['Country Code', cat.country_codes],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-dim font-medium">{label}</span>
                    <span className="text-muted" style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className={sectionClass}>
              <h3 className={sectionTitle}>Learn More</h3>
              <div className="flex flex-wrap gap-2">
                {cat.wikipedia_url && <a href={cat.wikipedia_url} target="_blank" rel="noopener noreferrer" className={linkClass}><ExternalLink size={14} aria-hidden="true" /> Wikipedia</a>}
                {cat.cfa_url && <a href={cat.cfa_url} target="_blank" rel="noopener noreferrer" className={linkClass}><ExternalLink size={14} aria-hidden="true" /> CFA</a>}
                {cat.vetstreet_url && <a href={cat.vetstreet_url} target="_blank" rel="noopener noreferrer" className={linkClass}><ExternalLink size={14} aria-hidden="true" /> VetStreet</a>}
                {cat.vcahospitals_url && <a href={cat.vcahospitals_url} target="_blank" rel="noopener noreferrer" className={linkClass}><ExternalLink size={14} aria-hidden="true" /> VCA Hospitals</a>}
              </div>
            </div>

            <button
              className="inline-flex items-center gap-1.5 self-start text-sm font-medium px-4 py-2 rounded-md border border-dashed border-border-dot bg-surface-card text-foreground cursor-pointer transition-colors duration-150 hover:bg-surface-hover hover:border-muted"
              onClick={load}
              aria-label="Load another cat"
              style={{ touchAction: 'manipulation' }}
            >
              <RefreshCw size={16} /> New Cat
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
