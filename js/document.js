import { getDocument } from "../apis/getDocuments.js";
import { updateDocument } from "../apis/updateDocument.js";
import { getSubdocumentLinks } from "./getSubDocumentLinks.js";
import { viewPageList } from "./pageManager.js";

export async function viewDocument(id) {
  // 문서창 초기화
  const main = document.querySelector(".document");
  main.innerHTML = "";

  const data = await getDocument(id);
  const title = createTitle(data);

  // 문서 내용 생성
  const contentBox = document.createElement("div");
  contentBox.classList.add("document-content-box");
  contentBox.innerHTML = data.content;
  if (data.content === null) {
    createContent(contentBox);
  }

  main.append(title);
  main.append(contentBox);

  title.addEventListener("keydown", (e) => {
    e.target.classList.remove("alertMessage");
    if (e.key === "Enter") {
      e.preventDefault();
      title.blur();
    }
  });

  title.addEventListener("blur", async (e) => {
    if (e.target.textContent.trim() === "") {
      e.target.focus();
      e.target.classList.add("alertMessage");
      return;
    }
    await updateDocument(id, title.textContent);
    viewPageList();
  });

  contentBox.addEventListener(
    "input",
    debounce(() => {
      updateDocument(id, null, contentBox.innerHTML);
    }, 1000)
  );

  if (data.documents.length > 0) {
    getSubdocumentLinks(data.documents);
  }
}

function createTitle(data) {
  const div = document.createElement("div");
  div.contentEditable = true;
  if (data.title !== "새 페이지") {
    div.textContent = data.title;
  }
  div.classList.add(`document-title`);
  return div;
}

function createContent(contentBox) {
  const div = document.createElement("div");
  div.contentEditable = true;
  div.classList.add("document-content");
  contentBox.append(div);
  return div;
}

function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}
