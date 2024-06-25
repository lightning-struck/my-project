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
		if (e) {
			e.innerHTML = Math.floor(n)
		}
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
const popupImage = document.querySelector('.popup-img')
const popupClose = document.querySelector('.popup-close')
if (popup) {
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
				popupImage.classList.add('popup-img-active')
			}, 100)
			popupImage.src = imagePath
		})
	})
}
const EMAIL_REGEXP =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
function isEmailValid(value) {
	return EMAIL_REGEXP.test(value)
}

//mail input
const email = document.querySelector('.contact_input')
const email_btn = document.querySelector('.contact_btn')
const email_error = document.querySelector('.email_error')
const spinner = document.querySelector('.spinner-loader')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal_layout-content')
const modalCloseBtns = document.querySelectorAll('.modal_close-btn')
if (email && email_btn && email_error) {
	const isEmailValid = value => {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
	}

	const validateEmail = value => {
		if (!isEmailValid(value) && value !== '') {
			email.classList.add('contact_input_invalid')
			email_error.classList.add('email_error_visible')
			email_btn.classList.remove('contact_btn_active')
		} else {
			email.classList.remove('contact_input_invalid')
			email_error.classList.remove('email_error_visible')
			email_btn.classList.add('contact_btn_active')
		}
	}

	email.addEventListener('focus', () => {
		email_btn.classList.add('contact_btn_focused')
	})

	email.addEventListener('blur', () => {
		email_btn.classList.remove('contact_btn_focused')
	})

	email.addEventListener('input', () => {
		validateEmail(email.value)
	})
	modalCloseBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			modalContent.classList.remove('modal_layout-content-active')
			setTimeout(() => {
				modal.classList.remove('modal_active')
				body.style.overflow = 'auto'
			}, 400)
		})
	})
	const handleSubmit = async event => {
		body.style.overflow = 'hidden'
		event.preventDefault()
		email.value = ''
		spinner.classList.add('spinner-loader-visible')
		const formData = {
			email: email.value,
		}

		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setTimeout(() => {
					spinner.classList.remove('spinner-loader-visible')
					modal.classList.add('modal_active')
					setTimeout(() => {
						modalContent.classList.add('modal_layout-content-active')
					}, 300)
				}, 1000)
			} else {
				console.error('Error sending data:', response.status)
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	email_btn.addEventListener('click', handleSubmit)
}
const map = document.getElementById('map')
if (map) {
	ymaps.ready(function () {
		var map = new ymaps.Map('map', {
			center: [43.123946, 131.904924],
			zoom: 18,
		})

		if (map) {
			ymaps.modules.require(
				['Placemark', 'Circle'],
				function (Placemark, Circle) {
					var placemark = new Placemark([55.37, 35.45])
				}
			)
			map.controls.remove('geolocationControl') // удаляем геолокацию
			map.controls.remove('searchControl') // удаляем поиск
			map.controls.remove('trafficControl') // удаляем контроль трафика
			map.controls.remove('typeSelector') // удаляем тип
			map.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим

			map.controls.remove('rulerControl') // удаляем контрол правил
			map.behaviors.disable(['scrollZoom']) // отключаем скролл карты (опционально)
		}
	})
}
document.addEventListener('mousemove', parallax)
function parallax(e) {
	this.querySelectorAll('.wrapper-move').forEach(wrapper => {
		const speed = wrapper.getAttribute('data-speed')

		const x = (window.innerWidth - e.pageX * speed) / 100
		const y = (window.innerHeight - e.pageY * speed) / 100

		wrapper.style.transform = `translateX(${x}px) translateY(${y}px)`
	})
}
// скачивание файла

document.addEventListener('DOMContentLoaded', () => {
	const downloadButton = document.getElementById('download-btn')
	if (downloadButton) {
		downloadButton.addEventListener('click', event => {
			event.preventDefault() // Отменяем стандартное поведение ссылки

			// Проверяем, был ли файл скачан ранее
			if (localStorage.getItem('fileDownloaded')) {
				if (confirm('Вы уже скачивали файл. Скачать еще раз?')) {
					downloadFile()
				}
			} else {
				downloadFile()
			}
		})
	}

	function downloadFile() {
		fetch('/')
			.then(response => response.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = 'mistakes.txt'
				document.body.appendChild(a)
				a.click()
				document.body.removeChild(a)
				window.URL.revokeObjectURL(url)

				// Отмечаем, что файл был скачан
				localStorage.setItem('fileDownloaded', true)
			})
			.catch(error => {
				console.error('Ошибка при загрузке файла:', error)
			})
	}
})

// document.addEventListener('DOMContentLoaded', () => {
// 	const links = document.querySelectorAll('a[href*="#map-section"]')

// 	for (let link of links) {
// 		link.addEventListener('click', function (event) {
// 			event.preventDefault()
// 			const blockID = link.getAttribute('href')
// 			document.querySelector('' + blockID).scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'center',
// 			})
// 		})
// 	}
// })
document.addEventListener('DOMContentLoaded', () => {
	const links = document.querySelectorAll('a[href*="#"]')

	for (let link of links) {
		link.addEventListener('click', function (event) {
			event.preventDefault()
			const blockID = link.getAttribute('href')
			const block = document.querySelector(blockID)

			if (block) {
				let block_position

				switch (blockID) {
					case '#about':
						block_position = 'end'
						break
					case '#gallery':
						block_position = 'center'
						break
					case '#map-section':
						block_position = 'center'
						break
					case '#mistakes':
						block_position = 'center'
						break
					case '#furniture':
						block_position = 'center'
						break
					default:
						block_position = 'start'
				}

				block.scrollIntoView({
					behavior: 'smooth',
					block: block_position,
				})
			}
		})
	}
})
const modalOverlay = document.querySelector('.overlay')
const overlayBtns = document.querySelectorAll('.modal-btn')
const modalWrapper = document.querySelector('.popup_modal-wrapper')

const popupShow = () => {
	modalWrapper.classList.remove('popup_modal-wrapper_hidden')
	modalOverlay.classList.add('overlay_show')
	body.classList.add('body_fixed')
	body.style.overflow = 'hidden'
}

overlayBtns.forEach(btn => {
	btn.addEventListener('click', popupShow)
})

modalCloseBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		modalOverlay.classList.remove('overlay_show')
		body.classList.remove('body_fixed')
		body.style.overflow = 'auto'
	})
})
const emailInput = document.querySelector('.email-input')
const nameInput = document.querySelector('.name-input')
const phoneInput = document.querySelector('.phone-input')
const dateInput = document.querySelector('.date-input')
const handleSubmitFeedback = async event => {
	body.style.overflow = 'hidden'

	email.value = ''
	spinner.classList.add('spinner-loader-visible')
	const formData = {
		email: emailInput.value,
		name: nameInput.value,
		phoneInput: phoneInput.value,
		dateInput: dateInput.value,
	}

	try {
		const response = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		if (response.ok) {
			modalWrapper.classList.add('popup_modal-wrapper_hidden')
			setTimeout(() => {
				spinner.classList.remove('spinner-loader-visible')
				modalOverlay.classList.remove('overlay_show')
				modal.classList.add('modal_active')
				setTimeout(() => {
					modalContent.classList.add('modal_layout-content-active')
				}, 300)
			}, 1000)
		} else {
			console.error('Error sending data:', response.status)
		}
	} catch (error) {
		console.error('Error:', error)
	}
}
const feedback_btn = document.querySelector('.feedback-btn')
feedback_btn.addEventListener('click', () => {
	if (nameInput.value === '') {
		nameInput.classList.add('error-input')
	}
	if (emailInput.value === '') {
		emailInput.classList.add('error-input')
	}
	if (phoneInput.value === '') {
		phoneInput.classList.add('error-input')
	}
	if (dateInput.value === '') {
		dateInput.classList.add('error-input')
	}
	if (
		dateInput.value != '' &&
		emailInput.value != '' &&
		phoneInput.value != '' &&
		dateInput.value != ''
	) {
		handleSubmitFeedback()
	} else {
		// phoneInput.classList.remove('error-input')
		// nameInput.classList.remove('error-input')
		// emailInput.classList.remove('error-input')
		// dateInput.classList.remove('error-input')
	}
})
