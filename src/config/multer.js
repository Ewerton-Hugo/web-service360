const multer = require('multer');
const { resolve } = require('path');

const storage = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "tmp"));
    },
    filename: (request, file, callback) => {
      const filename = `${file.originalname}`;

      return callback(null, filename);
    }
  })
}

const upload = multer(storage);

module.exports = { upload };
