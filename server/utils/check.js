const joi = require('joi');

//用户注册登录的表单校验规则
const userName = joi
  .string()
  .pattern(/^[\S]{1,6}$/)
  .required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

exports.userCheck = {
  body: {
    userName,
    password,
  },
};

//课程查询参数的校验规则
const category = joi.string().required();
const page = joi.number().integer().required();
const size = joi.number().integer().required();
exports.findCourseCheck = {
  query: {
    category,
    page,
    size,
  },
};

//课程查询参数的校验规则
const title = joi.string();
const price = joi.number();
const id = joi.number().integer().required();
exports.updateCourseCheck = {
  query: {
    title,
    price,
    id,
  },
};

//课程查询参数的校验规则
exports.deleteCourseCheck = {
  query: {
    id,
  },
};

