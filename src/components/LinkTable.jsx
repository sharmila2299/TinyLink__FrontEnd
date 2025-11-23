import { useState } from "react";
import { Link } from "react-router-dom";

const LinkTable = ({ links, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(links.length / pageSize);

  const handleCopy = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
    } catch {
      alert("Failed to copy. You can copy manually.");
    }
  };

  const origin = import.meta.env.VITE_API_BASEURL;

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageLinks = links.slice(startIndex, startIndex + pageSize);

  return (
    <div className="links-table-wrapper">
      <table className="links-table table table-striped table-bordered">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Code</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageLinks.map((link) => {
            const shortUrl = `${origin}/${link.code}`;
            return (
              <tr key={link.code}>
                <td>
                  <button
                    className="link-chip"
                    type="button"
                    onClick={() => handleCopy(shortUrl)}
                  >
                    {shortUrl}
                  </button>
                </td>
                <td>
                  <span className="url-cell" title={link.target_url}>
                    {link.target_url}
                  </span>
                </td>
                <td>
                  <Link to={`/code/${link.code}`} className="code-link">
                    {link.code}
                  </Link>
                </td>
                <td>{link.total_clicks ?? 0}</td>
                <td>{link.last_clicked || "—"}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => onDelete(link.code)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LinkTable;
