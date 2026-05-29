import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  await deleteSession();
  redirect("/");
}
