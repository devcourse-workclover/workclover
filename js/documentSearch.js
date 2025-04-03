import { getDocuments } from "../apis/getDocuments.js";
import { renderDocumentList } from "./renderDocuments.js";

window.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-form");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.querySelector(".search-input");
    const inputValue = searchInput.value.replace(/\s+/g, "");

    searchDocuments(inputValue);
    searchInput.value = "";
  });
});

function searchAllDocuments(data, inputValue) {
  const filteredList = [];

  for (const document of data) {
    if (document.title.replace(/\s+/g, "").includes(inputValue)) {
      filteredList.push(document);
    }
    if (document.documents && document.documents.length > 0) {
      const childDocuments = searchAllDocuments(document.documents, inputValue);
      console.log(childDocuments);
      filteredList.concat(childDocuments);
    }
  }
  return filteredList;
}

export async function searchDocuments(inputValue) {
  const data = await getDocuments();

  if (!inputValue) {
    renderDocumentList(data);
  }
  const filteredData = searchAllDocuments(data, inputValue);

  renderDocumentList(filteredData);
}
