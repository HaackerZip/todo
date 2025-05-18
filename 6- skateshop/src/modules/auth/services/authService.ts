// src/services/authService.ts
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/utils/passwordUtils";
import { AuthError } from "next-auth";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });
};

export const createUser = async (
  email: string,
  name: string,
  passwordHash: string,
) => {
  return await prisma.user.create({
    data: {
      email,
      name,
      password: passwordHash,
    },
  });
};

export const updateUserPassword = async (
  email: string,
  passwordHash: string,
) => {
  return await prisma.user.update({
    where: { email },
    data: { password: passwordHash },
  });
};

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await comparePassword(password, hashedPassword);
};

export const handleAuthError = (error: unknown): { error: string } => {
  if (error instanceof AuthError) {
    return { error: error.message || "Authentication error" };
  }
  return { error: "Internal server error" };
};
