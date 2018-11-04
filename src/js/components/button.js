const buttons = Array.from(document.querySelectorAll('.button'))

for (const button of buttons) {
	button.addEventListener('click', e => {
		e.preventDefault()
	})
}