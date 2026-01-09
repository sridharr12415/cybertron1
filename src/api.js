// src/api.js
const API_BASE = process.env.REACT_APP_API_BASE_URL;

// JSON POST
export async function postJSON(endpoint, data) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// FORM DATA POST (for files)
export async function postForm(endpoint, formData) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Submission conflict");
  }

  return data;
}