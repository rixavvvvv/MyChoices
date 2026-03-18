import { NextRequest } from "next/server";
import { verifyToken, type JwtPayload } from "../utils/jwt";
import { error } from "../utils/api-response";

export interface AuthenticatedRequest extends NextRequest {
  user?: JwtPayload;
}

export async function authenticate(
  req: NextRequest
): Promise<JwtPayload | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireAuth(req: NextRequest) {
  const user = await authenticate(req);
  if (!user) {
    return { user: null, errorResponse: error("Not authenticated", 401) };
  }
  return { user, errorResponse: null };
}

export async function requireAdmin(req: NextRequest) {
  const { user, errorResponse } = await requireAuth(req);
  if (errorResponse) return { user: null, errorResponse };
  if (user!.role !== "ADMIN") {
    return { user: null, errorResponse: error("Admin access required", 403) };
  }
  return { user, errorResponse: null };
}
