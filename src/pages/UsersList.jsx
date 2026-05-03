import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchRandomUser } from '../api';
import PageShell from '../components/PageShell';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import { RefreshCw, Mail, Phone, MapPin, Calendar, Clock, Globe } from 'lucide-react';

export default function UsersList() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialized = useRef(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchRandomUser()
      .then(setUser)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      load();
    }
  }, [load]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
  };

  const rowClass = 'flex items-center gap-2 text-sm text-muted min-w-0';
  const sectionClass = 'px-6 py-5 border-b border-dashed border-border-dot last:border-b-0';
  const sectionTitle = 'text-[0.7rem] font-semibold uppercase tracking-widest text-dim mb-2.5';
  const btnClass = 'inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md border border-dashed border-border-dot bg-surface-card text-foreground cursor-pointer transition-colors duration-150 hover:bg-surface-hover hover:border-muted';

  return (
    <PageShell title="Users">
      {loading && <Loader />}
      {error && <ErrorMsg message={error} onRetry={load} />}
      {!loading && !error && user && (
        <div className="flex flex-col items-center gap-6 pt-4">
          <div className="max-w-md w-full border border-dashed border-border-dot rounded-xl bg-surface-card overflow-hidden">

            <div className="flex flex-col items-center gap-2 px-6 pt-8 pb-6 border-b border-dashed border-border-dot">
              <div className="w-[104px] h-[104px] rounded-full border-2 border-dashed border-blue-500 p-0.5 flex items-center justify-center">
                <img
                  src={user.picture?.large}
                  alt={`${user.name?.first} ${user.name?.last}`}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-center">
                {user.name?.title} {user.name?.first} {user.name?.last}
              </h2>
              <span className="text-sm font-medium text-blue-500">@{user.login?.username}</span>
            </div>

            <div className={sectionClass}>
              <h3 className={sectionTitle}>Contact</h3>
              <div className="flex flex-col gap-1.5">
                <div className={rowClass}>
                  <Mail size={15} className="shrink-0 text-dim" aria-hidden="true" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className={rowClass}>
                    <Phone size={15} className="shrink-0 text-dim" aria-hidden="true" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.cell && (
                  <div className={rowClass}>
                    <Phone size={15} className="shrink-0 text-dim" aria-hidden="true" />
                    <span>{user.cell}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={sectionClass}>
              <h3 className={sectionTitle}>Location</h3>
              <div className="flex flex-col gap-1.5">
                <div className={rowClass}>
                  <MapPin size={15} className="shrink-0 text-dim" aria-hidden="true" />
                  <span>{user.location?.street?.number} {user.location?.street?.name}</span>
                </div>
                <div className={rowClass}>
                  <Globe size={15} className="shrink-0 text-dim" aria-hidden="true" />
                  <span>{user.location?.city}, {user.location?.state}, {user.location?.country}</span>
                </div>
                {user.location?.timezone && (
                  <div className={rowClass}>
                    <Clock size={15} className="shrink-0 text-dim" aria-hidden="true" />
                    <span>UTC {user.location.timezone.offset}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={sectionClass}>
              <h3 className={sectionTitle}>Personal</h3>
              <div className="flex flex-wrap gap-1.5">
                {user.gender && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-dashed border-border-dot text-muted">
                    {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                  </span>
                )}
                {user.dob?.age && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-dashed border-border-dot text-muted">
                    Age {user.dob.age}
                  </span>
                )}
                {user.nat && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-dashed border-border-dot text-muted">
                    {user.nat}
                  </span>
                )}
              </div>
              {user.dob?.date && (
                <div className={`${rowClass} mt-2`}>
                  <Calendar size={15} className="shrink-0 text-dim" aria-hidden="true" />
                  <span>Born {formatDate(user.dob.date)}</span>
                </div>
              )}
              {user.registered?.date && (
                <div className={`${rowClass} mt-1`}>
                  <Clock size={15} className="shrink-0 text-dim" aria-hidden="true" />
                  <span>Registered {formatDate(user.registered.date)}</span>
                </div>
              )}
            </div>
          </div>

          <button className={btnClass} onClick={load} aria-label="Load another user" style={{ touchAction: 'manipulation' }}>
            <RefreshCw size={16} /> New User
          </button>
        </div>
      )}
    </PageShell>
  );
}