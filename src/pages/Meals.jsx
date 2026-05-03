import { useEffect, useState } from 'react';
import { fetchMeals } from '../api';
import PageShell from '../components/PageShell';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import Pagination from '../components/Pagination';

export default function Meals() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = (p) => {
    setLoading(true);
    setError(null);
    fetchMeals(p, 12)
      .then((res) => { setData(res.data); setTotalPages(res.totalPages); setPage(res.page); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(1); }, []);

  return (
    <PageShell title="Meals">
      {loading && <Loader />}
      {error && <ErrorMsg message={error} onRetry={() => load(page)} />}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {data.map((m) => (
              <article key={m.id} className="border border-dashed border-border-dot rounded-xl overflow-hidden bg-surface-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-surface-hover">
                  <img src={m.strMealThumb} alt={m.strMeal} width={300} height={200} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-orange-500">{m.strCategory}</span>
                  <h2 className="text-base font-semibold truncate">{m.strMeal}</h2>
                  {m.strArea && <span className="text-xs text-muted">{m.strArea}</span>}
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