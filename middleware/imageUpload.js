const multer = require('multer');

const newFileName = new Date().toISOString().replace(/[:.]/gi, '-');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${newFileName}${file.mimetype === 'image/jpeg' ? '.jpg' : '.png'}`)
    }
})

const fileFilter = (req, file, cb) => {
    //reject a file : cb(null, false);
    //accept a file : cb(null, true);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Please make sure the uploaded file is either jpeg or png'), false);
    };
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5Mbites
    },
    fileFilter: fileFilter
})

const imageUpload = (file) => upload.single(file)
module.exports = imageUpload;
