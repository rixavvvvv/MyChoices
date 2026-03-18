import { prisma } from "../db";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../validators/product.validator";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getAllProducts(categorySlug?: string) {
  const where = categorySlug
    ? { category: { slug: categorySlug } }
    : undefined;

  return prisma.product.findMany({
    where,
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: { select: { name: true, slug: true } } },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: { select: { name: true, slug: true } } },
  });
}

export async function createProduct(input: CreateProductInput) {
  const slug = toSlug(input.name);
  return prisma.product.create({
    data: { ...input, slug },
    include: { category: { select: { name: true, slug: true } } },
  });
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  const data: Record<string, unknown> = { ...input };
  if (input.name) {
    data.slug = toSlug(input.name);
  }
  return prisma.product.update({
    where: { id },
    data,
    include: { category: { select: { name: true, slug: true } } },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
