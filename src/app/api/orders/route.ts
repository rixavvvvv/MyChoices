import { NextRequest } from "next/server";
import { requireAuth, requireAdmin } from "@/server/middleware/auth";
import * as orderService from "@/server/services/order.service";
import { createOrderSchema } from "@/server/validators/order.validator";
import { success, error, created } from "@/server/utils/api-response";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const all = searchParams.get("all");

        if (all === "true") {
            const { errorResponse } = await requireAdmin(req);
            if (errorResponse) return errorResponse;
            const orders = await orderService.getAllOrders();
            return success(orders);
        }

        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const orders = await orderService.getUserOrders(user!.sub);
        return success(orders);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch orders";
        return error(message, 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const body = await req.json();
        const parsed = createOrderSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const order = await orderService.createOrder(user!.sub, parsed.data);
        return created(order);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to create order";
        return error(message);
    }
}
