import {titles}       from './header'
import {topbar}       from './topbar'
import {heightTopbar} from './topbar'
import {post}         from './post'
import {shapes}       from './shape'
import {wysiwyg}      from './wysiwyg'

let windowHeight = window.innerHeight

window.addEventListener('resize', () => {
	windowHeight = window.innerHeight
})

window.addEventListener('scroll', () => {
	titles.style.transform = `translate(-50%, calc(-50% - ${window.scrollY}px / 5))`

	if (window.scrollY > heightTopbar) {
		topbar.classList.remove('is-hidden')
	} else {
		topbar.classList.add('is-hidden')
	}

	const wysiwygTop = wysiwyg.getBoundingClientRect().top
	const postTop    = post.getBoundingClientRect().top

	for (const shape of shapes) {
		if (shape.classList.contains('shape--article')) {
			if (wysiwygTop - heightTopbar < 0 && postTop - windowHeight / 2 > 0) {
				shape.classList.add('is-active')
			} else {
				shape.classList.remove('is-active')
			}
		}
	}
})