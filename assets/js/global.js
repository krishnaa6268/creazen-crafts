console.log("Hello Creazen Crafts...");
// -----------------Loader---------------------
// loader script
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-box");

  loader.classList.add("loader-box-hidden");

  loader.addEventListener("transitionend", () => {
      document.body.removeChild(".loader-box")
  })
})
