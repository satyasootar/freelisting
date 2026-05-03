import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import PageShell from '../components/PageShell';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import Pagination from '../components/Pagination';
import { Star } from 'lucide-react';

export default function Products() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = (p) => {
    setLoading(true);
    setError(null);
    fetchProducts(p, 12)
      .then((res) => { setData(res.data); setTotalPages(res.totalPages); setPage(res.page); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(1); }, []);

  return (
    <PageShell title="Products">
      {loading && <Loader />}
      {error && <ErrorMsg message={error} onRetry={() => load(page)} />}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {data.map((p) => (
              <article key={p.id} className="border border-dashed border-border-dot rounded-xl overflow-hidden bg-surface-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-hover">
                  <img src={p.thumbnail} alt={p.title} width={300} height={200} loading="lazy" className="w-full h-full object-cover" />
                  {p.discountPercentage > 0 && (
                    <span className="absolute top-2.5 right-2.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-red-500 text-white">
                      −{Math.round(p.discountPercentage)}%
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">{p.category}</span>
                  <h2 className="text-base font-semibold tracking-tight truncate">{p.title}</h2>
                  <p className="text-xs text-muted line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-border-dot">
                    <span className="text-lg font-bold" style={{ fontVariantNumeric: 'tabular-nums' }}>${p.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-500">
                      <Star size={14} aria-hidden="true" /> {p.rating}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={load} />
        </>
      )}
    </PageShell>
  );
}
