import PropTypes from "prop-types"
import {connect} from "react-redux"
import { getCurrentProfile, deleteAccount } from "../../actions/profile"
import { useEffect } from "react"
import Spinner from "../Layout/Spinner"
import {Fragment} from "react"
import {Link} from "react-router-dom"
import DashboardActions from "./DashboardActions"
import Experience from "./Experience"
import Education from "./Education"

// Destructure from props
const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile, loading}, deleteAccount }) => {
	
// 	Get current profile as soon as dashboard is called 
	useEffect(() => {
		
		getCurrentProfile()
		
	},[getCurrentProfile])
	
	return(
// 		conditionally render the spinner and the profile data
		loading && profile === null ? <Spinner /> : <Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead"> <i className="fas fa-user"></i> Welcome {user && user.name}</p>
			{profile !== null ? 
			<Fragment> 
				 <DashboardActions />
				 <Experience experience={profile.experience} />
				 <Education education={profile.education} />
				 <div className="my-2">
				 	<button onClick={() => deleteAccount()} className="btn btn-danger"><i className="fas fa-user-minus"></i> Delete My Account</button>
				 </div>
			 </Fragment> : 
				<Fragment>
					<p>You have not yet setup a profile, please add some info</p>
				 	<Link to="/create-profile" className="btn btn-primary my-1"> Create Profile </Link>
				 </Fragment> }
		</Fragment>
	)
}

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired
}
	
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)