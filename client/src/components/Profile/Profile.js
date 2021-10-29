import React, { Fragment, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getProfileById } from "../../actions/profile"
import Spinner from "../Layout/Spinner"
import { Link } from "react-router-dom"
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEducation"
import ProfileGithub from "./ProfileGithub"


// In React we use props.match.params.paramName to get the parameters in the URI
const Profile = ({profile: {profile, loading}, match, auth, getProfileById }) => {
	
	useEffect(() => {
		
		getProfileById(match.params.id);
		
	}, [getProfileById, match.params.id])
	
// 	Conditionally render Spinner or Fragment based on the profile state
// 	Conditionally render a Edit Profile button if the logged in user is viewing his own profile
// 	Render The ProfileTop component and pass the profile data via props
// 	Map through experience array and for each experience render ProfileExperience component
// 	Pass experience data to ProfileExperience component through props
	return(
		<Fragment>
			{profile === null || loading ? <Spinner /> : <Fragment>
				 Profile
				 <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
				 {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)}
				 <div class="profile-grid my-1">
					 <ProfileTop profile={profile}/>
					 <ProfileAbout profile={profile}/>
					 <div className="profile-exp bg-white p-2">
						<h2 className="text-primary">Experience</h2>
					 	{profile.experience.length > 0 ? (<Fragment>
							{profile.experience.map(experience => <ProfileExperience key={experience._id} experience={experience} />)}
						</Fragment>) : (<h4>No experience credentials</h4>)}
					 </div>
					 <div className="profile-edu bg-white p-2">
						<h2 className="text-primary">Education</h2>
					 	{profile.education.length > 0 ? (<Fragment>
							{profile.education.map(education => <ProfileEducation key={education._id} education={education} />)}
						</Fragment>) : (<h4>No education credentials</h4>)}
					 </div>
					 
					 {profile.githubusername && (
					 	<ProfileGithub username={profile.githubusername}/>
					 )}
				 </div>
			</Fragment>}
		</Fragment>
	)
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
})

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getProfileById })(Profile)