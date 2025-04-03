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
  const todoList = document.querySelector(".todolist-list");
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

  const inputTodo = document.querySelector(".todolist-input-box");
  const checkTodo = document.querySelector(".checkbox-todolist");
  const todoInput = document.querySelector(".todolist-input");

  function hideInput() {
    inputTodo.style.display = "none";
    checkTodo.style.display = "none";
  }

  hideInput();
  // 추가 버튼 클릭 시 추가창 표시
  addTodo.addEventListener("click", () => {
    inputTodo.style.display = "block";
    checkTodo.style.display = "block";
  });
  // 엔터 입력 시 추가창 숨김

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const item = document.createElement("li");
      const checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.classList.add("todolist-icon");
      const todoText = document.createElement("span");
      todoText.textContent = todoInput.value;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.classList.add("todolist-delete-btn");
      // removeBtn.style.display = "inline-flex";
      const checkBoxDesign = document.createElement("span");
      checkBoxDesign.classList.add("todolist-circle-icon");
      removeBtn.addEventListener("click", (e) => {
        e.currentTarget.parentNode.parentNode.removeChild(
          e.currentTarget.parentNode
        );
      });
      checkBox.addEventListener("change", (e) => {
        if (checkBox.checked) {
          todoText.style.textDecorationLine = "line-through";
        } else {
          todoText.style.textDecorationLine = "none";
        }
        setBadgenumber();
      });
      item.appendChild(checkBox);
      item.appendChild(todoText);
      item.appendChild(removeBtn);
      todoList.appendChild(item);
      todoInput.value = "";
      hideInput();
      setBadgenumber();
    }
  });

  todoInput.addEventListener("change", updateValue);

  function updateValue(e) {
    e.preventDefault();
    const item = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("todolist-icon");

    const todoText = document.createElement("span");
    todoText.textContent = todoInput.value;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.classList.add("todolist-delete-btn");

    const checkBoxDesign = document.createElement("span");
    checkBoxDesign.classList.add("todolist-circle-icon");

    removeBtn.addEventListener("click", (e) => {
      e.currentTarget.parentNode.parentNode.removeChild(
        e.currentTarget.parentNode
      );
      setBadgenumber();
    });

    checkBox.addEventListener("change", (e) => {
      if (checkBox.checked) {
        todoText.style.textDecorationLine = "line-through";
      } else {
        todoText.style.textDecorationLine = "none";
      }
      setBadgenumber();
    });
    item.appendChild(checkBox);
    item.appendChild(todoText);
    item.appendChild(removeBtn);
    item.appendChild(checkBoxDesign);
    item.addEventListener("mouseover", (e) => {
      removeBtn.style.display = "inline-block";
    });

    item.addEventListener("mouseleave", (e) => {
      removeBtn.style.display = "none";
    });

    todoList.appendChild(item);
    todoInput.value = "";
    hideInput();
    setBadgenumber();
  }

  function setBadgenumber() {
    const todolistItems = todoList.querySelectorAll(".todolist-icon");

    let count = 0;

    todolistItems.forEach((item) => {
      if (!item.checked) {
        count++;
      }
    });
    badge.textContent = count;
  }
});
