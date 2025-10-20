import React, { useEffect, useState } from "react";

function PaymentGateway() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://virginia-economic.gl.at.ply.gg:36272/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Payment Gateway testing </h1>
      <p className="text-lg">{message}</p>
    </div>
  );
}

export default PaymentGateway;
