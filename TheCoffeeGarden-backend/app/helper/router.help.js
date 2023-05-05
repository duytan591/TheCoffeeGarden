const Joi = require('joi');

// const validateParam = (schema, name) => {
//     return (req, res, next) => {
//         const validatorResult = schema.validate({param: req.params[name]})

//         if(validatorResult.error) {
//             return res.status(400).json(validatorResult.error)
//         } else {
//             if(!req.value) req.value = {}
//             if(!req.value['params']) req.value.params = {}

//             req.value.params[name] = req.params[name]
//             next()
//         }
//     }
// }
// const schemas = {
//     idSchema: Joi.object().keys({
//         param: Joi.string().regex(/^[9-0a-fA-F]{24}$/).required()
//     })
// }

const userValidate = data => {
    const  userSchema = Joi.object({
        username: Joi.string().lowercase().required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).max(30).required()
    });
    return userSchema.validate(data);
}
const loginValidate = data => {
    const  userSchema = Joi.object({
        username: Joi.string().lowercase().required(),
        password: Joi.string().min(6).max(30).required()
    });
    return userSchema.validate(data);
}

module.exports = {
    // validateParam,
    // schemas,
    userValidate,
    loginValidate
}