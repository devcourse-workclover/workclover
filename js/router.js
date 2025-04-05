import { viewDocument } from "./document.js";

export function router(event) {
  let target;
  if (typeof event === "object") {
    event.preventDefault();
    target = event.target.href;
  } else {
    target = `${window.location.origin}/workclover/${event}`;
  }
  window.history.pushState({}, "", target);
  handleLocation();
}

async function handleLocation() {
  const pathName = window.location.pathname.slice(1);
  viewDocument(pathName);

  window.addEventListener("popstate", handleLocation);
}
