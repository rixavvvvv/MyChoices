import { NextRequest } from "next/server";
import { contactSchema } from "@/server/validators/contact.validator";
import * as contactService from "@/server/services/contact.service";
import { authenticate, requireAdmin } from "@/server/middleware/auth";
import { success, error, created } from "@/server/utils/api-response";

export async function GET(req: NextRequest) {
    try {
        const { errorResponse } = await requireAdmin(req);
        if (errorResponse) return errorResponse;

        const contacts = await contactService.getAllContacts();
        return success(contacts);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to fetch contacts";
        return error(message, 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await authenticate(req);
        const body = await req.json();
        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
            return error(parsed.error.errors[0].message, 422);
        }

        const contact = await contactService.submitContact(
            parsed.data,
            user?.sub
        );
        return created(contact);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to submit contact";
        return error(message);
    }
}
