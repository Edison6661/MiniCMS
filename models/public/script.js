const API = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

async function loadPosts() {
  const res = await fetch(`${API}/posts`);
  const posts = await res.json();
  const container = document.getElementById('posts');
  container.innerHTML = posts.map(p => `
    <div class="post">
      <h3>${p.title}</h3>
      <p>${p.content}</p>
      ${p.media ? `<img src="/uploads/${p.media}" width="200"/>` : ''}
    </div>
  `).join('');
}