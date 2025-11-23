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
  const [expanded, setExpanded] = useState(false);

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
              <h1 className="hero-title small mb-2">Stats for {code}</h1>
              <Link to="/" className="back-link">
                ← Back
              </Link>
            </div>

            {data ? (
              <>
                <div className="stat-item full">
                  <span className="stat-label">Original URL</span>

                  <p
                    className={`long-url ${expanded ? "expanded" : ""}`}
                    onClick={() =>
                      window.innerWidth < 600 && setExpanded(!expanded)
                    }
                  >
                    {data.target_url}
                  </p>
                </div>

                <div className="stats-grid-new">
                  <div className="stat-block">
                    <span className="stat-label">Total Clicks</span>
                    <h3 className="stat-value">{data.total_clicks}</h3>
                  </div>

                  <div className="stat-block">
                    <span className="stat-label">Last Clicked</span>
                    <h3 className="stat-value">
                      {data.last_clicked || "Never"}
                    </h3>
                  </div>

                  <div className="stat-block">
                    <span className="stat-label">Created At</span>
                    <h3 className="stat-value">{data.created_at}</h3>
                  </div>
                </div>
              </>
            ) : (
              <div className="state-message">No stats found.</div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Stats;
