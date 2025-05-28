// import Image from "next/image";
import ReviewsPage from "./reviews/page";
{/* <Image
  className="logo"
  src="/logo-csr.png"
  alt="Happy Chicken Sandwich"
  fill={true}
  objectFit="contain"
  priority
/> */}

export default function Home() {
  return (
    <div className='page home'>
      <ReviewsPage />
    </div>
  );
}
