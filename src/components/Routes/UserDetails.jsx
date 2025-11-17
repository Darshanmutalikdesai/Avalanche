import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getUserByEmail, markEntry } from "../../utils/api";

export default function UserDetails() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const email = params.get("email");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!fetchedRef.current && email) {
      fetchedRef.current = true;
      fetchData();
    }
  }, [email]);

  const fetchData = async () => {
    try {
      const data = await getUserByEmail(email);
      setUser(data);
      console.log(data);
    } catch (err) {
      console.error("User not found", err);
      alert("User not found!");
    } finally {
      setLoading(false);
    }
  };

  const handleEntry = async () => {
    if (user.entryMarked) return; // ⭐ prevent calling API if already marked

    try {
      await markEntry(user.email);
      alert("Entry marked successfully!");
      navigate("/verify-users");
    } catch (err) {
      console.error(err);
      alert("Failed to mark entry");
    }
  };

  const handleClose = () => {
    navigate("/verify-users");
  };

  if (loading)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  if (!user)
    return (
      <div className="text-center mt-20 text-red-400">User not found</div>
    );

  // ⭐ NEW LOGIC: determine entry status
  const isEntered = user.entryMarked === true;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="relative max-w-md mx-auto bg-gray-800 p-5 rounded-xl shadow-xl border border-gray-700">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-md text-white hover:bg-red-700"
        >
          Close
        </button>

        <h2 className="text-2xl font-bold mt-4 text-center">
          {user.name}
        </h2>

        <p className="text-center text-gray-300 text-sm">{user.email}</p>

        <div className="mt-6 space-y-2 text-sm">
          <p><strong>Avalanche ID:</strong> {user.avalancheId}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Roll No:</strong> {user.rollno}</p>
          <p><strong>College:</strong> {user.schlclgName}</p>

          <p>
            <strong>Payment:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                user.payment ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {user.payment ? "Paid" : "Not Paid"}
            </span>
          </p>

          {/* ⭐ ENTRY MARKED STATUS */}
          <p>
            <strong>Entry Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                isEntered ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {isEntered ? "Already Entered" : "Not Entered"}
            </span>
          </p>

          <div>
            <strong>Registered Events:</strong>
            <ul className="list-disc ml-6 text-gray-300">
              {user.registeredEvents?.map((event, i) => (
                <li key={i}>
                  {event.name}{" "}
                  <span className="text-gray-400 text-sm">
                    ({event.eventId})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ⭐ ENTRY BUTTON WITH LOGIC */}
        <button
          onClick={handleEntry}
          disabled={isEntered}
          className={`w-full mt-6 py-3 font-semibold rounded-lg transition ${
            isEntered
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isEntered ? "Entry Already Marked" : "Mark Entry"}
        </button>

      </div>
    </div>
  );
}
