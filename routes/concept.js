var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('concept')
})
// router.post('/concept', (req, res) => {
// 	console.log('Received data:', req.body)
// 	// Process the data as needed

// 	// Send a response back to the frontend
// 	res.status(200).json({ message: 'Data received successfully' })
// })
module.exports = router
