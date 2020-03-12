const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
          ${post.body}
        </p>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Show loader & fetch more posts
async function showLoading() {
  loader.classList.add('show');

  page += 1;
  await showPosts();

  loader.classList.remove('show');
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post').forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    const matches = title.indexOf(term) >= 0 || body.indexOf(term) >= 0;
    post.style.display = matches ? 'flex' : 'none';
  });
}

// Show initial posts
showPosts();

// Event listeners
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
