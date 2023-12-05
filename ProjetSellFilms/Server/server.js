const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const userRoute = require('./routes/userRoute');
const cartItemRoute = require('./routes/cartItemRoute');
const categoryRoute = require('./routes/categoryRoute');
const dateRoute = require('./routes/dateRoute');
const sectionRoute = require('./routes/sectionRoute');
const filmRoute = require('./routes/filmRoute');
const loginRoute = require('./routes/loginRoute');
const uploadRoute = require('./routes/uploadRoute');
const adminRoute = require('./routes/adminRoute');
const path = require('path');
const cors = require('cors');
const searchFilmRoute = require('./routes/searchFilmRoute');

// Connect to the database
dbConnection();
// express app 
const app = express();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());
corsOptions
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "images")))
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`node : ${process.env.NODE_ENV}`)
};



app.use('/api/v1/users', userRoute);
app.use('/api/v1/cartitems', cartItemRoute);
app.use('/api/v1/admins', adminRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/dates', dateRoute);
app.use('/api/v1/sections', sectionRoute);
app.use('/api/v1/films', filmRoute);
app.use('/api/v1/upload', uploadRoute)
app.use('/api/v1/uploads', express.static(path.join(__dirname, 'images')));
app.use('/api/v1/searchfilm', searchFilmRoute);


// Mounte Routes
app.all('*', (req, res, next) => {
    // create error and send it error handling middleware
    next(new ApiError(`can not find this route: ${req.originalUrl}`, 400));
})

//Globa Error Handler middleware on express
app.use(globalError);
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
});
// Event => list => calbacks(err) Handle rejection of out express
process.on("unhandledRejection", (err) => {
    console.log(`UnhandledRejection error : ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('shutting down....')
        process.exit(1);
    });
})