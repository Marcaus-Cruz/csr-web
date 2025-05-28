import { Suspense } from "react";
import ReviewsPage from "./ReviewsPage";
import PageWrapper from "../components/PageWrapper";

export default function ReviewsRoute() {
  return (
    <PageWrapper currentPageName="reviews">
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewsPage />
      </Suspense>
    </PageWrapper>
  );
}
