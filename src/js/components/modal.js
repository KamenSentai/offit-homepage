const modal  = document.querySelector('.modal')
const tabs   = Array.from(modal.querySelectorAll('.modal-tab'))
const blocks = Array.from(modal.querySelectorAll('.modal-block'))

for (const tab of tabs) {
	tab.addEventListener('click', e => {
		e.preventDefault()

		const activeTab      = tabs.find(e => e.classList.contains('is-active'))
		const activeBlock  = blocks.find(e => e.classList.contains('is-active'))
		const clickedBlock = blocks.find(e => e.dataset.tab == tab.dataset.tab)

		activeTab.classList.remove('is-active')
		activeBlock.classList.remove('is-active')
		tab.classList.add('is-active')
		clickedBlock.classList.add('is-active')
	})
}