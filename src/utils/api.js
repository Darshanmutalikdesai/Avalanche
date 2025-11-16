// Fetch user details using email
export async function getUserByEmail(email) {
  const res = await fetch(
    `https://avalanche.git.edu/api/auth/verify-user/${email}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

// Mark entry (send email in POST body)
export async function markEntry(email) {
  const res = await fetch(
    "https://avalanche.git.edu/api/auth/mark-entry",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to mark entry");
  }

  return res.json();
}