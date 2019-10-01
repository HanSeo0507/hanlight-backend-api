import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import Graduate from '@Model/graduate.model';
import Parent from '@Model/parent.model';
import Student from '@Model/student.model';
import Teacher from '@Model/teacher.model';
import User from '@Model/user.model';

import { Body } from './_validation';

const FSUserCheck = async (req: Request, res: Response, next: NextFunction) => {
  const { user_pk }: Body = req.body;

  try {
    const user: User | undefined = await User.findOne({ where: { pk: user_pk } });

    if (user) {
      switch (user.type) {
        case 'student':
          const student: Student | undefined = await Student.findOne({ where: { user_pk } });
          user.student = student;
          break;
        case 'teacher':
          const teacher: Teacher | undefined = await Teacher.findOne({ where: { user_pk } });
          user.teacher = teacher;
          break;
        case 'parent':
          const parent: Parent | undefined = await Parent.findOne({ where: { user_pk } });
          user.parent = parent;
          break;
        case 'graduate':
          const graduate: Graduate | undefined = await Graduate.findOne({ where: { user_pk } });
          user.graduate = graduate;
          break;
      }

      res.json({
        success: true,
        data: {
          user: {
            pk: user.pk,
            type: user.type,
            name: user[user.type].name,
            major: user.type === 'student' ? user.student.major : null,
            grade: user.type === 'student' ? user.student.grade : null,
            classNum: user.type === 'student' ? user.student.classNum : null,
            studentNum: user.type === 'student' ? user.student.studentNum : null,
          },
        },
      });
    } else {
      next(new CustomError({ name: 'Not_Found', message: '존재하지 않는 유저입니다.' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default FSUserCheck;
