

const Joi=require("joi");

const signupSchemaValid = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  email: Joi.string().email().required()
});

module.exports=signupSchemaValid;