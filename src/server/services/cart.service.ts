import { prisma } from "../db";

export async function getCart(userId: string) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: { include: { category: true } } },
        orderBy: { product: { name: "asc" } },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: { product: { include: { category: true } } },
        },
      },
    });
  }

  return cart;
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity = 1
) {
  const cart = await getCart(userId);

  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  return getCart(userId);
}

export async function updateCartItem(
  userId: string,
  productId: string,
  quantity: number
) {
  const cart = await getCart(userId);
  const item = cart.items.find((i) => i.productId === productId);
  if (!item) throw new Error("Item not in cart");

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: item.id } });
  } else {
    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });
  }

  return getCart(userId);
}

export async function removeFromCart(userId: string, productId: string) {
  const cart = await getCart(userId);
  const item = cart.items.find((i) => i.productId === productId);
  if (!item) throw new Error("Item not in cart");

  await prisma.cartItem.delete({ where: { id: item.id } });
  return getCart(userId);
}

export async function clearCart(userId: string) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
  return getCart(userId);
}
