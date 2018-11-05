export const wysiwyg = document.querySelector('.wysiwyg')

const content  = wysiwyg.querySelector('.wysiwyg-content')
const buttons  = Array.from(wysiwyg.querySelectorAll('.wysiwyg-button'))
const articles = Array.from(wysiwyg.querySelectorAll('.wysiwyg-article'))

let width = content.offsetWidth

import {shapes} from './shape'

window.addEventListener('resize', () => {
	width = content.offsetWidth
	const activeButton = buttons.find(e => e.classList.contains('is-active'))
	content.style.transform = `translateX(-${width * buttons.indexOf(activeButton)}px)`
})

for (const button of buttons) {
	button.addEventListener('click', () => {
		const activeArticle = articles.find(e => e.classList.contains('is-active'))
		const activeButton  = buttons.find(e => e.classList.contains('is-active'))
		const article = articles.find(e => e.dataset.article == button.getAttribute('title'))

		activeButton.classList.remove('is-active')
		activeArticle.classList.remove('is-active')
		button.classList.add('is-active')
		article.classList.add('is-active')

		content.style.transform = `translateX(-${width * buttons.indexOf(button)}px)`
	})
}

for (const shape of shapes) {
	if (shape.classList.contains('shape--article')) {
		shape.addEventListener('click', () => {
			const button = buttons.find(e => e.getAttribute('title') == shape.dataset.article)
			button.click()
		})
	}
}