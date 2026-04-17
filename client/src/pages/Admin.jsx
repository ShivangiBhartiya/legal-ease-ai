import { useEffect, useState } from "react";
import { useTokens } from "../App";
import LogoMark from "../components/LogoMark";

const API = "/api";
const ADMIN_PASSWORD = "1234";

export default function Admin() {
  const tk = useTokens();

  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [waitlist, setWaitlist] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const approvedEntries = waitlist.filter((entry) => entry.status === "approved");
  const pendingEntries = waitlist.filter((entry) => entry.status !== "approved" && entry.status !== "denied");

  const muted = {
    color: tk.textMuted,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1rem",
  };

  const loadData = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [waitlistResult, usersResult] = await Promise.allSettled([
        fetch(`${API}/waitlist`).then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Unable to load waitlist");
          return data;
        }),
        fetch(`${API}/users`).then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Unable to load users");
          return data;
        }),
      ]);

      if (waitlistResult.status === "fulfilled") {
        setWaitlist(Array.isArray(waitlistResult.value.data) ? waitlistResult.value.data : []);
      } else {
        console.error(waitlistResult.reason);
        setWaitlist([]);
      }

      if (usersResult.status === "fulfilled") {
        setUsers(Array.isArray(usersResult.value.data) ? usersResult.value.data : []);
      } else {
        console.error(usersResult.reason);
        setUsers([]);
      }

      if (waitlistResult.status === "rejected" || usersResult.status === "rejected") {
        setLoadError("Some admin data could not be loaded. Please check that the backend is running and available.");
      }
    } catch (err) {
      console.error(err);
      setLoadError("Unable to load admin data right now.");
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (authed) loadData();
  }, [authed]);

  const updateWaitlistStatus = async (id, status) => {
    setUpdatingId(id);
    setActionMessage("");
    setActionError("");
    try {
      const res = await fetch(`${API}/waitlist/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Unable to update status");

      setWaitlist((current) =>
        current.map((entry) => (String(entry.id) === String(id) ? data.data : entry))
      );
      setActionMessage(`Entry ${status === "approved" ? "approved" : "denied"} successfully.`);
      await loadData();
    } catch (err) {
      console.error(err);
      setActionError(err.message || "Unable to update this entry right now.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusPill = (status) => {
    if (status === "approved") {
      return { bg: "rgba(61,168,122,0.14)", border: "rgba(61,168,122,0.35)", color: "#3da87a", label: "Approved" };
    }
    if (status === "denied") {
      return { bg: "rgba(224,82,82,0.12)", border: "rgba(224,82,82,0.35)", color: "#e05252", label: "Denied" };
    }
    return { bg: tk.goldLight, border: tk.goldBorder, color: tk.gold, label: "Pending" };
  };

  const statCard = {
    background: tk.surface,
    border: `1px solid ${tk.goldBorder}`,
    borderRadius: "22px",
    padding: "1.25rem 1.35rem",
    boxShadow: tk.isDark ? "0 24px 60px rgba(0,0,0,0.35)" : "0 18px 50px rgba(31,24,8,0.08)",
    backdropFilter: "blur(20px)",
  };

  const cardStyle = {
    ...statCard,
    padding: "1.5rem",
  };

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.5rem 2rem",
          background: tk.bg,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            background: tk.surface,
            border: `1px solid ${tk.goldBorder}`,
            borderRadius: "24px",
            padding: "2.5rem 2.25rem",
            boxShadow: tk.isDark
              ? "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,100,0.07)"
              : "0 24px 60px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: tk.goldLight,
                border: `1.5px solid ${tk.goldBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <LogoMark size={26} isDark={tk.isDark} />
            </div>
            <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.875rem", margin: "0 0 0.35rem" }}>
              Admin Login
            </h2>
            <p style={{ ...muted, margin: 0 }}>Use the admin password to manage waitlist access.</p>
          </div>

          <input
            type="password"
            placeholder="Enter password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              marginBottom: "1rem",
              borderRadius: "12px",
              border: `1px solid ${tk.inputBorder}`,
              background: tk.inputBg,
              color: tk.textPrimary,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "none",
              background: tk.isDark ? "#c9a84c" : "#1a160c",
              color: tk.isDark ? "#0e0e0f" : "#f9f7f4",
              cursor: "pointer",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.0625rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            Login
          </button>

          {error && <p style={{ color: "#e05252", margin: "0.85rem 0 0", ...muted }}>Wrong password</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "5rem 1.5rem 3rem", color: tk.textPrimary }}>
      <div
        style={{
          ...cardStyle,
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: tk.gold,
              letterSpacing: "0.14em",
              fontSize: "0.8rem",
              margin: "0 0 0.4rem",
              textTransform: "uppercase",
            }}
          >
            Legal Ease AI
          </p>
          <h1 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "2.1rem", margin: "0 0 0.4rem" }}>
            Admin Dashboard
          </h1>
          <p style={{ ...muted, margin: 0 }}>
            Review waitlist entries, approve platform access, and track registered members.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.85rem 1rem",
            borderRadius: "16px",
            background: tk.goldLight,
            border: `1px solid ${tk.goldBorder}`,
          }}
        >
          <LogoMark size={24} isDark={tk.isDark} />
          <p style={{ ...muted, margin: 0 }}>Approve users here before they can access the platform.</p>
        </div>
      </div>

      {loadError && (
        <div
          style={{
            ...cardStyle,
            marginBottom: "1.5rem",
            border: "1px solid rgba(224,82,82,0.35)",
            background: tk.isDark ? "rgba(224,82,82,0.1)" : "rgba(224,82,82,0.08)",
          }}
        >
          <p style={{ ...muted, margin: 0, color: "#e05252" }}>{loadError}</p>
        </div>
      )}

      {actionError && (
        <div
          style={{
            ...cardStyle,
            marginBottom: "1.5rem",
            border: "1px solid rgba(224,82,82,0.35)",
            background: tk.isDark ? "rgba(224,82,82,0.1)" : "rgba(224,82,82,0.08)",
          }}
        >
          <p style={{ ...muted, margin: 0, color: "#e05252" }}>{actionError}</p>
        </div>
      )}

      {actionMessage && !actionError && (
        <div
          style={{
            ...cardStyle,
            marginBottom: "1.5rem",
            border: "1px solid rgba(61,168,122,0.35)",
            background: tk.isDark ? "rgba(61,168,122,0.12)" : "rgba(61,168,122,0.08)",
          }}
        >
          <p style={{ ...muted, margin: 0, color: "#3da87a" }}>{actionMessage}</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={statCard}>
          <p style={{ ...muted, margin: "0 0 0.35rem" }}>Total waitlist</p>
          <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "2rem", margin: 0 }}>{waitlist.length}</h3>
        </div>
        <div style={statCard}>
          <p style={{ ...muted, margin: "0 0 0.35rem" }}>Approved</p>
          <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "2rem", margin: 0 }}>
            {approvedEntries.length}
          </h3>
        </div>
        <div style={statCard}>
          <p style={{ ...muted, margin: "0 0 0.35rem" }}>Pending review</p>
          <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "2rem", margin: 0 }}>
            {pendingEntries.length}
          </h3>
        </div>
        <div style={statCard}>
          <p style={{ ...muted, margin: "0 0 0.35rem" }}>Registered users</p>
          <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "2rem", margin: 0 }}>{users.length}</h3>
        </div>
      </div>

      {loading ? (
        <p style={{ ...muted, fontStyle: "italic" }}>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div style={cardStyle}>
              <div style={{ marginBottom: "1rem" }}>
                <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.25rem", margin: 0 }}>Join Waitlist</h2>
                <p style={{ ...muted, margin: "0.25rem 0 0" }}>Approve in green or deny in red for every entry.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {pendingEntries.length === 0 && <p style={{ ...muted, margin: 0 }}>No pending waitlist entries.</p>}
                {pendingEntries.map((entry) => {
                  const pill = statusPill(entry.status);
                  return (
                    <div
                      key={entry.id}
                      style={{
                        border: `1px solid ${tk.surfaceBorder}`,
                        borderRadius: "18px",
                        padding: "1rem",
                        background: tk.isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.55)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                        <div>
                          <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.125rem", margin: "0 0 0.3rem" }}>{entry.name}</h3>
                          <p style={{ ...muted, margin: "0 0 0.2rem" }}>{entry.email}</p>
                          <p style={{ ...muted, margin: 0 }}>{entry.phone || "No phone shared"}</p>
                        </div>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "999px",
                            background: pill.bg,
                            border: `1px solid ${pill.border}`,
                            color: pill.color,
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {pill.label}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.95rem", flexWrap: "wrap" }}>
                        <button
                          onClick={() => updateWaitlistStatus(entry.id, "approved")}
                          disabled={updatingId === entry.id}
                          style={{
                            border: "1px solid rgba(61,168,122,0.42)",
                            background: "rgba(61,168,122,0.14)",
                            color: "#3da87a",
                            borderRadius: "10px",
                            padding: "0.7rem 1rem",
                            cursor: updatingId === entry.id ? "not-allowed" : "pointer",
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            minWidth: "112px",
                          }}
                        >
                          {updatingId === entry.id ? "Saving..." : "Approve"}
                        </button>
                        <button
                          onClick={() => updateWaitlistStatus(entry.id, "denied")}
                          disabled={updatingId === entry.id}
                          style={{
                            border: "1px solid rgba(224,82,82,0.42)",
                            background: "rgba(224,82,82,0.12)",
                            color: "#e05252",
                            borderRadius: "10px",
                            padding: "0.7rem 1rem",
                            cursor: updatingId === entry.id ? "not-allowed" : "pointer",
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            minWidth: "112px",
                          }}
                        >
                          {updatingId === entry.id ? "Saving..." : "Deny"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ marginBottom: "1rem" }}>
                <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.25rem", margin: 0 }}>Accepted Waitlist Log</h2>
                <p style={{ ...muted, margin: "0.25rem 0 0" }}>Admin accepted entries appear here separately.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {approvedEntries.length === 0 && <p style={{ ...muted, margin: 0 }}>No accepted waitlist entries yet.</p>}
                {approvedEntries.map((entry) => (
                  <div
                    key={entry.id}
                    style={{
                      border: `1px solid ${tk.surfaceBorder}`,
                      borderRadius: "16px",
                      padding: "0.95rem 1rem",
                      background: tk.isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.05rem", margin: "0 0 0.25rem" }}>{entry.name}</h3>
                    <p style={{ ...muted, margin: "0 0 0.2rem" }}>{entry.email}</p>
                    <p style={{ ...muted, margin: 0 }}>{entry.phone || "No phone shared"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ ...cardStyle, marginTop: "1.5rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.25rem", margin: 0 }}>Registered Users</h2>
              <p style={{ ...muted, margin: "0.25rem 0 0" }}>Login and registration now work independently from waitlist approval.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {users.length === 0 && <p style={{ ...muted, margin: 0 }}>No registered users yet.</p>}
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    border: `1px solid ${tk.surfaceBorder}`,
                    borderRadius: "16px",
                    padding: "0.95rem 1rem",
                    background: tk.isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.55)",
                  }}
                >
                  <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.05rem", margin: "0 0 0.25rem" }}>{user.username}</h3>
                  <p style={{ ...muted, margin: 0 }}>{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
