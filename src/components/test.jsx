import React, { useState, useEffect } from "react";

const API_URL = `https://avalanche.git.edu/api`;

const test = () => {
  const [eventsData, setEventsData] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [avalancheIds, setAvalancheIds] = useState([]);
  const [validationStatuses, setValidationStatuses] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successModal, setSuccessModal] = useState(null);

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      const data = await res.json();
      if (data.success) {
        setEventsData(data.events);
      }
    } catch (err) {
      console.error("Error loading events:", err);
    }
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    if (!eventId) {
      setSelectedEvent(null);
      setAvalancheIds([]);
      setValidationStatuses({});
      return;
    }
    const event = eventsData[eventId];
    setSelectedEvent(event);
    setAvalancheIds(Array(event.maxMembers).fill(""));
    setValidationStatuses({});
  };

  const handleAvalancheChange = (index, value) => {
    const updated = [...avalancheIds];
    updated[index] = value;
    setAvalancheIds(updated);
  };

  const validateAvalancheId = async (index) => {
    const avalancheId = avalancheIds[index]?.trim();
    if (!avalancheId) {
      setValidationStatuses((prev) => ({
        ...prev,
        [index]: { text: "", status: "" },
      }));
      return;
    }

    setValidationStatuses((prev) => ({
      ...prev,
      [index]: { text: "Checking...", status: "checking" },
    }));

    try {
      const res = await fetch(`${API_URL}/users/${avalancheId}`);
      const data = await res.json();

      if (data.success && data.user.payment && data.user.active) {
        setValidationStatuses((prev) => ({
          ...prev,
          [index]: { text: `✓ Valid - ${data.user.name}`, status: "valid" },
        }));
      } else if (data.success && !data.user.payment) {
        setValidationStatuses((prev) => ({
          ...prev,
          [index]: { text: "✗ Payment not completed", status: "invalid" },
        }));
      } else if (data.success && !data.user.active) {
        setValidationStatuses((prev) => ({
          ...prev,
          [index]: { text: "✗ Account not active", status: "invalid" },
        }));
      } else {
        setValidationStatuses((prev) => ({
          ...prev,
          [index]: { text: "✗ Invalid Avalanche ID", status: "invalid" },
        }));
      }
    } catch (err) {
      setValidationStatuses((prev) => ({
        ...prev,
        [index]: { text: "✗ Error checking ID", status: "invalid" },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const validIds = avalancheIds.filter((id) => id.trim());
    if (validIds.length < selectedEvent.minMembers) {
      setErrorMsg(`Minimum ${selectedEvent.minMembers} team members required`);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: Object.keys(eventsData).find(
            (key) => eventsData[key] === selectedEvent
          ),
          avalancheIds: validIds,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessModal(data);
        setSelectedEvent(null);
        setAvalancheIds([]);
      } else {
        let msg = data.error || "Registration failed";
        if (data.invalidIds) {
          msg += "\n\nInvalid IDs:\n" + data.invalidIds
            .map((id) => `${id.avalancheId}: ${id.reason}`)
            .join("\n");
        }
        setErrorMsg(msg);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const initializeEvents = async () => {
    if (!window.confirm("This will initialize/reset all events. Continue?")) return;
    try {
      const res = await fetch(`${API_URL}/initialize-events`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`Success! ${data.eventsCount} events initialized.`);
        loadEvents();
      } else alert("Error: " + data.error);
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎯 Avalanche 2025</h1>
        <p>Event Registration Portal</p>
      </div>

      <div className="card">
        <h2 className="section-title">Register for Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Event *</label>
            <select value={selectedEvent ? selectedEvent.name : ""} onChange={handleEventChange} required>
              <option value="">-- Choose an Event --</option>
              {Object.entries(eventsData).map(([id, event]) => (
                <option key={id} value={id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <>
              <div className="event-info">
                <p><strong>Event Name:</strong> {selectedEvent.name}</p>
                <p><strong>Team Size:</strong> {`${selectedEvent.minMembers} - ${selectedEvent.maxMembers} members`}</p>
                <p><strong>Available Slots:</strong> {`${selectedEvent.maxRegistrations - (selectedEvent.registrationCount || 0)} / ${selectedEvent.maxRegistrations}`}</p>
              </div>

              <div className="avalanche-id-container">
                <label>Team Members (Avalanche IDs) *</label>
                {avalancheIds.map((val, i) => (
                  <div className="avalanche-id-input" key={i}>
                    <label>
                      Member {i + 1} {i < selectedEvent.minMembers ? "*" : "(Optional)"}
                    </label>
                    <input
                      type="text"
                      value={val}
                      placeholder="Enter Avalanche ID (e.g., AVA20250001)"
                      required={i < selectedEvent.minMembers}
                      onChange={(e) => handleAvalancheChange(i, e.target.value)}
                      onBlur={() => validateAvalancheId(i)}
                    />
                    <div className={`validation-status ${validationStatuses[i]?.status || ""}`}>
                      {validationStatuses[i]?.text}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {loading && (
            <div className="loading active">
              <div className="spinner"></div>
              <p>Processing registration...</p>
            </div>
          )}

          {errorMsg && <div className="error-message active">{errorMsg}</div>}

          <button type="submit" className="btn" disabled={loading}>
            Register Team
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="section-title">🔧 Admin Actions</h2>
        <button className="btn" onClick={initializeEvents} style={{ marginBottom: "10px" }}>
          Initialize Events Database
        </button>
        <button className="btn" onClick={() => window.open(`${API_URL}/events`, "_blank")}>
          View All Events
        </button>
      </div>

      {successModal && (
        <div className="modal active">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p><strong>Team Name:</strong> {successModal.teamName}</p>
            <p><strong>Registration ID:</strong> {successModal.registrationId}</p>
            <p><strong>Event:</strong> {successModal.eventName}</p>
            <a href={successModal.whatsappLink} target="_blank" rel="noreferrer" className="whatsapp-btn">
              📱 Join WhatsApp Group
            </a>
            <br />
            <button className="close-modal" onClick={() => setSuccessModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default test;
