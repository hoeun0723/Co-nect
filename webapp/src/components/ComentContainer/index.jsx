import React, { useCallback, useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { handleFetcher } from 'utils';
import commentApi from 'api/comment';
import { getUserInfo } from 'service/auth';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default function CommentContainer({ postType, postWriter, postId }) {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const userInfo = getUserInfo(); // {userId, name, profileImg}

  const loggedInUserName = userInfo?.name;

  const selectEditTargetComment = (commentId) => {
    setEditTargetCommentId(commentId);
  };

  const resetTarget = () => {
    setEditTargetCommentId(DEFAULT_TARGET);
  };

  const addCommentOnRoot = useCallback(
    async (newCommentData) => {
      const { error, isError } = await handleFetcher(commentApi.POST_COMMENT, {
        postType,
        data: newCommentData,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      forceUpdate();
    },
    [forceUpdate, postType],
  );

  const addCommentOnNested = useCallback(
    async (newCommentData) => {
      const { error, isError } = await handleFetcher(commentApi.POST_REPLY, {
        postType,
        data: newCommentData,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      forceUpdate();
    },
    [postType],
  );

  const handlePostComment = useCallback(
    async (newCommentData, commentId) => {
      if (commentId) {
        addCommentOnNested(newCommentData);
      } else {
        addCommentOnRoot(newCommentData);
      }
    },
    [addCommentOnNested, addCommentOnRoot],
  );

  const editCommentOnRoot = useCallback(
    async (newCommentData, commentId) => {
      const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT, {
        postType,
        id: commentId,
        data: newCommentData,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      forceUpdate();
    },
    [forceUpdate, postType],
  );

  const editCommentOnNested = useCallback(
    async (newCommentData, commentId) => {
      const { error, isError } = await handleFetcher(commentApi.PATCH_REPLY, {
        postType,
        id: commentId,
        data: newCommentData,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      forceUpdate();
    },
    [forceUpdate, postType],
  );

  const handleSubmitEditComment = useCallback(
    async (newCommentData, commentId, parentId) => {
      if (parentId) {
        editCommentOnNested(newCommentData, commentId);
      } else {
        editCommentOnRoot(newCommentData, commentId);
      }
    },
    [editCommentOnNested, editCommentOnRoot],
  );

  const handleClickDeleteButton = useCallback(
    async (id, parentId) => {
      const { error, isError } = await handleFetcher(commentApi.DELETE_COMMENT, { postType, id });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      forceUpdate();
    },
    [forceUpdate, postType],
  );

  const addLike = useCallback(async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT_LIKE, { postType, id });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, addLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => addLikeToComment({ prevComments, id, loggedInUserId }));
    }
  }, []);

  const removeLike = useCallback(async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT_UN_LIKE, {
      postType,
      id,
    });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, removeLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => removeLikeToComment({ prevComments, id, loggedInUserId }));
    }
  }, []);

  const handleClickLikeThumb = useCallback(
    async (id, loggedInUserId, isLikesContainUserId, parentId) => {
      const idObj = { id, loggedInUserId, parentId };
      if (isLikesContainUserId) {
        removeLike(postType, idObj);
      } else {
        addLike(postType, idObj);
      }
    },
    [addLike, postType, removeLike],
  );

  const fetchComments = useCallback(async () => {
    const {
      error,
      isError,
      value: comments,
    } = await handleFetcher(commentApi.GET_COMMENT, { postType, postId });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    setComments(comments);
    resetTarget();
  }, [postId, postType]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <CommentForm
        postType={postType}
        postId={postId}
        initialText=""
        submitCallback={handlePostComment}
        commentInfo={{ id: null, parentId: null, secret: false }}
        hasCancelButton={false}
        hasDeleteButton={false}
        handleCancel={() => {}}
        handleClickDeleteButton={handleClickDeleteButton}
      />
      {!comments && comments?.length !== 0 ? (
        <div>댓글이 없어요.</div>
      ) : (
        <CommentList
          isReplies={false}
          postType={postType}
          postWriter={postWriter}
          loggedInUserName={loggedInUserName}
          comments={comments}
          editTargetCommentId={editTargetCommentId}
          resetTarget={resetTarget}
          selectEditTargetComment={selectEditTargetComment}
          handlePostComment={handlePostComment}
          handleSubmitEditComment={handleSubmitEditComment}
          handleClickDeleteButton={handleClickDeleteButton}
          handleClickLikeThumb={handleClickLikeThumb}
        />
      )}
    </div>
  );
}

const DEFAULT_TARGET = -1;

const deepClone = (originalObject) => JSON.parse(JSON.stringify(originalObject));

const findParentAndDoCallback = (parents, parentId, callback, callbackParams) => {
  return parents.map((comment) => {
    if (comment.id === parentId) {
      const clone = deepClone(comment);
      clone.replies = callback({ prevComments: clone.replies, ...callbackParams });
      return clone;
    }
    return comment;
  });
};

const addLikeToComment = ({ prevComments, id, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === id) {
      const clone = deepClone(comment);
      clone.feeling.push(loggedInUserId);
      return clone;
    }
    return comment;
  });
};

const removeLikeToComment = ({ prevComments, id, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === id) {
      const clone = deepClone(comment);
      clone.feeling = [...clone.feeling].filter((userId) => userId !== loggedInUserId);
      return clone;
    }
    return comment;
  });
};
