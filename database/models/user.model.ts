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

import Notice from './notice.model';
import NoticeLog from './noticeLog.model';
import Student from './student.model';
import Teacher from './teacher.model';

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
  public type: string;

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

  @HasMany(() => Notice)
  public notice: Notice[];

  @HasMany(() => NoticeLog)
  public noticeLog: NoticeLog[];
}
