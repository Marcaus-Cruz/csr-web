import "./pageHeader.css";
import Image from "next/image";

export default function PageHeader({ setCurrentPage }) {
  return (
    <header>
      <button className="btn logo" onClick={() => setCurrentPage("home")}>
        <Image src="/logo-csr.png" alt="logo" fill={true} />
      </button>
      <nav className="nav">
        <button className="btn standard" onClick={() => setCurrentPage("home")}>
          Home
        </button>
        <button
          className="btn standard"
          onClick={() => setCurrentPage("reviews")}
        >
          Reviews
        </button>
        <button
          className="btn standard"
          onClick={() => setCurrentPage("create")}
        >
          Create
        </button>
      </nav>
    </header>
  );
}
