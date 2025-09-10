import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, type CSRUser } from "../auth/[...nextauth]/options";
import { getUserById } from "../../lib/dynamoUsers";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as CSRUser;
    const userData = await getUserById(user.id);
    
    return NextResponse.json({ hitlist: userData?.hitlist || [] });
  } catch (error) {
    console.error("Failed to get hitlist:", error);
    return NextResponse.json(
      { error: "Failed to get hitlist" },
      { status: 500 }
    );
  }
}
