var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'ЖК Формат',
	})
})

module.exports = router
