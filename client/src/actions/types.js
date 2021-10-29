// Here we store all the action string identifiers
// I prefer to store them as a variables in a single js file and export them from here
// This allows us to easely change the action identifiers in this file, without having to change them in any other file or function

export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"
export const USER_LOADED = "USER_LOADED"
export const AUTH_ERROR = "AUTH_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT = "LOGOUT"
export const GET_PROFILE = "GET_PROFILE"
export const PROFILE_ERROR = "PROFILE_ERROR"
export const CLEAR_PROFILE = "CLEAR_PROFILE"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const ACCOUNT_DELETED = "ACCOUNT_DELETED"
export const GET_PROFILES = "GET_PROFILES"
export const GET_REPOSITORIES = "GET_REPOSITORIES"
export const GET_POSTS = "GET_POSTS"
export const GET_POST = "GET_POST"
export const POST_ERROR = "POST_ERROR"
export const UPDATE_LIKES = "LIKE_POST"
export const DELETE_POST = "DELETE_POST"
export const ADD_POST = "ADD_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"
