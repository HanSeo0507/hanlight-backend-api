import User from '@Model/user.model';
import Board from '@Model/board.model';
import BoardComment from '@Model/boardComment.model';
import BoardCommentLike from '@Model/boardCommentLike.model';
import BoardImage from '@Model/boardImage.model';
import BoardLike from '@Model/boardLike.model';
import TermAcceptLog from '@Model/termAcceptLog.model';
import BoardManageLog from '@Model/boardManageLog.model';
import BoardPatchLog from '@Model/boardPatchLog.model';
import BoardReportLog from '@Model/boardReportLog.model';
import Calendar from '@Model/calendar.model';
import CalendarLog from '@Model/calendarLog.model';
import Notice from '@Model/notice.model';
import NoticeApproveLog from '@Model/noticeApproveLog.model';
import NoticeViewLog from '@Model/noticeViewLog.model';
import TimeTableLog from '@Model/timeTableLog.model';
import TimeTable from '@Model/timeTable.model';

export const associate = () => {
  User.hasMany(Board, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'board',
  });

  User.hasMany(BoardLike, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'boardLike',
  });

  User.hasMany(BoardComment, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'boardComment',
  });

  User.hasMany(BoardCommentLike, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'boardCommentLike',
  });

  User.hasMany(BoardManageLog, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'boardManageLog',
  });

  User.hasMany(BoardReportLog, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'boardReportLog',
  });

  User.hasMany(CalendarLog, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'calendarLog',
  });

  User.hasMany(Notice, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'notice',
  });

  User.hasMany(NoticeApproveLog, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'noticeApproveLog',
  });

  User.hasMany(NoticeViewLog, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'noticeViewLog',
  });

  User.hasMany(TimeTableLog, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'timeTableLog',
  });

  User.hasOne(TermAcceptLog, {
    sourceKey: 'pk',
    foreignKey: 'user_pk',
    as: 'termAcceptLog',
  });

  Board.hasMany(BoardLike, {
    sourceKey: 'pk',
    foreignKey: 'board_pk',
    as: 'boardLike',
  });

  Board.hasMany(BoardComment, {
    sourceKey: 'pk',
    foreignKey: 'board_pk',
    as: 'boardComment',
  });

  Board.hasMany(BoardImage, {
    sourceKey: 'pk',
    foreignKey: 'board_pk',
    as: 'boardImage',
  });

  Board.hasMany(BoardManageLog, {
    sourceKey: 'pk',
    foreignKey: 'board_pk',
    as: 'boardManageLog',
  });

  Board.hasMany(BoardPatchLog, {
    sourceKey: 'pk',
    foreignKey: 'board_pk',
    as: 'boardPatchLog',
  });

  Board.hasMany(BoardReportLog, {
    sourceKey: 'pk',
    foreignKey: 'board_pk',
    as: 'boardReportLog',
  });

  Board.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardLike.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardLike.belongsTo(Board, {
    foreignKey: 'board_pk',
    as: 'board',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardImage.belongsTo(Board, {
    foreignKey: 'board_pk',
    as: 'board',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardComment.hasMany(BoardCommentLike, {
    sourceKey: 'pk',
    foreignKey: 'comment_pk',
    as: 'boardCommentLike',
  });

  BoardComment.hasMany(BoardPatchLog, {
    sourceKey: 'pk',
    foreignKey: 'comment_pk',
    as: 'boardPatchLog',
  });

  BoardComment.hasMany(BoardReportLog, {
    sourceKey: 'pk',
    foreignKey: 'comment_pk',
    as: 'boardReportLog',
  });

  BoardComment.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardComment.belongsTo(Board, {
    foreignKey: 'board_pk',
    as: 'board',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardCommentLike.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardCommentLike.belongsTo(BoardComment, {
    foreignKey: 'comment_pk',
    as: 'boardComment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  BoardManageLog.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onUpdate: 'CASCADE',
  });

  BoardManageLog.belongsTo(Board, {
    foreignKey: 'board_pk',
    as: 'board',
    onUpdate: 'CASCADE',
  });

  BoardPatchLog.belongsTo(Board, {
    foreignKey: 'board_pk',
    as: 'board',
    onUpdate: 'CASCADE',
  });

  BoardPatchLog.belongsTo(BoardComment, {
    foreignKey: 'comment_pk',
    as: 'boardComment',
    onUpdate: 'CASCADE',
  });

  BoardReportLog.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
  });

  BoardReportLog.belongsTo(Board, {
    foreignKey: 'board_pk',
    as: 'board',
    onUpdate: 'CASCADE',
  });

  BoardReportLog.belongsTo(BoardComment, {
    foreignKey: 'comment_pk',
    as: 'boardComment',
  });

  Calendar.hasMany(CalendarLog, {
    sourceKey: 'pk',
    foreignKey: 'calendar_pk',
    as: 'calendarLog',
  });

  CalendarLog.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
  });

  Notice.hasMany(NoticeApproveLog, {
    sourceKey: 'pk',
    foreignKey: 'notice_pk',
    as: 'noticeApproveLog',
  });

  Notice.hasMany(NoticeViewLog, {
    sourceKey: 'pk',
    foreignKey: 'notice_pk',
    as: 'noticeViewLog',
  });

  Notice.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
  });

  NoticeApproveLog.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
  });

  NoticeApproveLog.belongsTo(Notice, {
    foreignKey: 'notice_pk',
    as: 'notice',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  NoticeViewLog.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  NoticeViewLog.belongsTo(Notice, {
    foreignKey: 'notice_pk',
    as: 'notice',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  TimeTable.hasMany(TimeTableLog, {
    sourceKey: 'pk',
    foreignKey: 'timeTable_pk',
    as: 'timeTableLog',
  });

  TimeTableLog.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onUpdate: 'CASCADE',
  });

  TimeTableLog.belongsTo(TimeTable, {
    foreignKey: 'timeTable_pk',
    as: 'timeTable',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  TermAcceptLog.belongsTo(User, {
    foreignKey: 'user_pk',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};
