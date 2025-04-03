const todolistBox = document.getElementsByClassName("todolist-box");
// 투두리스트 추가되는 박스
const addBtn = document.getElementsByClassName("todolist-add-btn");
// 투두리스트 추가 버튼
const todoInput = document.getElementsByClassName("todolist-input");
// 투두리스트 이름 인풋

let tasks = [];

function addTask() {
  const todoTitle = todoInput.value.trim();

  const newTodo = {
    id: Date.now(),
    text: todoTitle,
    completed: false,
  };

  tasks.push(newTodo)
  renderList();
  todoTitle.value = ""; // 입력 필드 초기화
}
