
const postList = document.getElementById('post-list');

eventListener();

function eventListener() {

    document.querySelector('#form').addEventListener('submit', newpost);

    postList.addEventListener('click', removepost);

    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// New post
function newpost(e) {
    // prevent default
    e.preventDefault();

    // read textare value
    const post = document.getElementById('post').value;

    //create element remove btn
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'removeBtn';
    removeBtn.textContent = 'X';


    //create element li
    const li = document.createElement('li')
    li.textContent = post;

    // Add btn
    li.appendChild(removeBtn);
    // Append li
    postList.appendChild(li);

    addpost(post);


    this.reset();
}

// Remove post
function removepost(e) {
    if (e.target.classList.contains('removeBtn')) {
        e.target.parentElement.remove();
    }
    // Remove from local storage


    RemoveFromLocalStorage(e.target.parentElement.textContent);

}

// Add post
function addpost(post) {
    let posts = getposts();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

}

//Get posts

function getposts() {
    let posts;
    const postsLS = localStorage.getItem('posts');
    if (postsLS === null) {
        posts = [];
    }
    else {
        posts = JSON.parse(postsLS)
    }
    return posts;
}

//Local storage on load
function localStorageOnLoad() {
    let posts = getposts();
    posts.forEach((post) => {
        //create element remove btn
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'removeBtn';
        removeBtn.textContent = 'X';


        //create element li
        const li = document.createElement('li')
        li.textContent = post;

        // Add btn
        li.appendChild(removeBtn);
        // Append li
        postList.appendChild(li);

    });
}

function RemoveFromLocalStorage(post) {
    let posts = getposts();

    const postDelete = post.substring(0, post.length - 1);

    posts.forEach(
        (postsLS, index) => {
            if (postDelete === postsLS) {
                posts.splice(index, 1);

            }
        });

    // Save the data 
    localStorage.setItem('posts', JSON.stringify(posts));
}