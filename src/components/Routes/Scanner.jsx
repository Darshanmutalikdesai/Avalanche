import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRScanner from "../verifyUsers";

const ALLOWED_SCANNER_EMAILS = [
  "amogh.k.2042@gmail.com",
  "kedari.koushal44@gmail.com",
  "22u1040@students.git.edu",
  "laxmandesai7932@gmail.com",
  "pratiksadekar2004@gmail.com",
];

export default function Scanner() {
  const navigate = useNavigate();
  const [accessDenied, setAccessDenied] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isEmailAllowed = (email) => {
    return ALLOWED_SCANNER_EMAILS.includes(email.toLowerCase());
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const email = user.email || "";
    setUserEmail(email);

    if (!user.avalancheId || !email) {
      alert('⚠ Please log in to access the scanner.');
      navigate("/register");
      return;
    }

    if (!isEmailAllowed(email)) {
      setAccessDenied(true);
    }

    setIsLoading(false);
  }, [navigate]);

  const handleScan = (data) => {
    if (!data) return;
    try {
      const cleanData = data.trim();
      const decodedEmail = atob(cleanData);
      console.log("Decoded Email:", decodedEmail);
      
      if (!decodedEmail.includes("@")) {
        throw new Error("Invalid decoded email");
      }
      
      navigate(`/user-verification?email=${encodeURIComponent(decodedEmail)}`);
    } catch (err) {
      console.error("Invalid QR Code", err);
      alert("Invalid QR Code scanned");
    }
  };

  if (accessDenied) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="max-w-md w-full bg-gray-800 border-2 border-red-500 rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.5)] p-8 text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">
            Your email address ({userEmail || "not provided"}) is not authorized to access the QR scanner.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Only authorized personnel can use this feature. Please contact the administrator if you believe this is an error.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Checking access...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
      <QRScanner onScan={handleScan} />
    </div>
  );
}