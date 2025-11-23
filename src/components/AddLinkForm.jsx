import { useState } from "react";
import { createTinyLink } from "../Services/tinyLink.js";
import { toast } from "sonner";
import Loader from "../loader/Loader";
import ToasterAlert from "../toaster/ToasterAlert";
function AddLinkForm({ onLinkCreated }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const validateUrl = (value) => {
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      return toast.error("Enter a valid URL starting with http:// or https://");
    }

    if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return toast.error("Custom code must be 6–8 characters (A-Z, 0-9)");
    }

    setLoading(true);
    try {
      const res = await createTinyLink({ url, code });
      toast.success(res.message || "Link created successfully");
      setUrl("");
      setCode("");
      onLinkCreated();
    } catch (err) {
      toast.error(err?.message || "Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ToasterAlert />
      <form className="shorten-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            className="input"
            value={url}
            placeholder="Enter URL..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="btn primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Shorten"}
          </button>
        </div>
        <input
          className="input secondary-input"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </form>
    </>
  );
}

export default AddLinkForm;
