const modal    = document.querySelector('.modal')
const tabs     = Array.from(modal.querySelectorAll('.modal-tab'))
const displays = Array.from(modal.querySelectorAll('.modal-display'))

for (const tab of tabs) {
	tab.addEventListener('click', e => {
		e.preventDefault()

		const activeTab      = tabs.find(e => e.classList.contains('is-active'))
		const activeDisplay  = displays.find(e => e.classList.contains('is-active'))
		const clickedDisplay = displays.find(e => e.dataset.tab == tab.dataset.tab)

		activeTab.classList.remove('is-active')
		activeDisplay.classList.remove('is-active')
		tab.classList.add('is-active')
		clickedDisplay.classList.add('is-active')
	})
}