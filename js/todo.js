document.addEventListener("DOMContentLoaded", () => {
  const todolistBox = document.getElementsByClassName("todolist-box");
  // 투두리스트 추가되는 박스
  const addBtn = document.getElementsByClassName("todolist-add-btn");
  // 투두리스트 추가 버튼

  const todoInput = document.getElementsByClassName("todolist-input");
  // 투두리스트 이름 인풋

  let tasks = [];

  function makeTodoArea() {
    const todoList = document.createElement("ul");
    todoList.classList.add("todocArea");
    // 투두리스트 항목 박스에리어
  }

  function addTask() {
    const todoTitle = todoInput.value.trim();

    // if(todoTitle === ""){

    // }

    const newTodo = {
      id: Date.now(),
      text: todoTitle,
      completed: false,
    };

    tasks.push(newTodo); // 배열에 항목 추가
    renderList();
    todoTitle.value = ""; // 입력 필드 초기화
  }

  function renderList() {
    todoList.innerHTML = "";
    tasks.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = `${todo.text}`;
      li.dataset.id = todo.id;

      todoList.appendChild(li);

      if (todo.completed) {
        li.classList.add("completed");
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "x";
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.appendChild(deleteBtn);
    });
  }

  function deleteTodo(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderList();
  }

  addBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("엔터키 입력");
    }
  });
  renderList();
});
