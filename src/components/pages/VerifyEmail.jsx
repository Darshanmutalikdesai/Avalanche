import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email/${token}`
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("✅ Email verified successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/auth"); // go to login/register page
          }, 3000);
        } else {
          setStatus(`❌ Verification failed: ${data.message}`);
        }
      } catch (error) {
        setStatus("❌ Something went wrong. Please try again later.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p>{status}</p>
        {status.startsWith("❌") && (
          <button
            onClick={() => navigate("/auth")}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
