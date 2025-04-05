import { addDocument } from "../apis/addDocument.js";
import { deleteDocument } from "../apis/deleteDocument.js";
import { getDocument, getDocuments } from "../apis/getDocuments.js";
import { editTrashDocumentContent, postTrash } from "../apis/trashCan.js";
import { updateDocument } from "../apis/updateDocument.js";
import { viewDocument } from "./document.js";
import { router } from "./router.js";

window.addEventListener("DOMContentLoaded", () => {
  const newDocumentBtn = document.querySelector(".new-document");
  const addPageBtn = document.querySelector(".add-page-btn");
  const menubarLogo = document.querySelector(".menubar-logo");

  addPageBtn.addEventListener("click", addDocumentAction);

  newDocumentBtn.addEventListener("click", addDocumentAction);

  menubarLogo.addEventListener("click", getIndexPage);

  viewPageList();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "F5") {
    e.preventDefault();
    getIndexPage();
  }
});

function getIndexPage() {
  const main = document.querySelector(".document");
  router("index.html");
  main.innerHTML = `<div class="welcome-document">
        <h1>
          작은 행운들이 쌓이는 당신만의 워크스페이스.<br /><span
            class="welcome-document-workclover"
            >WorkClover</span
          >에 오신 것을 환영합니다!
        </h1>
        <p>지금 바로 당신의 아이디어를 정리해 보세요.</p>
      </div>`;
}

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
  const data = await addDocument();
  viewPageList();
  viewDocument(data.id);
  router(data.id);
}

function setPageList(pages, parent) {
  pages.forEach((page) => {
    const liElement = document.createElement("li");
    liElement.classList.add("document-item");

    const anchorElement = document.createElement("a");
    anchorElement.href = page.id;
    anchorElement.textContent = page.title;
    anchorElement.classList.add("pageTitle");
    const id = anchorElement.href.split("/").pop();

    anchorElement.addEventListener("click", (e) => {
      e.preventDefault();
      viewDocument(page.id);
      router(e);
    });

    // 더보기버튼
    const moreBtn = document.createElement("button");
    moreBtn.classList.add("moreBtn");
    moreBtn.textContent = "⋮";

    // 더보기 드롭다운 박스
    const moreBox = document.createElement("div");
    moreBox.classList.add("morebox");
    moreBox.style.display = "none";
    moreBox.innerHTML = `
      <span class="add">+ 페이지 추가</span>
      <span class="trash">휴지통으로 이동</span>
      <span class="edit">제목 수정하기</span>
    `;

    liElement.append(anchorElement);
    liElement.append(moreBtn);
    liElement.append(moreBox);
    parent.append(liElement);

    const handleClose = (e) => {
      if (!moreBox.contains(e.target) && !moreBtn.contains(e.target)) {
        moreBox.style.display = "none";
        document.removeEventListener("click", handleClose);
        anchorElement.contentEditable = false;
      }
    };

    const addBtn = moreBox.querySelector(".add");
    const deleteBtn = moreBox.querySelector(".trash");
    const editBtn = moreBox.querySelector(".edit");

    const handleAddSubPage = async (e) => {
      e.preventDefault();
      await addDocument(id);
      viewPageList();
    };

    const handleDelete = async (e) => {
      e.preventDefault();
      const data = await getDocument(id);
      const title = data.title;
      const content = await data.content;

      // delete document
      await deleteDocument(id);
      viewPageList();

      //  post to trashcan
      const trashData = await postTrash(title);

      await editTrashDocumentContent(trashData.id, title, content);
      moreBox.style.display = "none";
    };

    const handleEdit = (e) => {
      e.preventDefault();

      // input입력값 받기
      anchorElement.contentEditable = true;
      anchorElement.focus();

      const handleEnter = async (e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          await updateDocument(id, anchorElement.innerText);
          anchorElement.contentEditable = false;
          viewDocument(id);
          anchorElement.removeEventListener("keydown", handleEdit);
        }
      };

      anchorElement.addEventListener("keydown", handleEnter);

      moreBox.style.display = "none";
    };

    const moreBtnClick = (e) => {
      e.preventDefault();

      moreBox.style.display = "inline-flex";

      document.addEventListener("click", handleClose);

      deleteBtn.removeEventListener("click", handleDelete);
      deleteBtn.addEventListener("click", handleDelete);

      editBtn.removeEventListener("click", handleEdit);
      editBtn.addEventListener("click", handleEdit);

      addBtn.removeEventListener("click", handleAddSubPage);
      addBtn.addEventListener("click", handleAddSubPage);
    };

    moreBtn.addEventListener("click", moreBtnClick);

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

      liElement.prepend(button);

      liElement.append(ulElement);
      setPageList(page.documents, ulElement);
    }
  });
}
