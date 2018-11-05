const carousel  = document.querySelector('.carousel')
const group   = carousel.querySelector('.carousel-group')
const quote     = group.querySelector('.carousel-quote')
const label     = group.querySelector('.carousel-label')
const thumbnail = carousel.querySelector('.carousel-thumbnail')
const mask      = carousel.querySelector('.carousel-mask')

import {lazyloads} from './lazyload'
import {load}      from './lazyload'

const delay    = 10000
const duration = 1500

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

fetch('data/quotes.json')
	.then(response => response.json())
	.then(json => {
		let step = 0

		window.setInterval(() => {
			step = (step + 1) % json.quotes.length
			const img = thumbnail.querySelector('img')
			promise
				.then(() => {
					quote.style.opacity = '0'
					label.style.opacity = '0'
					img.style.opacity   = '0'
				})
				.then(() => {
					setTimeout(() => {
						quote.textContent = json.quotes[step].quote
						label.textContent = json.quotes[step].label
						img.src = `images/${json.quotes[step].image}`
					}, duration)
				})
				.then(() => {
					setTimeout(() => {
						quote.style.opacity = '1'
						label.style.opacity = '1'
						img.style.opacity   = '1'
					}, duration)
				})
		}, delay)
	})