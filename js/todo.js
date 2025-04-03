document.addEventListener("DOMContentLoaded", () => {
  const closeTodo = document.querySelector(".todolist-right-btn"); // 사이드바 닫기 버튼
  const todoTab = document.querySelector(".todolist-container"); // 사이드바
  const tabOption = {
    duration: 1400,
    easing: "ease",
    fill: "forwards",
  };

  // 메뉴 닫기
  closeTodo.addEventListener("click", () => {
    console.log("clicked");
    todoTab.animate({ translate: [0, "100vw"] }, tabOption);
  });
});

// todolist-closed -> display: block
