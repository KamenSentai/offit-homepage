export const topbar       = document.querySelector('.topbar')
export const heightTopbar = topbar.offsetHeight

const buttons = Array.from(topbar.querySelectorAll('.topbar-button'))

for (const button of buttons) {
	const target = document.querySelector(`.${button.dataset.target}`)

	button.addEventListener('click', e => {
		e.preventDefault()
		window.scroll({
			top      : target.offsetTop - heightTopbar, 
			left     : 0, 
			behavior : 'smooth' 
		});
	})
}