document.addEventListener("DOMContentLoaded", () => {
  const trashcanButton = document.querySelector(".menubar-trashbin");
  const trashTitle = document.querySelector(".menubar-trashbin span");

  trashcanButton.addEventListener("mouseenter", (e) => {
    trashTitle.style.borderBottom = "solid";
  });
  trashcanButton.addEventListener("mouseleave", (e) => {
    trashTitle.style.borderBottom = "none";
  });

  //리스트에 삭제된 리스트 get
  // trashcanButton.addEventListener("click", () => {
  //   const trashList = document.querySelector(".trashList");
  //   if ((trashList.style.display = "none")) {
  //     trashList.style.display = "block";
  //   } else if ((trashList.style.display = "block")) {
  //     trashList.style.display = "none";
  //   }
  // });
  const dialog = document.querySelector("dialog");
  trashcanButton.addEventListener("click", () => {
    dialog.showModal();
  });
  dialog.addEventListener("click", () => {
    dialog.close();
  });
});
