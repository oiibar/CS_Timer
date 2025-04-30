import { instance } from "@api/axios.api";
import { ResponseUserData, User, UserData } from "@interfaces/users";

export const AuthService = {
  async signUp(userData: UserData): Promise<ResponseUserData | undefined> {
    const { data } = await instance.post<ResponseUserData>("user", userData);
    return data;
  },
  async login(userData: UserData): Promise<User | undefined> {
    const { data } = await instance.post<User>("auth/login", userData);
    return data;
  },
  async getProfile(): Promise<User | undefined> {
    const { data } = await instance.get<User>("auth/profile");
    if (data) return data;
  },
  async updateProfile(updatedData: Partial<User>): Promise<User | undefined> {
    const { data } = await instance.put<User>("user/profile", updatedData);
    return data;
  }

};
