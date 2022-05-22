import instance from './core';

const commentApi = {
  GET_COMMENT({ postType, postId }) {
    return instance({
      url: `/${postType}/comment/${postId}`,
      method: 'get',
    });
  },
  POST_COMMENT({ postType, data }) {
    return instance({
      url: `/${postType}/comment`,
      method: 'post',
      data,
    });
  },
  DELETE_COMMENT({ postType, id }) {
    return instance({
      url: `/${postType}/comment/${id}`,
      method: 'delete',
    });
  },
  PATCH_COMMENT({ postType, id, data }) {
    return instance({
      url: `/${postType}/comment/${id}`,
      method: 'patch',
      data,
    });
  },
  POST_REPLY({ postType, data }) {
    return instance({
      url: `/${postType}/nested_comment`,
      method: 'post',
      data,
    });
  },
  PATCH_REPLY({ postType, id, data }) {
    return instance({
      url: `/${postType}/nested_comment/${id}`,
      method: 'patch',
      data,
    });
  },
  PATCH_COMMENT_LIKE({ postType, id }) {
    return instance({
      url: `/${postType}/comment/liking/${id}`,
      method: 'patch',
    });
  },
  PATCH_COMMENT_UN_LIKE({ postType, id }) {
    return instance({
      url: `/${postType}/comment/unliking/${id}`,
      method: 'patch',
    });
  },
};

export default commentApi;