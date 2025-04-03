export function viewDocument(documentInfo) {
  const main = document.querySelector(".document");
  main.innerHTML = "";

  const title = createEditable("title");
  const content = createEditable("content");
  main.append(title);
  main.append(content);
}

function createEditable(cls) {
  const div = document.createElement("div");
  div.contentEditable = true;
  div.textContent = documentInfo.div;
  div.classList.add(cls);
  return div;
}
