export const sendMessageToBot = async (message) => {
  const res = await fetch("https://bot-api.zpedia.eu.org/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Gagal menghubungi server");

  const data = await res.json();
  return data;
};
