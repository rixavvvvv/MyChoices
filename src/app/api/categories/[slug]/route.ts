import { NextRequest } from "next/server";
import * as categoryService from "@/server/services/category.service";
import { success, error } from "@/server/utils/api-response";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const category = await categoryService.getCategoryBySlug(slug);
        if (!category) return error("Category not found", 404);
        return success(category);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch category";
        return error(message, 500);
    }
}
