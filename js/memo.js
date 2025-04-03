window.document.addEventListener("DOMContentLoaded", () => {
  const memoTitle = document.querySelector(".memo-title");
  const memoField = document.querySelector("#memo-text-box");

  memoTitle.addEventListener("click", () => {
    memoField.focus();
  });

  //   let count = 0;
  //   memoField.addEventListener("keydown", (e) => {
  //     count++;
  //     if (count > 1000) {
  //       alert("memo에는 1,000자 이상 입력할 수 없습니다. ");
  //     }
  //     //저장
  //   });
});
