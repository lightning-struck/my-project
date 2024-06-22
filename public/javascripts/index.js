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
const popupImage = document.querySelector('.popup-img')
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
