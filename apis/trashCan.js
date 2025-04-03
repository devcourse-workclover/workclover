import { BASE_URL } from "./getDocuments.js";

export const trashcan = "trashcan";

// 휴지통 조회
export async function getTrashList() {
  const response = await fetch(`${BASE_URL}/documents`, {
    method: "GET",
    headers: {
      "x-username": trashcan,
    },
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}

// 휴지통으로 이동 (휴지통에 post)
export async function postTrash(parent) {
  const response = await fetch(`${BASE_URL}/documents`, {
    method: "POST",
    headers: {
      "x-username": trashcan,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "새 페이지",
      parent,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}

// 휴지통에서 완전삭제
export async function deleteTrash(documentId) {
  const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
    method: "DELETE",
    headers: {
      "x-username": trashcan,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}
