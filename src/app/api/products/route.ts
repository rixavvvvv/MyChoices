import { NextRequest } from "next/server";
import * as productService from "@/server/services/product.service";
import { createProductSchema } from "@/server/validators/product.validator";
import { requireAdmin } from "@/server/middleware/auth";
import { success, error, created } from "@/server/utils/api-response";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category") ?? undefined;
        const products = await productService.getAllProducts(category);
        return success(products);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch products";
        return error(message, 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { user, errorResponse } = await requireAdmin(req);
        if (errorResponse) return errorResponse;

        const body = await req.json();
        const parsed = createProductSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const product = await productService.createProduct(parsed.data);
        return created(product);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to create product";
        return error(message);
    }
}
