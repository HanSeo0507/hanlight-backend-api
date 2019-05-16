import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import Board from './board.model';
import Notice from './notice.model';
import NoticeLog from './noticeLog.model';
import Student from './student.model';
import Teacher from './teacher.model';
import Graduate from './graduate.model';
import Parent from './parent.model';

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: 'student' | 'teacher' | 'graduate' | 'parent';

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  public admin: number;

  @Column(DataType.STRING)
  public id: string;

  @Column(DataType.STRING)
  public password: string;

  @Column(DataType.STRING)
  public passwordKey: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  public signKey: string;

  @Column(DataType.STRING)
  public tp: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @HasOne(() => Student)
  public student: Student;
  @HasOne(() => Teacher)
  public teacher: Teacher;
  @HasOne(() => Graduate)
  public graduate: Graduate;
  @HasOne(() => Parent)
  public parent: Parent;

  @HasMany(() => Notice)
  public notice: Notice[];

  @HasMany(() => NoticeLog)
  public noticeLog: NoticeLog[];

  @HasMany(() => Board)
  public board: Board[];
}
