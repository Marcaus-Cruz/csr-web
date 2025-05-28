import PageWrapper from "./components/PageWrapper";
import ReviewsPage from "./reviews/ReviewsPage";

export default function Home() {
  const currentPageName = "reviews";

  return (
    <PageWrapper currentPageName={currentPageName}>
      <ReviewsPage />
    </PageWrapper>
  );
}