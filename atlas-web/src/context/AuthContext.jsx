import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // 1. Inicialización del usuario desde el almacenamiento
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user_data') || sessionStorage.getItem('user_data');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Error al parsear usuario del storage", e);
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    // 2. Verificación de sesión activa al recargar la página
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/user');
                const userData = response.data.data || response.data;

                if (userData && userData.role_id) {
                    userData.role_id = Number(userData.role_id);
                }

                setUser(userData);
                const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
                storage.setItem('user_data', JSON.stringify(userData));

            } catch (error) {
                console.error("Error verificando sesión:", error);
                if (error.response && error.response.status === 401) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // 3. Función de Registro
    const register = async (formData) => {
        try {
            const response = await api.post('/register', formData);
            const payload = response.data.data || response.data;
            const userData = payload.user;
            const token = payload.token || payload.access_token;

            if (!token || !userData) {
                throw new Error("Respuesta de registro incompleta desde el servidor");
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user_data', JSON.stringify(userData));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(userData);
            return payload; 
        } catch (error) {
            console.error("Error en registro:", error);
            throw error;
        }
    };

    // 4. Función de Inicio de Sesión
    const login = async (email, password, remember) => {
        try {
            const response = await api.post('/login', {
                email,
                password,
                remember_me: remember
            });

            let token = response.data.token || response.data.access_token;
            if (!token && response.data.data) {
                token = response.data.data.token || response.data.data.access_token;
            }
            let userData = response.data.user;
            if (!userData && response.data.data) {
                userData = response.data.data.user || response.data.data;
            }
            if (!userData && response.data.id) {
                userData = response.data;
            }

            if (!token || !userData) {
                console.error("❌ Estructura recibida:", response.data);
                throw new Error("No se pudo encontrar el token o el usuario en la respuesta del servidor.");
            }

            if (userData.role_id) {
                userData.role_id = Number(userData.role_id);
            }

            const storage = remember ? localStorage : sessionStorage;
            storage.setItem('token', token);
            storage.setItem('user_data', JSON.stringify(userData));
            const payloadData = response.data.data || response.data;
            if (payloadData.requires_order_claim) {
                localStorage.setItem('pending_claims', JSON.stringify(payloadData.claimable_emails));
            } else {
                localStorage.removeItem('pending_claims');
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(userData);
            return userData;
        } catch (error) {
            console.error("Error en función login:", error);
            throw error;
        }
    };

    // 5. Función de Cierre de Sesión
    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Error al cerrar sesión en servidor (ignorando):", error);
        } finally {
            localStorage.clear();
            sessionStorage.clear();

            delete api.defaults.headers.common['Authorization'];
            setUser(null);
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};