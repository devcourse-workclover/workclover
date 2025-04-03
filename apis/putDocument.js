import { BASE_URL, USERNAME } from "./getDocuments.js";

export async function putDocument(documentId, title = "제목없음", content) {
  const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
    method: "PUT",
    headers: {
      "x-username": USERNAME,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}
