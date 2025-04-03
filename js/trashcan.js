import { getTrashDocuments } from "../apis/getTrashDocuments.js";
import { completeDeleteDocuments } from "../apis/completeDeleteDocuments.js";
import { editTrashDocumentContent } from "../apis/trashCan.js";
import { addDocument } from "../apis/addDocument.js";
import { viewPageList } from "./pageManager.js";
import { updateDocument } from "../apis/updateDocument.js";
import { getDocuments } from "../apis/getDocuments.js";
import { getTrashItem } from "../apis/trashCan.js";

document.addEventListener("DOMContentLoaded", () => {
  const trashcanButton = document.querySelector(".menubar-trashbin");
  const trashTitle = document.querySelector(".menubar-trashbin span");
  const trashList = document.querySelector(".trash-list");
  const dialog = document.querySelector(".trash-modal");

  trashcanButton.addEventListener("mouseenter", (e) => {
    trashTitle.style.borderBottom = "solid";
  });
  trashcanButton.addEventListener("mouseleave", (e) => {
    trashTitle.style.borderBottom = "none";
  });

  async function viewTrashList() {
    trashList.innerHTML = "";
    const trashData = await getTrashDocuments();
    trashData.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = item.title;
      const restore = document.createElement("button");
      const completeDelete = document.createElement("button");
      restore.innerText = "복원";
      completeDelete.innerText = "삭제";
      const div = document.createElement("div");
      div.append(restore, completeDelete);
      li.append(div);
      trashList.appendChild(li);
      restore.addEventListener("click", async () => {
        await addDocument();
        const trashDocumentContent = await getTrashItem(item.id);
        console.log(trashDocumentContent);
        let documentList = await getDocuments();
        documentList = documentList[documentList.length - 1];
        await updateDocument(documentList.id, item.title);
        await viewPageList();
      });

      completeDelete.addEventListener("click", async () => {
        await completeDeleteDocuments(item.id);
        viewTrashList();
      });
    });
  }

  trashcanButton.addEventListener("click", () => {
    dialog.showModal();
    viewTrashList();
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  // 복원
});
