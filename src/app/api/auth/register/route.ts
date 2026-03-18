import { NextRequest } from "next/server";
import { registerSchema } from "@/server/validators/auth.validator";
import * as authService from "@/server/services/auth.service";
import { success, error, created } from "@/server/utils/api-response";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const result = await authService.register(parsed.data);
        return created(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Registration failed";
        return error(message);
    }
}
