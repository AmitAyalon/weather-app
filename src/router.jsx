import { createBrowserRouter } from 'react-router-dom';
import PathConstants from './constants/pathConstants';
import HomePage from './pages/home/home';
import MapViewPage from './pages/map-view/map-view';
import Page404 from './pages/not-found/not-found';
import Layout from './components/layout/layout';

const children = [
    { path: PathConstants.HOME, element: <HomePage /> },
    { path: PathConstants.MAP_VIEW, element: <MapViewPage /> },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <Page404 />,
    children: children,
  }
]);

export default router;