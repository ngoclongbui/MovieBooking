export const METHOD = {
  PUT: "PUT",
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
};

export const STATUS_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SEVER_ERROR: 500,
};

export const DOMAIN = "http://movieapi.cyberlearn.vn/";

export const GROUP = "GP01";

export const KEY = "Bearer ";

export const TOKEN = "token_bk";

export const USER_INFO = "user_info_bk";

export const PAGES = {
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
  NEWS: "news",
  CONTACT: "contact",
  PROFILE: "profile",
  DETAIL: "detail",
  CHECK_OUT: "checkOut",
  ADMIN: "/admin",
  LIST_FILMS: "/admin/film/listFilms",
  ADD_NEW: "/admin/film/addNew",
  EDIT_FILM: "/admin/film/editFilm",
  DETAIL_FILM: "/admin/film/detail",
  SHOWTIME: "/admin/film/showtime",
  LIST_USERS: "/admin/users/listUsers",
  EDIT_USER: "/admin/users/editUser",
  DETAIL_USER: "/admin/users/detail",
  INDEX: "/",
  ERROR: "*",
};

export const NAVIGATE = {
  GO_BACK: -1,
  GO_BACK_TWO: -2,
  GO_FORWARD: 1,
  GO_FORWARD_TWO: 2,
};

export const NOTIFY_TYPE = {
  SUCCESS: "success",
  INFO: "info",
  ERROR: "error",
};
