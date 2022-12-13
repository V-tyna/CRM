const moment = require('moment');
const multer = require('multer');

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		const date = moment().format('DDMMYYYY-HHmmss_SSS');
		cb(null, `${date}-${file.originalname}`);
	},
});

const fileFilter = (req, file, cb) => {
	const mimetypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'];
	if (mimetypes.includes(file.mimetype)) {
    console.log(file);
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const limits = {
	fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
	storage,
	fileFilter,
	limits,
});
