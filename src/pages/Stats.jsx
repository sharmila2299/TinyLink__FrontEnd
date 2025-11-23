import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTinyLinkStats } from "../Services/tinyLink.js";
import { toast } from "sonner";
import Loader from "../loader/Loader";
import ToasterAlert from "../toaster/ToasterAlert.jsx";

const Stats = () => {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getTinyLinkStats(code);
      setData(response.data.data || response.data);
    } catch (err) {
      toast.error(err?.message || "Failed to load stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [code]);

  return (
    <>
      {loading && <Loader />}
      <ToasterAlert />
      <main className="page">
        <section className="content">
          <div className="shorten-card stats-card">
            <div className="stats-header">
              <h1 className="hero-title small">Stats for {code}</h1>
              <Link to="/" className="back-link">
                ← Back
              </Link>
            </div>

            {!data ? (
              <div className="state-message">No stats found.</div>
            ) : (
              <div className="stats-grid">
                <div className="stat-item">
                  <strong>Original URL:</strong> {data.target_url}
                </div>
                <div className="stat-item">
                  <strong>Total Clicks:</strong> {data.total_clicks}
                </div>
                <div className="stat-item">
                  <strong>Last Clicked:</strong> {data.last_clicked || "Never"}
                </div>
                <div className="stat-item">
                  <strong>Created At:</strong> {data.created_at}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Stats;
