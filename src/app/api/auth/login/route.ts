import { NextRequest } from "next/server";
import { loginSchema } from "@/server/validators/auth.validator";
import * as authService from "@/server/services/auth.service";
import { success, error } from "@/server/utils/api-response";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const result = await authService.login(parsed.data);
        return success(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Login failed";
        return error(message, 401);
    }
}
