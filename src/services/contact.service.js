const API_URL = "http://localhost:3001/api/contact";

export async function sendContact(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Error enviando mensaje");
  }

  return json;
}
