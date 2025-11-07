import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./Common/Navbar";
import BackButton from "./Common/BackButton";
import Footer from "./Common/footer";
import AuthManager from "../../utils/authManager"; // IMPORT AUTH MANAGER

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventNameFromState = location.state?.event.eventName;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userAvalancheId = user.avalancheId || "";
  const eventId = location.state?.event.eventId;
  const [fetchingConfig, setFetchingConfig] = useState(true);
  const [displayEventName, setDisplayEventName] = useState(eventNameFromState || "");
  const [whatsappLink, setwhatsappLink] = useState("");

  const [teamConfig, setTeamConfig] = useState({
    minTeamMembers: 0,
    maxTeamMembers: 0,
  });

  const [paymentStatus, setPaymentStatus] = useState([]);
  const [checkingPayment, setCheckingPayment] = useState([]);

  const [formData, setFormData] = useState({
    eventId: eventId || "",
    teamId: "",
    userIds: [""],
    teamSize: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ⭐ SESSION CHECK ON MOUNT
  useEffect(() => {
    // Only check authentication if user data exists in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!user.avalancheId) {
      alert('⚠ Please log in to register for events.');
      navigate("/register");
      return;
    }

    if (!AuthManager.isAuthenticated()) {
      alert('⚠ Your session has expired. Please log in again.');
      AuthManager.clearAuth();
      navigate("/register");
      return;
    }

    // ⭐ START SESSION MONITOR
    AuthManager.startSessionMonitor(() => {
      alert('⚠ Your session has expired. Please log in again.');
      navigate("/register");
    });

    return () => {
      // ⭐ CLEANUP SESSION MONITOR
      AuthManager.stopSessionMonitor();
    };
  }, [navigate]);

  // ⭐ PUBLIC API CALL FOR EVENT DETAILS (No Auth Required)
  useEffect(() => {
    const eventDetail = async () => {
      try {
        // This is a PUBLIC endpoint - no authentication required
        const res = await fetch(`https://avalanche.git.edu/api/events/${eventId}/stats`);

        if (!res.ok) {
          throw new Error(`Failed to fetch event details: ${res.status}`);
        }

        const data = await res.json();
        console.log("Event stats fetched:", data);

        // Fetch the full event document for team size details
        const eventRes = await fetch(`https://avalanche.git.edu/api/events`);
        const eventsData = await eventRes.json();
        const eventDetails = eventsData.events?.find(e => e.id === eventId);

        if (eventDetails) {
          setTeamConfig({
            minTeamMembers: eventDetails.minMembers || eventDetails.EventTeamMinSize || 1,
            maxTeamMembers: eventDetails.maxMembers || eventDetails.EventTeamMaxSize || 1,
          });
        }
        
        if (data.name && !eventNameFromState) {
          setDisplayEventName(data.name);
        }
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        alert('❌ Failed to load event details. Please try again.');
      } finally {
        setFetchingConfig(false);
      }
    };

    if (eventId) {
      eventDetail();
    } else {
      setFetchingConfig(false);
    }
  }, [eventId, eventNameFromState]);

  const teamSizeOption = [];
  for (let i = teamConfig.minTeamMembers; i <= teamConfig.maxTeamMembers; i++) {
    teamSizeOption.push(i);
  }

  // ⭐ PROTECTED: Payment Status Check (Requires Auth)
  const checkPaymentStatus = async (avalancheId, index) => {
    if (!avalancheId.trim()) {
      const newPaymentStatus = [...paymentStatus];
      newPaymentStatus[index] = null;
      setPaymentStatus(newPaymentStatus);
      return;
    }

    // Check authentication before API call
    if (!AuthManager.isAuthenticated()) {
      alert('⚠ Your session has expired. Please log in again.');
      navigate("/register");
      return;
    }

    const newCheckingPayment = [...checkingPayment];
    newCheckingPayment[index] = true;
    setCheckingPayment(newCheckingPayment);

    try {
      // Use the payment-check query parameter to bypass email verification
      const response = await AuthManager.authenticatedFetch(
        `https://avalanche.git.edu/api/user/${avalancheId}?type=payment-check`
      );

      if (!response.ok) {
        throw new Error(`User not found or API error: ${response.status}`);
      }

      const data = await response.json();

      console.log(`Payment check for ${avalancheId}:`, data.user?.payment);

      const newPaymentStatus = [...paymentStatus];
      newPaymentStatus[index] = (data.user?.payment === true);
      setPaymentStatus(newPaymentStatus);

    } catch (error) {
      if (error.message === 'SESSION_EXPIRED') {
        alert('⚠ Your session has expired. Please log in again.');
        navigate("/register");
      } else {
        console.error("Error checking payment for", avalancheId, ":", error);
        const newPaymentStatus = [...paymentStatus];
        newPaymentStatus[index] = false;
        setPaymentStatus(newPaymentStatus);
      }
    } finally {
      const newCheckingPayment = [...checkingPayment];
      newCheckingPayment[index] = false;
      setCheckingPayment(newCheckingPayment);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "teamSize") {
      const size = parseInt(value);

      const newUserIds = Array(size).fill("").map((_, idx) => {
        if (idx === 0 && userAvalancheId) {
          return userAvalancheId;
        }
        return formData.userIds[idx] || "";
      });

      setFormData({
        ...formData,
        userIds: newUserIds,
        teamSize: value,
        teamId: size === 1 ? user.name : formData.teamId
      });

      const newPaymentStatus = Array(size).fill(null);
      const newCheckingPayment = Array(size).fill(false);
      setPaymentStatus(newPaymentStatus);
      setCheckingPayment(newCheckingPayment);

      if (userAvalancheId) {
        setTimeout(() => checkPaymentStatus(userAvalancheId, 0), 100);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTeamMemberChange = (index, value) => {
    const newUserIds = [...formData.userIds];
    newUserIds[index] = value;
    setFormData({ ...formData, userIds: newUserIds });

    if (window.paymentCheckTimeout) {
      clearTimeout(window.paymentCheckTimeout);
    }

    window.paymentCheckTimeout = setTimeout(() => {
      checkPaymentStatus(value, index);
    }, 800);
  };

  const allPaymentsConfirmed = () => {
    const filledMembers = formData.userIds.filter(m => m.trim() !== "");
    if (filledMembers.length === 0) return false;

    return filledMembers.every((member, idx) => {
      return member.trim() !== "" && paymentStatus[idx] === true;
    });
  };

  // ⭐ SECURE EVENT REGISTRATION SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ⭐ CHECK AUTHENTICATION BEFORE SUBMISSION
      if (!AuthManager.isAuthenticated()) {
        throw new Error('SESSION_EXPIRED');
      }

      const avalancheIds = formData.userIds
        .map(id => id.trim())
        .filter(id => id !== "");

      if (avalancheIds.length === 0) {
        throw new Error("Please provide at least one team member ID");
      }

      if (avalancheIds.length !== parseInt(formData.teamSize)) {
        throw new Error(`Please provide exactly ${formData.teamSize} team member ID(s)`);
      }

      if (!allPaymentsConfirmed()) {
        throw new Error("All team members must have confirmed payment before registration");
      }

      let teamName;
      if (parseInt(formData.teamSize) === 1) {
        teamName = user.name;
      } else {
        if (!formData.teamId.trim()) {
          throw new Error("Please provide a team name");
        }
        teamName = formData.teamId.trim();
      }

      const payload = {
        userIds: avalancheIds,
        eventId: eventId,
        teamId: teamName,
      };

      console.log("📤 Submitting registration:", payload);

      // ⭐ USE AUTHENTICATED FETCH
      const response = await AuthManager.authenticatedFetch(
        "https://avalanche.git.edu/api/events/register",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("📥 Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      // ⭐ FETCH WHATSAPP LINK (Public Endpoint)
      const stats = await fetch(`https://avalanche.git.edu/api/events/${eventId}/stats`);
      const res = await stats.json();
      setwhatsappLink(res.whatsappLink);

      setMessage(`✅ ${data.message}`);
      console.log("✅ Registration successful:", data);

      setFormData({
        eventId: eventId,
        teamId: "",
        userIds: [""],
        teamSize: "",
      });
      setPaymentStatus([]);
      setCheckingPayment([]);

    } catch (error) {
      if (error.message === 'SESSION_EXPIRED') {
        setMessage("⚠ Your session has expired. Please log in again.");
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      } else {
        setMessage(`❌ ${error.message}`);
        console.error("❌ Registration error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#00111f] to-black text-white">
        <div className="text-cyan-300 text-xl">Loading configuration...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#00111f] to-black text-white font-orbitron"
      style={{ fontFamily: "Nasalization, sans-serif" }}
    >
      <NavigationBar />

      {/* ⭐ SESSION TIMER DISPLAY */}
      <div className="fixed top-20 right-4 bg-black/60 border border-cyan-400 rounded-lg px-4 py-2 text-cyan-300 text-sm z-50">
        ⏱ Session: {AuthManager.getTimeRemaining()}m remaining
      </div>

      <div className="mt-32 bg-black/60 border border-cyan-400 rounded-2xl shadow-[0_0_20px_#00eaff] p-8 w-[90%] max-w-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-6">
          {displayEventName} Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              value={displayEventName}
              disabled
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white opacity-70"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Team Size <span className="text-red-400">*</span>
            </label>
            <select
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-300"
              required
            >
              <option value="">Select Team Size</option>
              {teamSizeOption.map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? "Member" : "Members"}
                </option>
              ))}
            </select>
          </div>

          {formData.teamSize && parseInt(formData.teamSize) > 1 && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Team Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="teamId"
                placeholder="Enter your team name"
                value={formData.teamId}
                onChange={handleChange}
                className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-300"
                required
              />
            </div>
          )}

          {formData.teamSize && formData.userIds.map((member, index) => (
            <div key={index} className="relative">
              <label className="block text-sm font-semibold mb-2">
                {parseInt(formData.teamSize) === 1
                  ? "Your Avalanche ID"
                  : index === 0
                    ? "Your Avalanche ID (Team Member 1)"
                    : `Team Member ${index + 1} ID`}{" "}
                <span className="text-red-400">*</span>
                {checkingPayment[index] && (
                  <span className="text-yellow-400 text-xs ml-2">Checking...</span>
                )}
                {paymentStatus[index] === true && (
                  <span className="text-green-400 text-xs ml-2">✓ Payment Confirmed</span>
                )}
                {paymentStatus[index] === false && (
                  <span className="text-red-400 text-xs ml-2">✗ Payment Not Found (Please complete payment in the User Portal)</span>
                )}
              </label>
              <input
                type="text"
                placeholder={index === 0 ? "Your Avalanche ID (auto-filled)" : "Enter Avalanche ID"}
                disabled={index === 0}
                value={member}
                onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                className={`w-full bg-black/40 rounded-md px-4 py-2 text-white focus:outline-none transition-all duration-300 ${paymentStatus[index] === true
                    ? "border-2 border-green-500 focus:border-green-400"
                    : (paymentStatus[index] === false
                      ? "border-2 border-red-500 focus:border-red-400"
                      : "border border-cyan-400 focus:border-cyan-300")
                  }`}
                required
              />
              {index === 0 && userAvalancheId && (
                <p className="text-xs text-cyan-400/60 mt-1">
                  This is your registered Avalanche ID
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading || !allPaymentsConfirmed()}
            className="w-full bg-cyan-400 text-black font-bold py-3 rounded-md hover:bg-cyan-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Register Team"}
          </button>

          {formData.teamSize && !allPaymentsConfirmed() && (
            <p className="text-yellow-400 text-xs text-center">
              All team members must have confirmed payment to register
            </p>
          )}
        </form>

        {message && (
          <div
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
            onClick={() => setMessage("")}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-[rgba(0,15,30,0.95)] border-2 border-[#00f7ff] rounded-xl shadow-[0_0_30px_rgba(0,247,255,0.6)] max-w-2xl w-full p-6 sm:p-8 relative animate-[fadeIn_0.3s_ease-in-out] max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl sm:text-3xl font-bold font-nasal text-[#ffcc00] mb-4">
                {message}
              </h2>
              <p>
                {message.includes("❌") ? (
                  <>
                    {message.includes("expired") ? (
                      "Your session has expired. Redirecting to login..."
                    ) : (
                      <>
                        You've already registered.
                        <br />
                        Please join the WhatsApp group if you haven't!!
                        <br /><br />
                        <b>Note:</b> If you haven't already registered, please contact our dev team to fix the issue!!
                      </>
                    )}
                  </>
                ) : (
                  <>
                    Thank you for registering!!
                    <br />
                    Please do join the event's WhatsApp group for further notice
                  </>
                )}
              </p>
              <div className="flex flex-wrap gap-4 justify-end">
                {!message.includes("expired") && (
                  <a href={eventId === "paper_presentation" ? "https://linktr.ee/PaperPresentaion_avalanche25" : `${whatsappLink}`} target="_blank" rel="noopener noreferrer">
                    <div className="w-20 h-14 rounded-lg bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center border-2 border-[#00f7ff] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.8)]">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                  </a>
                )}
                <button
                  className="px-6 py-3 bg-transparent border-2 border-[#00f7ff] rounded-lg text-[#00f7ff] font-bold transition-all duration-300 ease-in-out hover:bg-[#00f7ff] hover:scale-110 hover:text-black hover:shadow-[0_0_15px_#00f7ff]"
                  onClick={() => setMessage("")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-[0.5rem] right-6 sm:right-10 z-[120]">
        <BackButton />
      </div>
    </div>
  );
};

export default RegisterPage;