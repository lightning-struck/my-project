var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var app = express()
var exphbs = require('express-handlebars')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var conceptRouter = require('./routes/concept')

const urlencodedParser = express.urlencoded({ extended: false })

const file = __dirname + '/download/mistakes.txt'
app.get('/download', (req, res) => {
	res.download(file)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use('/', conceptRouter)
app.use('/concept', conceptRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = {
		status: err.status || 500,
		stack: err.stack,
	}

	// render the error page
	res.status(res.locals.error.status)
	res.render('error')
})

app.engine(
	'.hbs',
	exphbs.engine({
		extname: 'hbs',
		defaultLayout: 'layout',
		layoutsDir: path.join(__dirname, 'views/layouts'),
		partialsDir: path.join(__dirname, 'views/partials'),
		allowProtoPropertiesByDefault: true,
	})
)

app.get('/', function (_, response) {
	response.sendFile(__dirname + '/footer.hbs')
})
app.post('/', (request, response) => {
	console.log(request.body)
	response.sendStatus(200)
})

module.exports = app
app.listen(4000)
