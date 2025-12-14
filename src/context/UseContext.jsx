import { createContext, useContext } from 'react';
import  useAuth  from '../hooks/UseAuth';

const AuthContext = createContext();//create context

export const useAuthContext = () => {  // use context
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('AuthContext must be used inside an AuthContextProvider');
    }
    return context;
};

export const AuthContextProvider = ({ children }) => {// create context provider
    const auth = useAuth();
    return (
        <AuthContext.Provider value={{ auth }}>
            {children}
        </AuthContext.Provider>
    );
};