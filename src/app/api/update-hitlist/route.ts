import { NextResponse } from "next/server";
import { updateUserHitlist } from "../../lib/dynamoUsers";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const newHitlist = body.hitlist;

  if (!Array.isArray(newHitlist)) {
    return NextResponse.json({ error: "Invalid hitlist" }, { status: 400 });
  }

  try {
    await updateUserHitlist(session.user.id, newHitlist);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Hitlist update failed", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}