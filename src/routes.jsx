import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Quotes from './pages/Quotes';
import Jokes from './pages/Jokes';
import Cats from './pages/Cats';
import Meals from './pages/Meals';
import UsersList from './pages/UsersList';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/quotes', element: <Quotes /> },
  { path: '/jokes', element: <Jokes /> },
  { path: '/cats', element: <Cats /> },
  { path: '/meals', element: <Meals /> },
  { path: '/users', element: <UsersList /> },
]);

export default router;