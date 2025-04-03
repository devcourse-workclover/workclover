document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.querySelector(".todolist-right-btn"); // 사이드바 닫기 버튼
  const todoTab = document.querySelector(".todolist-container"); // 사이드바
  const tabOption = {
    duration: 1400,
    easing: "ease",
    fill: "forwards",
  };
  const memo = document.querySelector(".memo");
  const todoArea = document.querySelector(".todolist-box");
  const todoTilte = document.querySelector(".todolist-top");

  let btnImg = document.querySelector(".todolist-right-icon");

  function tabManager() {
    console.log("clicked");

    const currentState = todoTab.className;
    if (currentState !== "todolist-container closed") {
      todoTab.classList.add("closed");
      todoTab.animate({ translate: [0, "235px"] }, tabOption);

      memo.style.display = "none";
      todoArea.style.display = "none";
      todoTilte.style.display = "none";
      btnImg.src = "/workclover/assets/images/todolist-menu-icon.png";
    } else if (currentState == "todolist-container closed") {
      todoTab.classList.remove("closed");
      console.log("닫혀있습니다");
      todoTab.animate({ translate: ["235px", 0] }, tabOption);

      memo.style.display = "block";
      todoArea.style.display = "block";
      todoTilte.style.display = "block";
      btnImg.src = "/workclover/assets/images/arrow-right.png";
    }
  }

  function buttonClick() {
    sidebarToggle.addEventListener("click", tabManager);
  }

  buttonClick();
});

// todolist-closed -> display: block
