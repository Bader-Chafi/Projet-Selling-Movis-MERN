const { validationResult } = require("express-validator");
// @desc middleware => catch errors from rule if exists
exports.validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    next();
}

