import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import AudiencePage from './pages/audience';
import CampaignPage from './pages/campaign';
import Login from './pages/login';
import { AuthProvider, AuthContext } from './utils/context';
import Loading from './components/loading';



const App = () => {

    const ProtectedRoute = ({ element }) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }, []);
        const { isAuthenticated } = useContext(AuthContext);

        if (loading) {
            return <Loading/>
        }

        console.log(isAuthenticated);
        return isAuthenticated ? element : <Login />;
    };

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
