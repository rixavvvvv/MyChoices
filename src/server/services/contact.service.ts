import { prisma } from "../db";
import type { ContactInput } from "../validators/contact.validator";

export async function submitContact(input: ContactInput, userId?: string) {
  return prisma.contact.create({
    data: {
      ...input,
      userId: userId ?? null,
    },
  });
}

export async function getAllContacts() {
  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });
}
