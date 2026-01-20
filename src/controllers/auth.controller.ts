import { NextFunction, Request, Response } from "express"
import { login as loginService } from "../services/auth.service"
import { sign } from "../utils/jwt.utils";
import { getUsersByEmail, addUser } from "../services/users.service";
import { User } from "../types/user";

export const login = async (req: Request, res: Response, _next: NextFunction) => {
  const {email, password } = req.body ?? {};

  if(!email || !password){
    return res.status(400).json({ message: 'Paramètres incorrects' })
  }

  const login = await loginService(email, password)
  
  if (login.isAuthenticated && login.token) {
    return res.status(200).json({accessToken: login.token})
  } else {
    return res.status(401).json({message: 'Informations de login invalides'})
  }
};

export const register = async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password, role } = req.body ?? {};

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Paramètres incorrects' });
  }

  const body: Omit<User, 'id'> = {
    email,
    passwordHash: password,
    role,
  };

  const user = await getUsersByEmail(email);

  if (user) {
    return res.status(400).json({ message: "L'email est déjà utilisé" });
  }

  const newUser = await addUser(body);
  res.status(201).json(newUser);
}
