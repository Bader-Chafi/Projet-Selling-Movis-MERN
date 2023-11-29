const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const dateRoute = require('./routes/dateRoute');
const sectionRoute = require('./routes/sectionRoute');
const filmRoute = require('./routes/filmRoute');
const loginRoute = require('./routes/loginRoute');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const searchFilmRoute = require('./routes/searchFilmRoute');
// Connect to the database
dbConnection();

// express app 
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(
));
corsOptions

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "images")))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`node : ${process.env.NODE_ENV}`)
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Fix the Error [ERR_HTTP_HEADERS_SENT]
// let doesNotModifyBody = (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// }; // this 
// let doesModifyBody = (req, res, next) => {
//     res.setHeader("Content-Type", "text/html");
//     res.write("<p>Hello World</p>");
//     res.end();
// }; // and this
// app.use(doesNotModifyBody);
// app.use(doesModifyBody);

app.post('/api/v1/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
    const { files } = req;
    const imageFile = files['image'][0];
    const videoFile = files['video'][0];

    res.status(200).send({
        videoPath: videoFile.path,
        imagePath: imageFile.path,
        // imageName: imageFile.originalname,
        // videoName: videoFile.originalname,
        message: 'Files uploaded',
    });
});
app.use('/api/v1/uploads', express.static(path.join(__dirname, 'images')));

// Mounte Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/dates', dateRoute);
app.use('/api/v1/sections', sectionRoute);
app.use('/api/v1/films', filmRoute);
app.use('/api/v1/searchfilm', searchFilmRoute);

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