var express = require('express')
var router = express.Router()

/* GET users listing. */

router.get('/', function (req, res, next) {
	res.render('estimate', {
		title: 'Отзывы наших клиентов',
	})
})

module.exports = router
