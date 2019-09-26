import { NextFunction, Request, Response } from 'express';

import CustomError from '@Middleware/error/customError';

import LOLTeam from '@Model/LOLTeam.model';
import LOLTeamMember from '@Model/LOLTeamMember.model';
import LOLVote from '@Model/LOLVote.model';
import User from '@Model/user.model';

const getLOLTeam = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;

  const getTotalVoteRatioStr: (totalVoteCount: number, voteCount: number) => string = (totalVoteCount, voteCount) =>
    ((voteCount / totalVoteCount) * 100).toFixed(1) + '%';

  try {
    const team: LOLTeam[] = await LOLTeam.findAll({
      order: [['pk', 'ASC']],
      include: [
        {
          model: LOLTeamMember,
          attributes: ['name', 'studentId', 'leader'],
        },
        {
          model: LOLVote,
          attributes: ['user_pk'],
        },
      ],
    });

    const totalVoteCount: number = team[0].LOLVote.length + team[1].LOLVote.length;

    res.json({
      success: true,
      data: {
        team: team.map(val => ({
          pk: val.pk,
          name: val.name,
          member: val.LOLTeamMember.map(member => ({
            studentId: member.studentId,
            name: member.name,
            leader: member.leader,
          })),
          isVote: val.LOLVote.some(vote => vote.user_pk === user.pk),
          voteRatio: totalVoteCount === 0 ? '0%' : getTotalVoteRatioStr(totalVoteCount, val.LOLVote.length),
        })),
      },
    });
  } catch (err) {
    console.log(err);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getLOLTeam;
