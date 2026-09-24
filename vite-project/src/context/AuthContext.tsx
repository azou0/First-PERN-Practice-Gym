import { createContext, useEffect, useState, useContext, type ReactNode } from "react";
import type { User, UserProfile } from "../types";
import { authClient } from "../lib/neon";
import { api } from "../lib/api";
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    saveProfile: (profile: Omit<UserProfile, 'userId' | 'updatedAt'>,
        
    ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<any>(null);
    //Create a state value, and give it an initial value of true.
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const result = await authClient.getSession();
                if (result && result.data?.user) {
                    setNeonUser(result.data.user);
                } else {
                  setNeonUser(null);  
                }

            } catch (err) {
                setNeonUser(null);
            } finally {
                setIsLoading(false); //No matter whether the operation succeeds or fails, set isLoading to false when it finishes.
            }
        }
        loadUser();
    }, []);

    async function saveProfile(
        profileData: Omit<UserProfile, 'userId' | 'updatedAt'>,
    ) {
        if (!neonUser) {
            throw new Error("User must be authenticated to save profile");
        }
        await api.saveProfile(neonUser.id, profileData);
    }

    return (
        <AuthContext.Provider 
            value={{
                 user: neonUser,
                 saveProfile,
                 isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}