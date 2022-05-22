import instance from './core';

const teamApi = {
  GET_TEAM_ARR(lastPage) {
    return instance({
      url: `/teams`,
      method: 'get',
<<<<<<< HEAD
      params: { lastPage },
=======
      params: { id },
    });
  },
  GET_TEAM_LIKES() {
    return instance({
      url: '/team/liking',
      method: 'get',
    });
  },
  POST_TEAM_POST(data) {
    return instance({
      url: 'api/team',
      method: 'post',
      data,
    });
  },
  POST_TEAM_COMMENT(data) {
    return instance({
      url: '/team/comment',
      method: 'post',
      data,
>>>>>>> fa6a12ae010484d2036323ee77f4e12f45836740
    });
  },
  POST_TEAM_POST({ data }) {
    return instance({
      url: '/team',
      method: 'post',
      data,
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return instance({
      url: `/team/${id}`,
      method: 'get',
    });
  },
  EDIT_TEAM_POST({ id, data }) {
    return instance({
      url: `/team/${id}`,
      method: 'patch',
      data,
    });
  },
  GET_TEAM_LIKES() {
    return instance({
      url: '/team/liking',
      method: 'get',
    });
  },
};

export default teamApi;
