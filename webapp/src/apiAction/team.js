import teamApi from 'api/team';
<<<<<<< HEAD
=======
import axios from 'axios';
import dayjs from 'dayjs';
import uuid from 'react-uuid';
import { catchError } from '_actions/global_action';
import {
  actionGetTeamList,
  actionGetTeamDetail,
  actionPostTeamComment,
  actionPatchTeamComment,
  actionDeleteTeamComment,
  actionSecretTeamComment,
  actionPostTeamReply,
  actionDeleteTeamReply,
  actionPatchTeamReply,
  actionSecretTeamReply,
  actionPatchTeamLike,
  actionPostTeamPost,
} from '_actions/team_action';
>>>>>>> fa6a12ae010484d2036323ee77f4e12f45836740

export const getTeamList = ({ page }) => teamApi.GET_TEAM_ARR(page).then((response) => response);

export const getTeamDetail = ({ id }) =>
  teamApi.GET_TEAM_DETAIL({ id }).then((response) => response);

<<<<<<< HEAD
export const postTeamPost = (dataTosubmit) =>
  teamApi.POST_TEAM_POST({ data: dataTosubmit }).then((response) => response);
=======
export function postTeamPost(dataTosubmit) {
  return async (dispatch) => {
    return teamApi
      .POST_TEAM_POST(dataTosubmit)
      .then((response) => dispatch(actionPostTeamPost(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function postTeamComment(dataToSubmit) {
  return (dispatch) => {
    const { team_id, writter_id, nickname, content, isSecret } = dataToSubmit;
    const newCommentCreateAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const newCommentId = uuid();
    const newComment = {
      ...commentObj,
      writter_id,
      id: newCommentId,
      nickname,
      content,
      isSecret,
      createdAt: newCommentCreateAt,
      updatedAt: newCommentCreateAt,
    };
    return dispatch(actionPostTeamComment(newComment));
    // return teamApi
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}
>>>>>>> fa6a12ae010484d2036323ee77f4e12f45836740

export const patchTeamPost = ({ id, editTeamInfo }) =>
  teamApi.EDIT_TEAM_POST({ id, data: editTeamInfo }).then((response) => response);
