const carousel  = document.querySelector('.carousel')
const thumbnail = carousel.querySelector('.carousel-thumbnail')
const mask      = carousel.querySelector('.carousel-mask')

let windowWidth   = window.innerWidth
const offsetRight = windowWidth - thumbnail.offsetLeft - thumbnail.offsetWidth

const replaceThumbnail = () => {
	thumbnail.style.transform = `translateX(${offsetRight}px)`
}
replaceThumbnail()

window.addEventListener('resize', () => {
	windowWidth = window.innerWidth
	replaceThumbnail()
})

mask.addEventListener('contextmenu', e => {
	e.preventDefault()
})