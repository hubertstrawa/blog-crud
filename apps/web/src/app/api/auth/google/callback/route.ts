import { BACKEND_URL } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const avatar = searchParams.get("avatar");
  const accessToken = searchParams.get("accessToken");

  //   return NextResponse.json({ userId, name, avatar, accessToken });

  if (!userId || !name || !accessToken) {
    throw new Error("Missing required parameters");
  }

  const response = await fetch(`${BACKEND_URL}/auth/verify-token`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    throw new Error("JWT verification failed");
  }

  await createSession({
    user: {
      id: userId,
      name: name,
      avatar: avatar ?? undefined,
    },
    accessToken,
  });

  redirect("/");
}
