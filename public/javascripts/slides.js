// const mainBanner = document.querySelector('.slider_banner')
// if (swiperBanner) {
// 	const swiperBanner = new Swiper(mainBanner, {
// 		direction: 'horizontal',
// 	})
// 	alert(1)
// }
const swiper = new Swiper('.main_banner_image', {
	// Optional parameters
	direction: 'horizontal',

	loop: true,
	wrapperClass: 'slider_banner',
	slideClass: 'slider_banner-slide',
	speed: 300,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	autoplay: {
		delay: 7000,
	},
	// // If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},

	// // Navigation arrows
	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev',
	// },

	// // And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// },
})
const swiperEstimate = new Swiper('.swiper', {
	// Optional parameters
	direction: 'vertical',

	loop: true,
	wrapperClass: 'swiper-wrapper',
	slideClass: 'swiper-slide',
	speed: 300,
	// effect: flip,
	// limitRotation: true,
	// slideShadows: true,
	autoplay: {
		delay: 10000,
	},
	// // If we need pagination
})
