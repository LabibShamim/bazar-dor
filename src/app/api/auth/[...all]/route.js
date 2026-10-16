import { getAuth } from "../../../lib/auth.js";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const auth = await getAuth();
  const handlers = toNextJsHandler(auth);
  return handlers.GET(request);
}

export async function POST(request) {
  const auth = await getAuth();
  const handlers = toNextJsHandler(auth);
  return handlers.POST(request);
}
