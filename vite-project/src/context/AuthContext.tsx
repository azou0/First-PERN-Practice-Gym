import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { TrainingPlan, User, UserProfile } from "../types";
import { authClient } from "../lib/neon";
import { api } from "../lib/api";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    plan: TrainingPlan | null;
    saveProfile: (
        profile: Omit<UserProfile, "userId" | "updatedAt">
    ) => Promise<void>;
    generatePlan: () => Promise<void>;
    refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [neonUser, setNeonUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [plan, setPlan] = useState<TrainingPlan | null>(null);
    const isRefreshingRef = useRef(false);

    // New states
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

        //refreshData memoize

    const refreshData = useCallback(async () => {
        if (!neonUser || isRefreshingRef.current) return;

        isRefreshingRef.current = true;

        try{

            //fetch plan
            const planData = await api.getCurrentPlan(neonUser.id).catch(() => null);
            if (planData) {
                setPlan({
                                id: planData.id,
                                userId: planData.userId,
                                overview: planData.planJson.overview,
                                weeklySchedule: planData.planJson.weeklySchedule,
                                progression: planData.planJson.progression,
                                version: planData.version,
                                createdAt: planData.createdAt,
                });
            }
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            isRefreshingRef.current = false;
        }
    }, [neonUser?.id]);


    useEffect (() => {
        if (!isLoading) {
            if (neonUser?.id) {
                refreshData();
            } else {
                setPlan(null);
            }
            setIsLoading(false);
            }
        }, [neonUser?.id, isLoading, refreshData]);
    


    async function saveProfile(
        profileData: Omit<UserProfile, "userId" | "updatedAt">
    ) {
        if (!neonUser) {
            throw new Error(
                "User must be authenticated to save profile"
            );
        }

        await api.saveProfile(neonUser.id, profileData);
        await refreshData();
    }
        //setIsGenerating(true);
        //setError(null);

     /*   try {
            await api.saveProfile(neonUser.id, profileData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save profile"
            );

            throw err;
        } finally {
            setIsGenerating(false);
        }
    }*/
    async function generatePlan() {
        if (!neonUser) {
        throw new Error("User must be authenticated to generate plan");
        }

        await api.generatePlan(neonUser.id);
        await refreshData();
    }

    return (
        <AuthContext.Provider
            value={{
                user: neonUser,
                plan,
                saveProfile,
                isLoading,
                generatePlan,
                refreshData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
}