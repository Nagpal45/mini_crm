import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import AudiencePage from './pages/audience';
import CampaignPage from './pages/campaign';
import Login from './pages/login';
import { AuthProvider, AuthContext } from './utils/context';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? element : <Login />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/audiences" element={<ProtectedRoute element={<AudiencePage />} />} />
                    <Route path="/campaigns" element={<ProtectedRoute element={<CampaignPage />} />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
