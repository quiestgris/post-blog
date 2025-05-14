let postsSection = document.querySelector('.posts-section'),
    searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {

        postsSection.innerHTML = '';
        
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((response) => response.json())
            .then((posts) => {
                for (let i = 0; i < posts.length; i++){
                    if (posts[i].title.includes(searchBar.value)) {
                        
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