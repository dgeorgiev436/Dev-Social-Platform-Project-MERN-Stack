import React, {Fragment, useEffect} from "react"
import PropTypes from "prop-types"
import Spinner from "../Layout/Spinner"
import ProfileItem from "./ProfileItem"
import { connect } from "react-redux"
import { getProfiles } from "../../actions/profile"

const Profiles = ({ profile: {profiles, loading}, getProfiles }) => {
	
	useEffect(() => {
		
		getProfiles();
		
	}, [getProfiles])
	
	
	return(
// 		Check if the "get all profiles" action is completed
// 		If it is we render JSX elements, we loop through all profiles in the profiles state and we send each profile data through props to the ProfileItem component which we render
		<Fragment>
			{ loading ? <Spinner /> : <Fragment>
			 	<h1 className="large text-primary">Developers</h1>
				<p className="lead"><i className="fab fa-connectdevelop"></i> Browse and communicate with developers</p>
				<div className="profiles">
					{profiles.length > 0 ? (
						profiles.map(profile => {
							return <ProfileItem key={profile._id} profile={profile} />
						})
					) : <h4>No profiles found...</h4>}
				</div>
			 </Fragment> }
		</Fragment>
	)
}

const mapStateToProps = state => ({
	profile: state.profile
})

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {getProfiles})(Profiles);