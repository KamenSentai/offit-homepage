export const wysiwyg = document.querySelector('.wysiwyg')

const content  = wysiwyg.querySelector('.wysiwyg-content')
const buttons  = Array.from(wysiwyg.querySelectorAll('.wysiwyg-button'))
const articles = Array.from(wysiwyg.querySelectorAll('.wysiwyg-article'))
const width    = content.offsetWidth

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