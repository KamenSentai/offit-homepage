const carousel  = document.querySelector('.carousel')
const thumbnail = carousel.querySelector('.carousel-thumbnail')
const mask      = carousel.querySelector('.carousel-mask')

import {lazyloads} from './lazyload'
import {load}      from './lazyload'

let windowWidth = window.innerWidth
let offsetRight = windowWidth - thumbnail.offsetLeft - thumbnail.offsetWidth

const promise = new Promise(resolve => {
	thumbnail.style.transform = `translateX(${offsetRight}px)`
	resolve()
})

promise
	.then(() => {
		thumbnail.classList.add('is-active')
	})
	.then(load(lazyloads))

window.addEventListener('resize', () => {
	windowWidth = window.innerWidth
	offsetRight = windowWidth - thumbnail.offsetLeft - thumbnail.offsetWidth
	thumbnail.style.transform = `translateX(${offsetRight}px)`
	replaceThumbnail()
})

mask.addEventListener('contextmenu', e => {
	e.preventDefault()
})