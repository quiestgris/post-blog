
let searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {

    if (window.location.href.includes("/profil") || window.location.href.includes("/login"))
      window.location.href = "../index.html";

    postsSection = document.querySelector('.posts-section');
    postsSection.innerHTML = '';

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        let post, postTitle, postBody, author, users, user, postId;
        
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].title.includes(searchBar.value) || posts[i].body.includes(searchBar.value)) {
            fetch(`https://jsonplaceholder.typicode.com/users/`) // pour trouver l'auteur
              .then((response) => response.json())
              .then((json) => {

                users = json;

                post = document.createElement("div");
                post.classList.add("post");

                postId = document.createElement("p");
                postId.textContent = posts[i].id;
                postId.classList.add("hide");
                postId.classList.add("post-id");

                author = document.createElement("p");
                user = users.find((u) => u.id === posts[i].userId);
                author.textContent = `${user.name}`;
                author.classList.add("post-author");

                postTitle = document.createElement("h1");
                postTitle.textContent = posts[i].title;
                postTitle.classList.add("post-title");

                postBody = document.createElement("p");
                postBody.textContent = posts[i].body;
                postBody.classList.add("post-body");

                post.appendChild(postTitle);
                post.appendChild(author);
                post.appendChild(postBody);
                post.appendChild(postId);

                postsSection.appendChild(post);
              })
          }
        }
      });
  }
})

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {

  }
  );