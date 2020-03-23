import { NextFunction, Request, Response } from 'express';
import { col, Includeable, Op } from 'sequelize';

import deleteUndefined from '@Lib/deleteUndefined';

import User from '@Model/user.model';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const limit = 15;
  const page = (req.query.page && req.query.page - 1) || 0;

  const type: User['type'] | undefined = req.query.type;
  const major: User['major'] | undefined = req.query.major;
  const grade: User['grade'] | undefined = req.query.grade;
  const classNum: User['classNum'] | undefined = req.query.classNum;
  const studentNum: User['studentNum'] | undefined = req.query.studentNum;
  const name: User['name'] | undefined = req.query.name;

  const userClause = {
    type,
    major,
    grade,
    classNum,
    studentNum,
    name: name ? { [Op.like]: `%${name}%` } : undefined,
  };

  deleteUndefined(userClause);

  const users: User[] = await User.findAll({
    limit,
    offset: page * limit,
    where: userClause,
    attributes: ['pk', 'type', 'name', 'id', 'signKey', 'tp', 'major', 'grade', 'classNum', 'studentNum', 'admin'],
  });
  res.json({
    success: true,
    data: {
      user: users,
    },
  });
};

export default getUser;
