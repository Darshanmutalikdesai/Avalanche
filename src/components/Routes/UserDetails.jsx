import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserByEmail, markEntry } from "../../utils/api";

export default function UserDetails() {
  const [params] = useSearchParams();
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
    try {
      await markEntry(user.email);
      alert("Entry marked successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to mark entry");
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  if (!user)
    return (
      <div className="text-center mt-20 text-red-400">User not found</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto bg-gray-800 p-5 rounded-xl shadow-xl border border-gray-700">

        
        {/* Name */}
        <h2 className="text-2xl font-bold mt-4 text-center">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-center text-gray-300 text-sm">{user.email}</p>

        {/* Info List */}
        <div className="mt-6 space-y-2 text-sm">

          <p><strong>Avalanche ID:</strong> {user.avalancheId}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Roll No:</strong> {user.rollno}</p>
          <p>
            <strong>College:</strong> {user.schlclgName}
          </p>

          {/* Payment Badge */}
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

          
          {/* Registered Events */}
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

        {/* Entry Button */}
        <button
          onClick={handleEntry}
          className="bg-green-500 w-full mt-6 py-3 font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Mark Entry
        </button>
      </div>
    </div>
  );
}