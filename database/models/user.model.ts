import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, HasOne, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import Student from './student.model';
import Teacher from './teacher.model';

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public passwordKey: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @HasOne(() => Student)
  public student: Student;

  @HasOne(() => Teacher)
  public teacher: Teacher;
}
