import { NextRequest, NextResponse } from "next/server";
import { createReview, type DynamoReview } from "../../lib/dynamoReviews";
import { getServerSession } from "next-auth";
import { authOptions, type CSRUser } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as CSRUser;
    const reviewData: DynamoReview = await request.json();

    // Ensure the owner matches the authenticated user
    reviewData.owner = user.id;

    await createReview(reviewData);

    return NextResponse.json({ success: true, reviewId: reviewData.id });
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
