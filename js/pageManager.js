import { addDocument } from "../apis/addDocument.js";
import { getDocuments } from "../apis/getDocuments.js";

window.addEventListener("DOMContentLoaded", () => {
  const addPageBtn = document.querySelector(".add-page-btn");

  addPageBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await addDocument();
    viewPageList();
  });

  viewPageList();
});

function setPageList(pages, parent) {
  pages.forEach((page) => {
    const liElement = document.createElement("li");
    liElement.classList.add("document-item");

    const anchorElement = document.createElement("a");
    anchorElement.href = "/" + page.id;
    anchorElement.textContent = page.title;

    liElement.append(anchorElement);
    parent.append(liElement);

    if (page.documents.length > 0) {
      const ulElement = document.createElement("ul");
      ulElement.classList.add("document-sub-list");

      const button = document.createElement("button");
      button.classList.add("show-sublist-btn");
      button.classList.add("ir");
      button.textContent = "하위 페이지 토글";
      button.addEventListener("click", (e) => {
        e.preventDefault();
        ulElement.classList.toggle("none");
      });

      liElement.append(button);
      liElement.append(ulElement);
      setPageList(page.documents, ulElement);
    }
  });
}

export async function viewPageList() {
  const documents = await getDocuments();
  const documentList = document.querySelector(".document-list");
  documentList.innerHTML = "";
  setPageList(documents, documentList);
}
