import { getDocument } from "../apis/getDocuments.js";

export async function viewDocument(id) {
  const main = document.querySelector(".document");
  main.innerHTML = "";
  const data = await getDocument(id);
  const title = createEditable("title", data);
  const content = createEditable("content", data);

  main.append(title);
  main.append(content);
}

function createEditable(cls, data) {
  const div = document.createElement("div");
  div.contentEditable = true;
  div.textContent = data[cls];
  div.classList.add(`document-${cls}`);
  return div;
}
