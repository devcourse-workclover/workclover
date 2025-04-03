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
  const badge = document.querySelector("#todolist-count");
  const addTodo = document.querySelector(".todolist-add-btn");
  const todoList = document.querySelector(".todoList");
  let btnImg = document.querySelector(".todolist-right-icon");

  function tabManager() {
    const currentState = todoTab.className;
    if (currentState !== "todolist-container closed") {
      todoTab.classList.add("closed");
      todoTab.animate({ translate: [0, "235px"] }, tabOption);

      memo.style.display = "none";
      todoArea.style.display = "none";
      todoTilte.style.display = "none";
      badge.style.display = "block";
      btnImg.src = "/workclover/assets/images/todolist-menu-icon.png";
    } else if (currentState == "todolist-container closed") {
      todoTab.classList.remove("closed");
      todoTab.animate({ translate: ["235px", 0] }, tabOption);

      memo.style.display = "block";
      todoArea.style.display = "block";
      todoTilte.style.display = "block";
      badge.style.display = "none";
      btnImg.src = "/workclover/assets/images/arrow-right.png";
    }
  }

  function buttonClick() {
    sidebarToggle.addEventListener("click", tabManager);
  }

  buttonClick();

  const inputTodo = document.querySelector(".todolist-content");
  const todoInput = document.querySelector(".todolist-input");

  function hideInput() {
    inputTodo.style.display = "none";
  }

  hideInput();
  // 추가 버튼 클릭 시 추가창 표시
  addTodo.addEventListener("click", () => {
    inputTodo.style.display = "inline-flex";
  });
  // 엔터 입력 시 추가창 숨김
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const item = document.createElement("div");
      const checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.classList.add("todolist-icon");
      const todoText = document.createElement("span");
      todoText.value = todoInput.vlaue;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.classList.add("todolist-delete-btn");

      removeBtn.addEventListener("click", (e) => {
        e.currentTarget.parentNode.parentNode.removeChild(
          e.currentTarget.parentNode
        );
      });

      checkBox.addEventListener("change", (e) => {
        if (checkBox.checked) {
          text.style.textDecorationLine = "line-through";
        } else {
          text.style.textDecorationLine = "none";
        }
      });

      item.appendChild(checkBox);
      item.appendChild(todoText);
      item.appendChild(removeBtn);

      todoList.appendChild(item);
      todoInput.value = "";
      hideInput();
    }
  });
});

// todolist-closed -> display: block
