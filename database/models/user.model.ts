import { Model, DataTypes, HasMany, HasOne } from 'sequelize';

import { sequelize } from '../index';
import Board from './board.model';
import BoardComment from './boardComment.model';
import BoardCommentLike from './boardCommentLike.model';
import BoardLike from './boardLike.model';
import TermAcceptLog from './termAcceptLog.model';
import BoardManageLog from './boardManageLog.model';
import BoardReportLog from './boardReportLog.model';
import CalendarLog from './calendarLog.model';
import Notice from './notice.model';
import NoticeApproveLog from './noticeApproveLog.model';
import NoticeViewLog from './noticeViewLog.model';
import TimeTableLog from './timeTableLog.model';

export default class User extends Model<User> {
  static associations: {
    board: HasMany<User, Board>;
    boardLike: HasMany<User, BoardLike>;
    boardComment: HasMany<User, BoardComment>;
    boardCommentLike: HasMany<User, BoardCommentLike>;
    boardManageLog: HasMany<User, BoardManageLog>;
    boardReportLog: HasMany<User, BoardReportLog>;
    calendarLog: HasMany<User, CalendarLog>;
    notice: HasMany<User, Notice>;
    noticeApproveLog: HasMany<User, NoticeApproveLog>;
    noticeViewLog: HasMany<User, NoticeViewLog>;
    timeTableLog: HasMany<User, TimeTableLog>;
    termAcceptLog: HasOne<User, TermAcceptLog>;
  };

  public board: Board[];
  public boardLike: BoardLike[];
  public boardComment: BoardComment[];
  public boardCommentLike: BoardCommentLike[];
  public boardManageLog: BoardManageLog[];
  public boardReportLog: BoardReportLog[];
  public calendarLog: CalendarLog[];
  public notice: Notice[];
  public noticeApproveLog: NoticeApproveLog[];
  public noticeViewLog: NoticeViewLog[];
  public timeTableLog: TimeTableLog[];
  public termAcceptLog: TermAcceptLog;

  public pk: string;
  public type: 'student' | 'teacher' | 'graduate' | 'parent';
  public name: string;
  public id: string;
  public password: string;
  public passwordKey: string;
  public signKey: string;
  public tp: string;
  public image: string;
  public major: 'G' | 'N' | 'H' | 'I';
  public grade: number;
  public classNum: number;
  public studentNum: number;
  public adminLevel: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

User.init(
  {
    pk: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    passwordKey: {
      type: DataTypes.STRING,
    },
    signKey: {
      type: DataTypes.STRING,
    },
    tp: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    major: {
      type: DataTypes.STRING,
    },
    grade: {
      type: DataTypes.INTEGER,
    },
    classNum: {
      type: DataTypes.INTEGER,
    },
    studentNum: {
      type: DataTypes.INTEGER,
    },
    adminLevel: {
      defaultValue: 0,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);
