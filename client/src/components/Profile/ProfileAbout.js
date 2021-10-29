import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"


const ProfileAbout = ({profile: {bio, skills, user: {name} }}) => {
	
// 	Check if profile has a bio and display only first name
// 	Map through all skills to display them in saparate divs
	return(
		 <div class="profile-about bg-light p-2">
			
		  {bio && 
		   <Fragment> 
			 <h2 class="text-primary">{name.trim().split(" ")[0]}'s bio</h2>
			 <p>{bio}</p>
			 <div class="line"></div>
		   </Fragment>}
			
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
			{skills.map((skill, index) => <div key={index } class="p-1"><i class="fa fa-check"></i> {skill}</div>)}
          </div>
        </div>
	)
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
}

export default connect()(ProfileAbout)