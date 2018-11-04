const topbar = document.querySelector('.topbar')
const height = topbar.offsetHeight

window.addEventListener('scroll', () => {
	if (window.scrollY > height) topbar.classList.remove('is-hidden')
	else topbar.classList.add('is-hidden')
})