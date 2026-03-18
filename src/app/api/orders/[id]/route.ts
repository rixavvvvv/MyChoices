import { NextRequest } from "next/server";
import { requireAuth, requireAdmin } from "@/server/middleware/auth";
import * as orderService from "@/server/services/order.service";
import { updateOrderStatusSchema } from "@/server/validators/order.validator";
import { success, error } from "@/server/utils/api-response";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const { id } = await params;
        const order = await orderService.getOrderById(id, user!.sub);
        if (!order) return error("Order not found", 404);
        return success(order);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch order";
        return error(message, 500);
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { errorResponse } = await requireAdmin(req);
        if (errorResponse) return errorResponse;

        const { id } = await params;
        const body = await req.json();
        const parsed = updateOrderStatusSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const order = await orderService.updateOrderStatus(id, parsed.data.status);
        return success(order);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to update order";
        return error(message);
    }
}
