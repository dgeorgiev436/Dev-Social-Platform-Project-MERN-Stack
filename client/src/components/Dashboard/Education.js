import { connect } from "react-redux"
import PropTypes from "prop-types"
// External package Moment that helps with formatting dates as shown on line 16
import Moment from "react-moment"
import {Fragment} from "react"
import {deleteEducation} from "../../actions/profile"


// Experiences are passed from the parrent component through "props"
const Education = ({ education, deleteEducation }) => {
	
	const educations = education.map(edc => (
		<tr key={edc._id}>
			<td>{edc.school}</td>
			<td className="hide-sm">{edc.degree}</td>
			<td>
				<Moment format="YYYY/MM/DD">{edc.from}</Moment> - {edc.to === null ? (" Now") : (<Moment format="YYYY/MM/DD">{edc.to}</Moment>)}
			</td>
			<td>
				<button onClick={() => deleteEducation(edc._id)} className="btn btn-danger">Delete</button>
			</td>
		</tr>
	))
	
	return(
		<Fragment>
			<h2 className="my-2">Education Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th className="hide-sm">Degree</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	)
}


Education.propTypes = ({
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired
})

export default connect(null, {deleteEducation})(Education)