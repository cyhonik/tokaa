document.addEventListener("click", () => {
  const url = `${location.origin}/${nextPage}`;
  location.replace(url);
}, false);
