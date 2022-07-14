import { API, ROOT_URL } from 'constant/api';
import { rest } from 'msw';
import { getResonseWithData } from 'mocks/mockUtils';
import { userList } from './usersList';
import { myPosts } from './myPosts';
import { userDetail } from './userDetail';

const USER = [
  // GET_USER_LIST
  rest.get(ROOT_URL + API.USER.LIST, (req, res, ctx) => {
    const lastPage = Number(req.url.searchParams.get('lastPage'));
    if (lastPage >= 2) {
      return res(ctx.status(200), ctx.json(getResonseWithData(userList)));
    }
    return res(ctx.status(200), ctx.json(getResonseWithData(userList)));
  }),
  // GET_USER_LIKES
  rest.get(ROOT_URL + API.USER.LIKES, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userList)));
  }),
  // GET_USER_READS
  rest.get(ROOT_URL + API.USER.READS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userList)));
  }),
  // GET_MY_POSTS
  rest.get(ROOT_URL + API.USER.MYPOSTS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(myPosts)));
  }),
  // GET_USER_DETAIL
  rest.get(`${ROOT_URL + API.USER.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userDetail)));
  }),
  // EDIT_USER_PROFILE
  rest.patch(`${ROOT_URL + API.USER.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userDetail)));
  }),
];

export default USER;