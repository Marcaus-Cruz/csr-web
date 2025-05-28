import "./pageHeader.css";
import Image from "next/image";
import Link from "next/link";

export default function PageHeader({ setCurrentPage }) {
  return (
    <header>
      <Link
        className="btn logo"
        href="/home"
        onClick={() => setCurrentPage("home")}
      >
        <Image src="/logo-csr.png" alt="logo" fill={true} />
      </Link>
      <nav className="nav">
        <Link
          className="btn standard"
          href="/home"
          onClick={() => setCurrentPage("home")}
        >
          Home
        </Link>
        <Link
          className="btn standard"
          href="/reviews"
          onClick={() => setCurrentPage("reviews")}
        >
          Reviews
        </Link>
        <Link
          className="btn standard"
          href="/create"
          onClick={() => setCurrentPage("create")}
        >
          Create
        </Link>
      </nav>
    </header>
    // <header>
    //   <button className="btn logo" onClick={() => setCurrentPage("home")}>
    //     <Image src="/logo-csr.png" alt="logo" fill={true} />
    //   </button>
    //   <nav className="nav">
    //     <button className="btn standard" onClick={() => setCurrentPage("home")}>
    //       Home
    //     </button>
    //     <button
    //       className="btn standard"
    //       onClick={() => setCurrentPage("reviews")}
    //     >
    //       Reviews
    //     </button>
    //     <button
    //       className="btn standard"
    //       onClick={() => setCurrentPage("create")}
    //     >
    //       Create
    //     </button>
    //   </nav>
    // </header>
  );
}
