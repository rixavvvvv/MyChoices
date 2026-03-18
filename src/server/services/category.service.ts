import { prisma } from "../db";

export async function getAllCategories() {
  return prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: { category: { select: { name: true, slug: true } } },
      },
      _count: { select: { products: true } },
    },
  });
}

export async function createCategory(input: {
  name: string;
  slug: string;
  image: string;
}) {
  return prisma.category.create({ data: input });
}
