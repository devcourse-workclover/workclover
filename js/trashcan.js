import { getTrashDocuments } from "../apis/getTrashDocuments.js";
import { completeDeleteDocuments } from "../apis/completeDeleteDocuments.js";

document.addEventListener("DOMContentLoaded", () => {
  const trashcanButton = document.querySelector(".menubar-trashbin");
  const trashTitle = document.querySelector(".menubar-trashbin span");
  const trashList = document.querySelector(".trash-list");

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

      completeDelete.addEventListener("click", async () => {
        await completeDeleteDocuments(item.id);
        viewTrashList();
      });
    });
    console.log(trashData);
  }

  const dialog = document.querySelector(".trash-modal");
  trashcanButton.addEventListener("click", () => {
    dialog.showModal();
    viewTrashList();
  });
  dialog.addEventListener("click", (e) => {
    if (e.taraget === dialog) dialog.close();
  });

  // 복원

  // 완전삭제
});
