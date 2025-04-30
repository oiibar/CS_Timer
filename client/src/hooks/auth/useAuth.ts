import {useAppSelector} from "@store/hooks.ts";

export const useAuth = (): boolean => {
  return useAppSelector((state) => state.user.isAuth);
};
