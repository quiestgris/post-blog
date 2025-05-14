// mobile menu to move

let mobileMenuClicked;

function moveMobileMenu() {
    if (!mobileMenuClicked) {
        let widthOfMenu = document.querySelector('.mobile-menu').offsetWidth + 'px';
        document.querySelector('.mobile-menu').style.left = `calc(100% - ${widthOfMenu})`;
        mobileMenuClicked = true;
    }
    else {
        document.querySelector('.mobile-menu').style.left = "100%";
        mobileMenuClicked = false;
    }
}


document.querySelector('.burger-menu').addEventListener('click', function () {
    document.querySelector('.bg-gray').classList.toggle('hide');
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.bg-gray').onclick = function () {
        document.querySelector('.bg-gray').classList.toggle('hide');
        document.querySelector('body').style.overflow = 'initial';
        requestAnimationFrame(moveMobileMenu);
    }
    requestAnimationFrame(moveMobileMenu)
})

// changement de boutons si l'utilisateur s'est connecté

if(localStorage.getItem("user")) {
    let messageButton = document.createElement("a"), 
        profilButton = document.createElement("a"),
        signUpButton = document.querySelector(".mobile-sign-up-btn"),
        signInButton = document.querySelector(".mobile-sign-in-btn");

    signInButton.remove();
    signUpButton.remove();

    messageButton.classList.add("nav-mobile-menu-item");
    messageButton.textContent = "Messages";

    profilButton.classList.add("nav-mobile-menu-item");
    if(location.href.includes("profil/index.html")) {
        profilButton.setAttribute("href","index.html");
    }
    else {
        console.log("ici")
        profilButton.setAttribute("href","profil/index.html");
    }
    profilButton.textContent = "Profil";

    document.querySelector(".mobile-menu nav").appendChild(messageButton);
    document.querySelector(".mobile-menu nav").appendChild(profilButton);
}