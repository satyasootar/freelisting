import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { ShoppingBag, Quote, Laugh, Cat, UtensilsCrossed, Users } from 'lucide-react';

const projects = [
  { title: 'Products', description: 'Browse a curated catalog of products with prices, ratings & discounts.', path: '/products', icon: ShoppingBag, accent: 'text-indigo-500' },
  { title: 'Quotes', description: 'Discover inspiring quotes from authors around the world.', path: '/quotes', icon: Quote, accent: 'text-amber-500' },
  { title: 'Jokes', description: 'Enjoy a fresh stream of random jokes to brighten your day.', path: '/jokes', icon: Laugh, accent: 'text-emerald-500' },
  { title: 'Random Cats', description: 'Meet random cat breeds with photos, traits & fun facts.', path: '/cats', icon: Cat, accent: 'text-pink-500' },
  { title: 'Meals', description: 'Explore recipes with ingredients, instructions & categories.', path: '/meals', icon: UtensilsCrossed, accent: 'text-orange-500' },
  { title: 'Users', description: 'View randomly generated user profiles & contact details.', path: '/users', icon: Users, accent: 'text-blue-500' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh overflow-hidden px-6 py-8 relative">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <section className="text-center mt-2 mb-10">
        <p className="inline-block text-xs font-medium tracking-widest uppercase text-muted border border-dashed border-border-dot rounded-full px-3.5 py-1 mb-5">
          Powered by FreeAPI
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none" style={{ textWrap: 'balance' }}>
          Free<span className="bg-gradient-to-br from-indigo-500 to-pink-500 bg-clip-text text-transparent">Listing</span>
        </h1>
        <p className="mt-4 text-base text-muted max-w-md mx-auto" style={{ textWrap: 'pretty' }}>
          6&nbsp;mini-apps, 1&nbsp;interface — explore products, quotes, jokes, cats, meals&nbsp;&amp;&nbsp;users.
        </p>
      </section>

      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px w-full max-w-[920px] border border-dashed border-border-dot rounded-xl overflow-hidden bg-border-dot"
        aria-label="Project cards"
      >
        {projects.map((p) => (
          <Link
            key={p.path}
            to={p.path}
            className="flex flex-col gap-2.5 p-7 bg-surface-card relative transition-colors duration-200 hover:bg-surface-hover active:scale-[0.98] group"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg border border-dashed border-border-dot ${p.accent}`} aria-hidden="true">
              <p.icon size={24} />
            </div>
            <h2 className="text-base font-semibold tracking-tight">{p.title}</h2>
            <p className="text-sm text-muted leading-relaxed flex-1">{p.description}</p>
            <span className="absolute top-6 right-6 text-lg text-dim opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">→</span>
          </Link>
        ))}
      </section>

      <footer className="mt-12 text-xs text-dim text-center">
        <p>Web&nbsp;Dev Cohort 2026 · Built with React&nbsp;+&nbsp;Vite</p>
      </footer>
    </div>
  );
}