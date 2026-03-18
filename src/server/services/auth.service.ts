import { prisma } from "../db";
import { hash, compare } from "bcryptjs";
import { signToken } from "../utils/jwt";
import type { RegisterInput, LoginInput } from "../validators/auth.validator";

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    },
    select: { id: true, name: true, email: true, role: true },
  });

  const token = await signToken({ sub: user.id, role: user.role });

  return { user, token };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const valid = await compare(input.password, user.password);
  if (!valid) {
    throw new Error("Invalid email or password");
  }

  const token = await signToken({ sub: user.id, role: user.role });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) throw new Error("User not found");
  return user;
}
