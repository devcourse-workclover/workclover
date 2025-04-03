window.document.addEventListener("DOMContentLoaded", () => {
  const trashcanButton = document.querySelector(".menubar-trashbin");
  const trashTitle = document.querySelector(".menubar-trashbin span");

  trashcanButton.addEventListener("mouseenter", (e) => {
    trashTitle.style.borderBottom = "solid";
  });
  trashcanButton.addEventListener("mouseleave", (e) => {
    trashTitle.style.borderBottom = "none";
  });

  trashcanButton.addEventListener("click", () => {
    const trashDropdown = document.createElement("div");
    trashcanButton.appendChild(trashDropdown).classList.add("trashList");
    const trashList = document.querySelector(".trashList");

    trashList.style.display = "block";
  });
  trashcanButton.addEventListener("blur", () => {
    const trashList = document.querySelector(".trashList");
    trashList.style.display = "none";
  });
});
