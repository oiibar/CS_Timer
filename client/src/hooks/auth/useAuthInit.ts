import { useEffect, useState } from "react";
import { getToken, removeToken } from "@helpers/localstorage.helper.ts";
import { AuthService } from "@services/auth.service.ts";
import { useAppDispatch } from "@store/hooks.ts";
import { login, logout } from "@store/user/userSlice.ts";

export const useAuthInit = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = getToken();

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const user = await AuthService.getProfile();
                if(user) {
                    dispatch(login(user));
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                removeToken("token");
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [dispatch]);

    return { loading };
};
