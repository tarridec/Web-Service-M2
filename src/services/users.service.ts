import bcrypt from 'bcryptjs';
import { User } from "../types/user";
import { FILE_JSON_USERS } from "../utils/constants";
import { parseJsonFile, writeJsonFile } from "../utils/utils";
import path from 'path';

// Retrieve a user by their email
export const getUsersByEmail = async (email: string): Promise<User | undefined> => {
  const users: User[] = await parseJsonFile<User[]>(path.resolve(FILE_JSON_USERS));
  return users.find((u: User) => u.email.toLowerCase() === email);
}

// Add a new user to the JSON file
export const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
  const users: User[] = await parseJsonFile<User[]>(path.resolve(FILE_JSON_USERS));
  const newId = Date.now().toString();

  // Création du hash
  const salt = Number(process.env.PASSWORD_SALT) ?? 10;
  const hashedPassword = await bcrypt.hash(newUser.passwordHash, salt);
  const userToAdd: User = { id: newId, ...newUser, passwordHash: hashedPassword };

  users.push(userToAdd);
  await writeJsonFile(path.resolve(FILE_JSON_USERS), users);
  return userToAdd;
}