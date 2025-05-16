let greetings = document.querySelector('.greetings')
let personalInfo = document.querySelector('.personal-info ul');

let user = JSON.parse(localStorage.getItem('user'));

let userInfo = [];

greetings.textContent = greetings.textContent + ' ' + user.name;


userInfo = document.createElement("li");
userInfo.textContent = "Name : " + user.name;
personalInfo.appendChild(userInfo);

userInfo = document.createElement("li");
userInfo.textContent = "Email : " + user.email;
personalInfo.appendChild(userInfo);

userInfo = document.createElement("li");
userInfo.textContent = "Téléphone : " + user.phone;
personalInfo.appendChild(userInfo);

userInfo = document.createElement("li");
let list = document.createElement("ul");

userInfo.textContent = "Addresse : ";
personalInfo.appendChild(userInfo);

for(let key in user.address) {
    if (typeof user.address[key] == "object") {
        userInfo = document.createElement("li");
        userInfo.textContent = key + " : ";
        list.appendChild(userInfo);

        let ul = document.createElement("ul");

        for(let otherKey in user.address[key]) {
            userInfo = document.createElement("li");
            userInfo.textContent = otherKey + " : " + user.address[key][otherKey];
            ul.appendChild(userInfo);
        }
        
        list.appendChild(ul);
    }
    else {
    userInfo = document.createElement("li");
    userInfo.textContent = key + " : " + user.address[key];
    list.appendChild(userInfo);
    }
}
personalInfo.appendChild(list)




document.querySelector(".arrow-to-show-info")
    .addEventListener('click', function () {
        document.querySelector('.personal-info').classList.toggle('hide');
        document.querySelector('.arrow-to-show-info').classList.toggle('rotate-180-deg')
    })


function renderPosts(posts) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].userId == user.id) {
            
            let post = document.createElement("div");
                post.classList.add("post"); 

                let postTitle = document.createElement("h1");
                postTitle.textContent = posts[i].title;
                postTitle.classList.add("post-title")
        
                let postBody = document.createElement("p");
                postBody.textContent = posts[i].body;
                postBody.classList.add("post-body")
                
                post.appendChild(postTitle);
                post.appendChild(postBody);
        
                let postsSection = document.querySelector('.user-posts')
                postsSection.appendChild(post);
        }
    }
    addUserPosts(localStorage.getItem('userPosts'));
}




fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
    .then(response => response.json())
    .then(json => {
        renderPosts(json);
        console.log(j);
    })


// Changement de boutons si l'utilisateur est connecté 

let signInButton = document.querySelector(".sign-in-btn"),
    signUpButton = document.querySelector(".sign-up-btn"),
    navButtons = document.querySelector(".sign-in-sign-up"),
    footerSignUpButton = document.querySelector(".footer-sign-up-btn")

if (localStorage.getItem("user")) {
    signInButton.remove();
    signUpButton.remove();
    
    let messagesButton = document.createElement("a");
    messagesButton.classList.add("primary-button");
    messagesButton.textContent = "Messages"
    navButtons.appendChild(messagesButton)


    let profilButton = document.createElement("a");
    profilButton.classList.add("primary-button");
    profilButton.textContent = "Profil";
    profilButton.setAttribute("href","index.html")
    navButtons.appendChild(profilButton);

    profilButton = document.createElement("a");
    let textOfTheButton = document.createElement("h2")
    textOfTheButton.textContent = "Profil";
    profilButton.appendChild(textOfTheButton);
    profilButton.setAttribute("href","../index.html")
    footerSignUpButton.replaceWith(profilButton);
}

function addUserPosts(data) {
    let userPosts = JSON.parse(data).posts;
    let postsSection = document.querySelector(".user-posts");

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