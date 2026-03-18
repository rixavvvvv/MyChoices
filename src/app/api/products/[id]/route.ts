import { NextRequest } from "next/server";
import * as productService from "@/server/services/product.service";
import { updateProductSchema } from "@/server/validators/product.validator";
import { requireAdmin } from "@/server/middleware/auth";
import { success, error, noContent } from "@/server/utils/api-response";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await productService.getProductById(id);
        if (!product) return error("Product not found", 404);
        return success(product);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch product";
        return error(message, 500);
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { errorResponse } = await requireAdmin(req);
        if (errorResponse) return errorResponse;

        const { id } = await params;
        const body = await req.json();
        const parsed = updateProductSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const product = await productService.updateProduct(id, parsed.data);
        return success(product);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to update product";
        return error(message);
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { errorResponse } = await requireAdmin(req);
        if (errorResponse) return errorResponse;

        const { id } = await params;
        await productService.deleteProduct(id);
        return noContent();
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to delete product";
        return error(message);
    }
}
