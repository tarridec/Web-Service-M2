export interface AuthServiceAPI {
    login: (email: string, password: string) => Promise<{token?: string, isAuthenticated: boolean}>;
}