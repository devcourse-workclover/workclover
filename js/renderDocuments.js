import { getDocuments } from "../apis/getDocuments.js";

window.addEventListener("DOMContentLoaded", () => {
  async function fetchData() {
    const data = await getDocuments();
    renderDocumentList(data);
  }

  fetchData();
});

export const renderDocumentList = (data) => {
  const documentList = document.querySelector(".document-list");
  documentList.innerHTML = "";
  data.forEach((item) => {
    const documentItem = document.createElement("li");
    documentItem.innerText = item.title;
    documentList.appendChild(documentItem);
  });
};
