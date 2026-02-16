import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import RequireAuth from './components/auth/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import { BoardPage } from './pages/BoardPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/board" element={<BoardPage />} />
                        {/* Default redirect to board if authenticated */}
                        <Route path="/" element={<Navigate to="/board" replace />} />
                    </Route>

                    {/* Catch all redirect */}
                    <Route path="*" element={<Navigate to="/board" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
