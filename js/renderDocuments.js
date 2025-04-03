import { getDocuments } from "../apis/getDocuments.js";

window.addEventListener("DOMContentLoaded", () => {
  async function fetchData() {
    const data = await getDocuments();
    renderFilteredDocumentList(data);
  }

  fetchData();
});

export const renderFilteredDocumentList = (data) => {
  const documentList = document.querySelector(".document-list");
  documentList.innerHTML = "";
  data.forEach((item) => {
    const documentItem = document.createElement("li");
    const anchorElement = document.createElement("a");

    documentItem.classList.add("document-item");
    anchorElement.innerText = item.title;
    anchorElement.href = item.id;

    documentItem.appendChild(anchorElement);
    documentList.appendChild(documentItem);
  });
};
