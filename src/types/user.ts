import { Role } from "./role";

export interface User {
  id: number,
  email: string,
  passwordHash: string,
  role: Role
}