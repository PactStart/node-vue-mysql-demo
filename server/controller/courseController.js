const db = require('../config/db');

/**
 * 课程查询接口逻辑
 */
exports.listCourse = (req, res) => {
  //获取前端的参数
  let { category, page, size } = req.query;
  page = (page - 1) * size;

  //查询课程列表sql
  const pageSql =
    'select * from course where del=0 and category=? order by id limit ?,?';

  //查询课程总数的sql
  const totalSql =
    'select count(*) as total from course where del=0 and category=?';

  db.query(pageSql, [category, Number(page), Number(size)], (err, resPage) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    db.query(totalSql, category, (err, results) => {
      if (err) {
        return res.send({ code: 1, message: err.message });
      }
      res.send({
        code: 0,
        data: {
          list: resPage,
          total: results[0].total,
        },
      });
    });
  });
};

/**
 * 课程修改接口逻辑
 */
exports.updateCourse = (req, res) => {
  let { title, price, id } = req.query;
  let sql = 'update course set ';
  let arr = [];
  //同时修改标题和价格
  if (title && price) {
    sql = sql + 'title=?,price=? where id=?';
    arr = [title, Number(price), Number(id)];
  } else if (title) {
    //单独修改标题
    sql = sql + 'title=? where id=?';
    arr = [title, Number(id)];
  } else if (price) {
    //单独修改标题
    sql = sql + 'price=? where id=?';
    arr = [price, Number(id)];
  }
  db.query(sql, arr, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({
      code: 0,
      data: {
        message: '修改成功',
      },
    });
  });
};

/**
 * 删除课程接口逻辑
 */
exports.deleteCourse = (req, res) => {
  let { id } = req.query;

  let sql = 'update course set del=1 where id=?';
  db.query(sql, id, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({
      code: 0,
      data: {
        message: '删除成功',
      },
    });
  });
};

