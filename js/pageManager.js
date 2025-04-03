import { addDocument } from "../apis/addDocument.js";
import { getDocuments } from "../apis/getDocuments.js";
import { viewDocument } from "./document.js";
import { router } from "./router.js";

window.addEventListener("DOMContentLoaded", () => {
  const newDocumentBtn = document.querySelector(".new-document");
  const addPageBtn = document.querySelector(".add-page-btn");

  addPageBtn.addEventListener("click", addDocumentAction);

  newDocumentBtn.addEventListener("click", addDocumentAction);

  viewPageList();
});

export async function viewPageList() {
  const documents = await getDocuments();
  if (documents.length === 0) {
    return;
  }
  const documentList = document.querySelector(".document-list");
  documentList.innerHTML = "";
  setPageList(documents, documentList);
}

async function addDocumentAction(e) {
  e.preventDefault();
  await addDocument();
  viewPageList();
}

function setPageList(pages, parent) {
  pages.forEach((page) => {
    const liElement = document.createElement("li");
    liElement.classList.add("document-item");

    const anchorElement = document.createElement("a");
    anchorElement.href = page.id;
    anchorElement.textContent = page.title;

    anchorElement.addEventListener("click", (e) => {
      e.preventDefault();
      viewDocument(page.id);
      router(e);
    });

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
        ulElement.style.display =
          ulElement.style.display === "block" ? "none" : "block";
      });

      liElement.append(button);
      liElement.append(ulElement);
      setPageList(page.documents, ulElement);
    }
  });
}
