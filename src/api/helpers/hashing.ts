import argon2 from "argon2";

export const hashPassword = async (password: string) => argon2.hash(password);

export const verifyPassword = (hashedPassword: string, password: string) =>
  argon2.verify(hashedPassword, password);
