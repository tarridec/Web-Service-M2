import bcrypt from 'bcryptjs';
import { User } from '../types/user';
import { getUsersByEmail } from './users.service';
import { sign } from '../utils/jwt.utils';

export const login = async (email: string, password: string): Promise<{isAuthenticated: boolean, token?: string}> => {
  console.dir({ email, password });

  const user: User | undefined = await getUsersByEmail(email);
  
    if(!user)
      return {isAuthenticated: false};
  
    const isAuthenticated: boolean = bcrypt.compareSync(password, user.passwordHash);
  
    if(!isAuthenticated) {
      return {isAuthenticated: false};
    }
    
    const token = sign ({ id: user.id, role: user.role, email: user.email }, '2h');

    return {isAuthenticated, token};

  // création du hash
  // const salt = Number(process.env.PASSWORD_SALT) ?? 10;
  // const hashedPassword = await bcrypt.hash(user.passwordHash, salt);
};
