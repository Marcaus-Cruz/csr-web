import { NextRequest, NextResponse } from "next/server";
import { getReviewById } from "../../../lib/dynamoReviews";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
    }

    const review = await getReviewById(id);
    
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to get review:", error);
    return NextResponse.json(
      { error: "Failed to get review" },
      { status: 500 }
    );
  }
}
