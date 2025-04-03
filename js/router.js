export function router(event) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
  }
  
  async function handleLocation() {
    const pathName = window.location.pathname;
    console.log(pathName);
  }