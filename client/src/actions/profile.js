import axios from "axios"
import {setAlert} from "./alert"
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES, GET_REPOSITORIES} from "./types"

// GET CURRENT USERS PROFILE
export const getCurrentProfile = () => async dispatch => {
	
	try{
		const res = await axios.get("/api/profile/me")
// 		Send the profile data to the state
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
		
	}catch(err){
// 		if there is error, send erorr message and status code to the state
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// GET ALL PROFILES
export const getProfiles = () => async dispatch => {

	dispatch({
		type: CLEAR_PROFILE
	})
	
	try{
		const res = await axios.get("/api/profile");
		
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		})
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// GET profile by ID 
export const getProfileById = (userId) => async dispatch => {
	
	try{
		const res = await axios.get(`/api/profile/user/${userId}`);
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
		
		
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// GET GITHUB REPOSITORIES
export const getGithubRepos = (username) => async dispatch => {
	
	try{
		const res = await axios.get(`/api/profile/github/${username}`);
		
		dispatch({
			type: GET_REPOSITORIES,
			payload: res.data
		})
		
		
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}


// Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
	
	try{
// 		Send POST requrest to the api end point
		const res = await axios.post("/api/profile", formData);
// 		Send data to the reducer
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert(edit ? "Profile updated": "Profile created", "success"));
		
	
		history.push("/dashboard")
		
		
	}catch(err){
		
		const errors = err.response.data.errors;
		
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
		}
		
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// ADD EXPERIENCE
export const addExperience = (formData, history) => async dispatch => {
	
		try{
		
// 		Send a PUT requrest to the api end point
		const res = await axios.put("/api/profile/experience", formData);
// 		Send data to the reducer
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert("Experience Added", "success"));
		
	
		history.push("/dashboard")
		
		
	}catch(err){
		
		const errors = err.response.data.errors;
		
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
		}
		
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
	
}

// ADD Education
export const addEducation= (formData, history) => async dispatch => {
	
		try{
		
// 		Send a PUT requrest to the api end point
		const res = await axios.put("/api/profile/education", formData);
// 		Send data to the reducer
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert("Education Added", "success"));
		
	
		history.push("/dashboard")
		
		
	}catch(err){
		
		const errors = err.response.data.errors;
		
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
		}
		
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
	
}

// DELETE EXPERIENCE
export const deleteExperience = (id) => async dispatch => {
	
	try{
		const res = await axios.delete(`/api/profile/experience/${id}`)
		
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		})
		
		dispatch(setAlert("Experience Removed", "success"));
		
	}catch(err){
		
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// DELETE EDUCATION
export const deleteEducation = (id) => async dispatch => {
	
	try{
		const res = await axios.delete(`/api/profile/education/${id}`)
		
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		})
		
		dispatch(setAlert("Education Removed", "success"));
		
	}catch(err){
		
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// DELETE ACCOUNT AND PROFILE
export const deleteAccount = () => async dispatch => {
// 	Ask the user for confirmation before deleting account
	if(window.confirm("Are you sure? This can not be undone!")){
		
		try{
			await axios.delete("api/profile")

			dispatch({
				type: CLEAR_PROFILE
			})
			dispatch({
				type: ACCOUNT_DELETED
			})

			dispatch(setAlert("Your account has been permanently deleted", "success"));

		}catch(err){

			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		}	
		
	}
}





