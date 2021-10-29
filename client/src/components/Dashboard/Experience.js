import { connect } from "react-redux"
import PropTypes from "prop-types"
// External package Moment that helps with formatting dates as shown on line 16
import Moment from "react-moment"
import {Fragment} from "react"
import { deleteExperience } from "../../actions/profile"


// Experiences are passed from the parrent component through "props"
const Experience = ({ experience, deleteExperience }) => {
	
	const experiences = experience.map(exp => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className="hide-sm">{exp.title}</td>
			<td>
				<Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? (" Now") : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
			</td>
			<td>
				<button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
			</td>
		</tr>
	))
	
	return(
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	)
}


Experience.propTypes = ({
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired
})

export default connect(null, {deleteExperience})(Experience)