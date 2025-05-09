const multer = require('multer');
const upload = multer();

const parseFormData = (req, res, next) => {
  upload.fields([{ name: 'coverImage', maxCount: 1 }])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: 'Invalid form data' });
    }

    try {
      if (req.body.data) {
        req.body = { ...req.body, ...JSON.parse(req.body.data) };
      }
      next();
    } catch (error) {
      return res.status(400).json({ msg: 'Invalid JSON in data field' });
    }
  });
};

module.exports = parseFormData;
