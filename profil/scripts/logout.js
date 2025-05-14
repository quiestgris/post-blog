document.querySelector(".logout-btn").addEventListener("click", function() {
    localStorage.removeItem("user");
    window.location.href = "../index.html";
})