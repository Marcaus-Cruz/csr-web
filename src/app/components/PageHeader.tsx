import PageTitle from "./PageTitle";
import "./pageHeader.css";

export default function PageHeader({ currentPage, setCurrentPage }) {
  return (
    <header>
      <PageTitle text={currentPage} />
      <nav className="nav">
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("reviews")}>Reviews</button>
        <button onClick={() => setCurrentPage("create")}>Create</button>
      </nav>
    </header>
  );
}
