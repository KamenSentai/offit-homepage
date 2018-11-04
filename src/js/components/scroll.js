import {titles} from './header'
import {topbar} from './topbar'

const height = topbar.offsetHeight

window.addEventListener('scroll', () => {
	titles.style.transform = `translate(-50%, calc(-50% - ${window.scrollY}px / 5))`

	if (window.scrollY > height) topbar.classList.remove('is-hidden')
	else topbar.classList.add('is-hidden')
})