import { NextRequest } from "next/server";
import { requireAuth } from "@/server/middleware/auth";
import * as cartService from "@/server/services/cart.service";
import { success, error } from "@/server/utils/api-response";
import { z } from "zod";

const addToCartSchema = z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive().default(1),
});

const updateCartSchema = z.object({
    productId: z.string().min(1),
    quantity: z.number().int().min(0),
});

export async function GET(req: NextRequest) {
    try {
        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const cart = await cartService.getCart(user!.sub);
        return success(cart);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch cart";
        return error(message, 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const body = await req.json();
        const parsed = addToCartSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const cart = await cartService.addToCart(
            user!.sub,
            parsed.data.productId,
            parsed.data.quantity
        );
        return success(cart);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to add to cart";
        return error(message);
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const body = await req.json();
        const parsed = updateCartSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const cart = await cartService.updateCartItem(
            user!.sub,
            parsed.data.productId,
            parsed.data.quantity
        );
        return success(cart);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to update cart";
        return error(message);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        if (productId) {
            const cart = await cartService.removeFromCart(user!.sub, productId);
            return success(cart);
        }

        const cart = await cartService.clearCart(user!.sub);
        return success(cart);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to modify cart";
        return error(message);
    }
}
