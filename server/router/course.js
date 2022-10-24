const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const {
  findCourseCheck,
  updateCourseCheck,
  deleteCourseCheck,
} = require('../utils/check');
const courseController = require('../controller/courseController');

//课程查询接口
router.get('/find', expressJoi(findCourseCheck), courseController.listCourse);

//课程修改接口
router.get(
  '/update',
  expressJoi(updateCourseCheck),
  courseController.updateCourse
);

//课程删除接口
router.get(
  '/delete',
  expressJoi(deleteCourseCheck),
  courseController.deleteCourse
);
module.exports = router;

