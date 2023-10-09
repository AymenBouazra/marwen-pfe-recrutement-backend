const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});



// this code goes inside the object passed to multer()
function fileFilter(req, file, cb) {
    // Allowed ext
    const filetypes = /json|mp4|avi|mpg|mpeg/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
}

// inside multer({}), file upto only 1MB can be uploaded
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 100000000000 }
});

module.exports = upload;