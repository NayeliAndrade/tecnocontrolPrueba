import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './layouts/Layout';
//import Dashboard from './components/dashboard/Dashboard';
import UnitsList from './components/unitsList/UnitsList';
import ReportsList from './components/reportsList/ReportsList';
import './styles/global.css';
import './styles/header.css';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index path="/" element={<UnitsList />} />
                <Route path="/reports" element={<ReportsList />} />
            </Route>
        )
    );
    return (
        <RouterProvider router={router} />
    );
};

export default App;
