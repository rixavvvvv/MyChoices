import { prisma } from "../db";
import type { CreateOrderInput } from "../validators/order.validator";

export async function createOrder(userId: string, input: CreateOrderInput) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      address: input.address,
      city: input.city,
      zipCode: input.zipCode,
      country: input.country,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  });

  // Clear cart after order
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return order;
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string, userId: string) {
  return prisma.order.findFirst({
    where: { id, userId },
    include: { items: { include: { product: true } } },
  });
}

export async function updateOrderStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
) {
  return prisma.order.update({
    where: { id },
    data: { status },
    include: { items: { include: { product: true } } },
  });
}

export async function getAllOrders() {
  return prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
