let recentPostsDiv = document.querySelector(".recent-posts");

function renderRecentPosts(posts) {
    let recentPosts = [], lastPostIndex = posts.length - 1;

    recentPosts.push(posts[lastPostIndex]);
    recentPosts.push(posts[lastPostIndex - 1]);
    recentPosts.push(posts[lastPostIndex - 2]);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        for (let i = recentPosts.length - 1; i >= 0; i--) {
        let post = document.createElement("div");
        post.classList.add("recent-post")
        
        let postTitle = document.createElement("h1");
        postTitle.classList.add("post-title");
        postTitle.textContent = recentPosts[i].title;
        post.appendChild(postTitle)

        let author = document.createElement("p");
        let user = users.find(u => u.id === recentPosts[i].userId);
        author.textContent = `${user.name}`;
        author.classList.add("recent-post-author")
        post.appendChild(author)

        recentPostsDiv.appendChild(post);

    }  
    })


}



fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => renderRecentPosts(json))
