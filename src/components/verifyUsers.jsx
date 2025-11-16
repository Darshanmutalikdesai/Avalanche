import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({ onScan }) {
  return (
    <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg">
      <Scanner
        onScan={(result) => {
          if (result && result[0]?.rawValue) {
            onScan(result[0].rawValue);
          }
        }}
        onError={(err) => console.error(err)}
        components={{
          audio: true,
          torch: true,
          finder: true,
        }}
        constraints={{
          facingMode: "environment",
          focusMode: "continuous",
        }}
      />
    </div>
  );
}