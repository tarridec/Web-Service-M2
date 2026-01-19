import { IServices } from "soap";
import { SoapCallbackFunction } from "../types/soap-callback-function.type";
import { getUsersByEmail } from "../../services/users.service";
import { sign, verify } from "../../utils/jwt.utils";
import { login as loginService } from "../../services/auth.service"
import { User } from "../../types/user";

export const authService: IServices = {
    AuthService: {
        AuthServicePort: {
            Login: async function({email, password}: {email: string; password: string}, callback: SoapCallbackFunction, hearders: any) {
                if (!callback) return;
                
                //const isAuthenticated: boolean = await loginService(email, password);
                
                // if(!isAuthenticated) {
                //     return callback({
                //         Fault: {
                //             faultcode: "soap:Client",
                //             faultstring: `Unauthorized`,
                //             detail: {
                //                 code: 401,
                //                 message: `Unauthorized`
                //             },
                //         },
                //     })
                // }

                const user: User | undefined = await getUsersByEmail(email);
                //const token = sign ({ id: user!.id, role: user!.role, email: user!.email }, '2h');

                //return callback({ token });

                const token = hearders?.AuthHeauder?.token;
                
                try {
                    if (!token || !verify(token)) throw new Error("Unauthorized");
                } catch {
                    return callback({
                        Fault: {
                            faultcode: "soap:Client",
                            faultstring: `Unauthorized`,
                            detail: {
                                code: 401,
                                message: `Unauthorized`
                            },
                        },
                    })
                }

                // const ;
                // callback({});
            },
        },
    }
};