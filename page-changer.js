document.addEventListener("click", () => {
  if (nextPage !== undefined) {
    const url = `${location.origin}/tokaa/${nextPage}`;
    location.replace(url);
  }
}, false);
