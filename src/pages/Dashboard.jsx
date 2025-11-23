import { useEffect, useState } from "react";
import AddLinkForm from "../components/AddLinkForm.jsx";
import LinkTable from "../components/LinkTable.jsx";
import { getAllTinyLinks, deleteTinyLink } from "../Services/tinyLink.js";
import { toast } from "sonner";
import ToasterAlert from "../toaster/ToasterAlert";
import Loader from "../loader/Loader";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await getAllTinyLinks();
      setLinks(response.data.data || response.data);
    } catch (error) {
      toast.error(error?.message || "Error fetching links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (code) => {
    if (!window.confirm("Delete this link permanently?")) return;
    try {
      setLoading(true);
      const response = await deleteTinyLink(code);
      toast.success(response.message || "Link deleted successfully");
      fetchLinks();
    } catch (error) {
      toast.error(error?.message || "Error deleting link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ToasterAlert />
      <main className="page">
        <section className="hero">
          <h1 className="hero-title">Shorten Your Loooong Links ⚡</h1>
          <p className="hero-subtitle">
            TinyLink is a simple URL shortening service with click statistics.
          </p>
        </section>

        <section className="content">
          <div className="shorten-card">
            <AddLinkForm onLinkCreated={fetchLinks} />
          </div>

          <div className="links-section">
            <h2 className="section-title">Your Links</h2>
            {links.length === 0 ? (
              <div className="state-message">
                No links yet. Create one above
              </div>
            ) : (
              <LinkTable links={links} onDelete={handleDelete} />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
