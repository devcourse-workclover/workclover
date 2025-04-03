import { getDocument } from "../apis/getDocuments.js";
import { updateDocument } from "../apis/updateDocument.js";
import { viewPageList } from "./pageManager.js";

export async function viewDocument(id) {
  const main = document.querySelector(".document");
  main.innerHTML = "";
  const data = await getDocument(id);
  const title = createEditable("title", data);
  const content = createEditable("content", data);

  main.append(title);
  main.append(content);

  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") title.blur();
  });

  title.addEventListener("blur", async (e) => {
    await updateDocument(id, title.textContent);
    viewPageList();
  });

  // content.addEventListener(
  //   "input",
  //   debounce(updateDocument(id, null, data.content), 5000)
  // );
}

function createEditable(cls, data) {
  const div = document.createElement("div");
  div.contentEditable = true;
  div.textContent = data[cls];
  div.classList.add(`document-${cls}`);
  return div;
}

// function debounce(callback, delay) {
//   let timer;
//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       console.log(callback);
//     }, delay);
//   };
// }
