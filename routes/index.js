var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'ЖК Формат',
	})
})
router.post('/', function (req, res) {
	const dataToWrite = JSON.stringify(req.body, null, 2) + '\n'
	const filePath = path.join(__dirname, '../data.txt')

	fs.writeFile(filePath, dataToWrite, { flag: 'a' }, err => {
		if (err) {
			console.error('Error writing to file:', err)
			return res.status(500).send('Error saving data')
		}

		console.log('Data appended to file:', filePath)
		return res.sendStatus(200)
	})
})
module.exports = router

