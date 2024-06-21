const body = document.querySelector('body')
const time = 10000
const step = 1
let targetValue = 40
let hasTriggered = false // Флаг, чтобы предотвратить повторный вызов
function outNum(num, elem) {
	let e = document.querySelector(elem)
	let n = 0
	let intervalDelay = 70 // Начальная задержка в 10 мс
	let interval = setInterval(() => {
		const remainingDistance = num - n
		const speedMultiplier = 1 + Math.max(0, (num - n - 10) / 10) // Меньше отбросов к концу
		intervalDelay = Math.round(time / (num / (step * speedMultiplier)))

		n += step * speedMultiplier

		if (n >= num) {
			n = num
			clearInterval(interval)
		}

		e.innerHTML = Math.floor(n)
	}, intervalDelay)
}
window.addEventListener('scroll', () => {
	if (window.scrollY >= 500 && !hasTriggered) {
		targetValue = 40
		outNum(targetValue, '.counter')
		hasTriggered = true // Установить флаг в true, чтобы предотвратить повторный вызов
	} else if (window.scrollY < 300) {
		targetValue = 0
		outNum(targetValue, '.counter')
		hasTriggered = false // Сбросить флаг, чтобы счетчик мог сработать снова
	}
})
const header = document.querySelector('.header_wrapper')
if (header) {
	window.onscroll = function (e) {
		if (window.scrollY > 500) {
			header.classList.add('header_wrapper-active')
		} else {
			header.classList.remove('header_wrapper-active')
		}
	}
}

//gallery

const galleryImages = document.querySelectorAll('.gallery-image-item')
const popup = document.querySelector('.pop-up')
const popupImage = document.querySelector('.gallery-popup-image')
const popupClose = document.querySelector('.popup-close')
if (galleryImages) {
	popupClose.addEventListener('click', () => {
		popup.classList.remove('popup_active')
		body.style.overflow = 'auto'
	})
	galleryImages.forEach(image => {
		image.addEventListener('click', () => {
			body.style.overflow = 'hidden'
			popup.classList.add('popup_active')
			let currentPath = String(image.src)
			let fullUrl = currentPath.split('?')[0]
			let imagePath = fullUrl.split('http://localhost:4000')[1]
			setTimeout(() => {
				popupImage.classList.add('gallery-popup-image-active')
			}, 100)
			popupImage.src = imagePath
		})
	})
}
