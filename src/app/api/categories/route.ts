import { NextRequest } from "next/server";
import * as categoryService from "@/server/services/category.service";
import { requireAdmin } from "@/server/middleware/auth";
import { success, error, created } from "@/server/utils/api-response";
import { z } from "zod";

const createCategorySchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    image: z.string().url(),
});

export async function GET() {
    try {
        const categories = await categoryService.getAllCategories();
        return success(categories);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch categories";
        return error(message, 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { errorResponse } = await requireAdmin(req);
        if (errorResponse) return errorResponse;

        const body = await req.json();
        const parsed = createCategorySchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const category = await categoryService.createCategory(parsed.data);
        return created(category);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to create category";
        return error(message);
    }
}
