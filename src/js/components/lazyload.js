export const lazyloads = document.querySelectorAll('.lazyload')

export const load = (lazyloadsElements) => {
	for (const lazyload of lazyloadsElements) {
		const img    = lazyload.querySelector('img')
		const newImg = document.createElement('img')
		
		newImg.addEventListener('load', () => {
			lazyload.classList.add('loaded')
		})
		
		newImg.src = img.src
	}
}