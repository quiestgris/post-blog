let posts;

function run() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => addPosts(json));
}

let postsSection = document.querySelector(".posts-section");

function addPosts(data) {
  let post, postTitle, postBody, author, users, user, postId;
  if (nextPageClicked) {
    let postsToRemove = document.querySelectorAll(".post");
    console.log(postsToRemove);
    postsToRemove.forEach((e) => e.remove());
    nextPageClicked = false;
  }
  fetch(`https://jsonplaceholder.typicode.com/users/`)
    .then((response) => response.json())
    .then((json) => {
      users = json;

      postsSection.innerHTML = "";

      if (paginationThirthButton.textContent == "11") {
        paginationThirthButton.classList.add("hide");
        nextPageButton.classList.add("hide");
      } else {
        paginationThirthButton.classList.remove("hide");
        nextPageButton.classList.remove("hide");
      }

      postCounter = counter * 10;

      for (let i = postCounter - 10; i < postCounter; i++) {
        console.log(data[postCounter - 1].id);
        post = document.createElement("div");
        post.classList.add("post");

        postId = document.createElement("p");
        postId.textContent = data[i].id;
        postId.classList.add("hide");
        postId.classList.add("post-id");

        author = document.createElement("p");
        user = users.find((u) => u.id === data[i].userId);
        author.textContent = `${user.name}`;
        author.classList.add("post-author");

        postTitle = document.createElement("h1");
        postTitle.textContent = data[i].title;
        postTitle.classList.add("post-title");

        postBody = document.createElement("p");
        postBody.textContent = data[i].body;
        postBody.classList.add("post-body");

        post.appendChild(postTitle);
        post.appendChild(author);
        post.appendChild(postBody);
        post.appendChild(postId);

        postsSection.appendChild(post);
      }
      if (localStorage.getItem("userPosts")) {
        let userPosts = localStorage.getItem("userPosts");
        addUserPosts(userPosts);
      }
      
    });
}

// pagination

let pageButtons = document.querySelectorAll(".page-number-btn"),
  nextPageButton = document.querySelector(".next-page");
previousPageButton = document.querySelector(".previous-page");
let firstPageButtonBgRed;

let paginationFirstButton = document.querySelector(".pagination-first-btn"),
  paginationSecondButton = document.querySelector(".pagination-second-btn"),
  paginationThirthButton = document.querySelector(".pagination-thirth-btn");

let counter = 1,
  nextPageClicked = false,
  numberOfThePage = 1,
  buttonOrder = 1;

// boutons de pagination

pageButtons.forEach((e) =>
  e.addEventListener("click", function () {
    if (e.classList.contains("pagination-thirth-btn")) {
      e.textContent = parseInt(e.textContent) + 1;
      paginationFirstButton.textContent =
        parseInt(paginationFirstButton.textContent) + 1;
      paginationFirstButton.classList.remove("bg-red");

      paginationSecondButton.textContent =
        parseInt(paginationSecondButton.textContent) + 1;
      paginationSecondButton.classList.add("bg-red");

      counter = e.textContent;
      if (counter > 2) previousPageButton.classList.remove("hide");
      run();
      return undefined;
    }

    if (e.textContent != counter && e == paginationSecondButton) {
      console.log("worked");
      e.classList.add("bg-red");
      paginationFirstButton.classList.remove("bg-red");
      buttonOrder++;
      counter = e.textContent;
      if (counter > 2) previousPageButton.classList.remove("hide");

      run();
    } else if (e.textContent != counter && e == paginationFirstButton) {
      e.classList.add("bg-red");
      paginationSecondButton.classList.remove("bg-red");
      buttonOrder--;
      counter = e.textContent;

      if (counter > 2) previousPageButton.classList.remove("hide");

      run();
    }
    // window.scrollTo(0,0);
  })
);

// bouton Suivant

nextPageButton.addEventListener("click", function () {
  if (buttonOrder > 1) {
    if (counter > 1) {
      previousPageButton.classList.remove("hide");
    }
    paginationThirthButton.textContent =
      parseInt(paginationThirthButton.textContent) + 1;
    paginationFirstButton.textContent =
      parseInt(paginationFirstButton.textContent) + 1;
    paginationFirstButton.classList.remove("bg-red");

    paginationSecondButton.textContent =
      parseInt(paginationSecondButton.textContent) + 1;
    paginationSecondButton.classList.add("bg-red");

    counter = paginationSecondButton.textContent;
    run();
    return undefined;
  }

  paginationSecondButton.classList.add("bg-red");
  paginationFirstButton.classList.remove("bg-red");
  buttonOrder++;
  counter++;
  run();
});

// bouton Précédent

previousPageButton.addEventListener("click", function (e) {
  if (counter < 3) {
    previousPageButton.classList.add("hide");
  }
  if (buttonOrder > 1) {
    // paginationThirthButton.textContent = parseInt(paginationThirthButton.textContent) - 1;
    // paginationFirstButton.textContent = parseInt(paginationFirstButton.textContent) - 1;
    paginationFirstButton.classList.add("bg-red");
    console.log("worked");

    // paginationSecondButton.textContent = parseInt(paginationSecondButton.textContent) - 1;
    paginationSecondButton.classList.remove("bg-red");

    counter = paginationFirstButton.textContent;
    run();
    buttonOrder--;
    return undefined;
  }

  paginationThirthButton.textContent =
    parseInt(paginationThirthButton.textContent) - 1;
  paginationFirstButton.textContent =
    parseInt(paginationFirstButton.textContent) - 1;
  paginationFirstButton.classList.add("bg-red");

  paginationSecondButton.textContent =
    parseInt(paginationSecondButton.textContent) - 1;
  paginationSecondButton.classList.remove("bg-red");

  paginationFirstButton.classList.add("bg-red");
  counter--;

  run();
});

// ajout d'un poste

function addUserPosts(data) {
  let userPosts = JSON.parse(data).posts;

  for (let i = 0; i < userPosts.length; i++) {
    let post,
      postTitle,
      postBody,
      author,
      deleteButton,
      userPostContainer,
      postId,
      changeOfThePostId;
    post = document.createElement("div");
    post.classList.add("post");

    postId = document.createElement("p");
    postId.textContent = localStorage.getItem("postIdToAdd");

    changeOfThePostId = parseInt(postId.textContent);
    changeOfThePostId++;

    postId.classList.add("hide");
    postId.classList.add("post-id");
    localStorage.setItem("postIdToAdd", changeOfThePostId);

    userPostContainer = document.createElement("div");
    userPostContainer.classList.add("user-post-container");

    deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Supprimer";
    

    author = document.createElement("p");
    authorName = JSON.parse(localStorage.getItem("user")).name;
    author.textContent = authorName;
    author.classList.add("post-author");

    postTitle = document.createElement("h1");
    postTitle.textContent = userPosts[i].title;
    postTitle.classList.add("post-title");

    postBody = document.createElement("p");
    postBody.textContent = userPosts[i].body;
    postBody.classList.add("post-body");

    post.appendChild(postTitle);
    post.appendChild(author);
    post.appendChild(postBody);
    post.appendChild(postId);

    userPostContainer.append(post);
    userPostContainer.appendChild(deleteButton);
    
    postsSection.prepend(userPostContainer);

    deleteButton.addEventListener("click", function (e) {
      userPostContainer.remove();
    });
  }
}

// Changement de boutons et ajout de fonctionnalité d'ajouter un post si l'utilisateur s'est connecté

let signInButton = document.querySelector(".sign-in-btn"),
  signUpButton = document.querySelector(".sign-up-btn"),
  navButtons = document.querySelector(".sign-in-sign-up"),
  footerSignUpButton = document.querySelector(".footer-sign-up-btn");

// Création de stockage de posts d'utilisateur

if (localStorage.getItem("user")) {
  // changement de boutons
  signInButton.remove();
  signUpButton.remove();

  let messagesButton = document.createElement("a");
  messagesButton.classList.add("primary-button");
  messagesButton.textContent = "Messages";
  navButtons.appendChild(messagesButton);

  let profilButton = document.createElement("a");
  profilButton.classList.add("primary-button");
  profilButton.textContent = "Profil";
  profilButton.setAttribute("href", "profil/index.html");
  navButtons.appendChild(profilButton);

  profilButton = document.createElement("a");
  let textOfTheButton = document.createElement("h2");
  textOfTheButton.textContent = "Profil";
  profilButton.appendChild(textOfTheButton);
  profilButton.setAttribute("href", "profil/index.html");
  footerSignUpButton.replaceWith(profilButton);

  // création de formulaire d'ajout d'un post

  let addPostForm = document.createElement("form"),
    addPostFormContainer = document.querySelector(".add-post-form-container");

  addPostFormContainer.innerHTML = `<form action="" method="" class="add-post-form">
                    <label for="title">Titre de post</label>
                    <input class="post-title-input" type="text" name="title" id="title">
                    <label for="post-text-input">Texte de post</label>
                    <textarea class="post-text-input" name="post-text" id="post-text" rows="10"></textarea>
                    <div class="center"><input type="submit" value="Ajouter" class="primary-button add-post-btn"></div>
                </form>`;
  document
    .querySelector(".add-post-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let postTitle = document.querySelector(".post-title-input"),
        postBody = document.querySelector(".post-text-input");

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: postTitle.value,
          body: postBody.value,
          userId: localStorage.getItem("user").id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!localStorage.getItem("userPosts")) {
            let userPosts = {
              posts: [],
            };
            userPosts.posts.push(data);
            let userPostsLength = userPosts.posts.length - 1;
            userPosts.posts[userPostsLength].postId = userPosts =
              JSON.stringify(userPosts); // ajout d'un post au localStorage
            localStorage.setItem("userPosts", userPosts);
            addUserPosts(localStorage.getItem("userPosts"));
          } else {
            let userPosts = JSON.parse(localStorage.getItem("userPosts"));

            userPosts.posts.push(data);
            userPosts = JSON.stringify(userPosts);
            localStorage.setItem("userPosts", userPosts);
            addUserPosts(localStorage.getItem("userPosts"));
          }
        });
    });
  // verification d'existance de posts d'utilisateur
}

// fonctionalité d'enlever un post

fetch(`https://jsonplaceholder.typicode.com/posts/`)
  .then((response) => response.json())
  .then((json) => {
    localStorage.setItem("postIdToAdd", json.length + 1);
  });

run();


