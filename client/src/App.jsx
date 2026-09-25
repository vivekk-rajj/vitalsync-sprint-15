import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './auth';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import './styles.css';
export default function App() { return <AuthProvider><Routes><Route path="/login" element={<AuthPage mode="login" />} /><Route path="/register" element={<AuthPage mode="register" />} /><Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /><Route path="*" element={<Navigate to="/dashboard" replace />} /></Routes></AuthProvider>; }
