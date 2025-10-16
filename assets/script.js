
// Theme toggle (shared across pages)
const themeBtnElems = document.querySelectorAll('#themeToggle, .theme-toggle');
function setTheme(theme){
  if(theme === 'light'){ document.documentElement.classList.add('light'); localStorage.setItem('theme','light'); updateThemeIcons('light'); }
  else { document.documentElement.classList.remove('light'); localStorage.setItem('theme','dark'); updateThemeIcons('dark'); }
}
function updateThemeIcons(theme){
  themeBtnElems.forEach(btn => { btn.textContent = theme === 'light' ? '☾' : '☼' });
}
const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);
themeBtnElems.forEach(b => b.addEventListener && b.addEventListener('click', ()=> setTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light')));

// Search + Genre filter for home page
const searchInput = document.getElementById('searchInput');
const genreButtons = document.querySelectorAll('.genre-btn');
function filterGrid(){
  const q = searchInput ? searchInput.value.toLowerCase() : '';
  const activeGenre = document.querySelector('.genre-btn.active') ? document.querySelector('.genre-btn.active').getAttribute('data-genre') : 'All';
  document.querySelectorAll('.comic-card').forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    const genres = card.getAttribute('data-genres').toLowerCase().split(',').map(s=>s.trim());
    const matchesSearch = title.includes(q);
    const matchesGenre = (activeGenre === 'All') || genres.includes(activeGenre.toLowerCase());
    card.style.display = (matchesSearch && matchesGenre) ? '' : 'none';
  });
}
if(searchInput){
  searchInput.addEventListener('input', filterGrid);
}
// Genre buttons click
genreButtons.forEach(btn => {
  btn.addEventListener('click', ()=>{
    genreButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    filterGrid();
  });
});

// Back buttons for reader
document.querySelectorAll('.backHome').forEach(b => b.addEventListener('click', ()=> location.href='home.html'));

// Next/Prev handling in reader pages
document.addEventListener('click', e => {
  if(e.target && e.target.id === 'nextChapter') { alert('Tidak ada chapter berikutnya.') }
  if(e.target && e.target.id === 'prevChapter') { alert('Tidak ada chapter sebelumnya.') }
});
