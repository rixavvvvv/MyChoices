import { NextRequest } from "next/server";
import { requireAuth } from "@/server/middleware/auth";
import * as authService from "@/server/services/auth.service";
import { success, error } from "@/server/utils/api-response";

export async function GET(req: NextRequest) {
    try {
        const { user, errorResponse } = await requireAuth(req);
        if (errorResponse) return errorResponse;

        const me = await authService.getMe(user!.sub);
        return success(me);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to get user";
        return error(message);
    }
}
