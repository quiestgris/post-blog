if (document.querySelector(".user-post-container")) {
  console.log("here");
  document
    .querySelectorAll(".user-post-container .delete-btn")
    .forEach(function (e) {
      console.log("here");
      e.addEventListener("click", function () {
        e.parentElement.remove();
      });
    });
}
