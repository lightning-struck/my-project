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
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})
app.engine(
	'.hbs',
	exphbs.engine({
		extname: 'hbs',
		defaultLayout: 'layout',
		layoutsDir: path.join(__dirname, 'views/layouts'),
		partialsDir: path.join(__dirname, 'views/partials'),
	})
)
module.exports = app
app.listen(4000)