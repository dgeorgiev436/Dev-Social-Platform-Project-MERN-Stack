import PropTypes from "prop-types"
import {Link, withRouter} from "react-router-dom"
import { connect } from "react-redux"
import { addEducation } from "../../actions/profile"
import { Fragment, useState } from "react"


const AddEducation = ({addEducation, history}) => {
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: ""
	})
// 	This state will disable and enable to "TO" input field 
	const [toDateDisabled, setToDateDisabled] = useState(false)
	
	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
	} = formData
	
// 	Get form data with onChange listener
	const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})
	
	const onSubmitHandler = (e) => {
		e.preventDefault();
		
		addEducation(formData, history)
	}

	
	return(
		<Fragment>
			<h1 class="large text-primary">Add Your Education</h1>
		  <p class="lead">
			<i class="fas fa-code-branch"></i> Add any school or bootcamp that you have atended
		  </p>
		  <small>* = required field</small>
		  <form onSubmit={onSubmitHandler} class="form">
			<div class="form-group">
			  <input value={school} onChange={e => onChange(e)} type="text" placeholder="* School or Bootcamp" name="school" required />
			</div>
			<div class="form-group">
			  <input value={degree} onChange={e => onChange(e)} type="text" placeholder="* Degree or Certificate" name="degree" required />
			</div>
			<div class="form-group">
			  <input value={fieldofstudy} onChange={e => onChange(e)} type="text" placeholder="Field of Study" name="fieldofstudy" />
			</div>
			<div class="form-group">
			  <h4>From Date</h4>
			  <input value={from} onChange={e => onChange(e)} type="date" name="from" />
			</div>
			 <div class="form-group">
			  <p><input value={current} checked={current} onChange={e => {
						  setFormData({...formData, current: !current})
						  setToDateDisabled(!toDateDisabled)
					  }} type="checkbox" name="current" value="" />{" "} Current School</p>
			</div>
			<div class="form-group">
			  <h4>To Date</h4>
			  <input value={to} disabled={toDateDisabled ? "disabled" : ""} onChange={e => onChange(e)} type="date" name="to" />
			</div>
			<div class="form-group">
			  <textarea
				name="description"
				cols="30"
				rows="5"
				value={description}
				onChange={e => onChange(e)}
				placeholder="Program Description"
			  ></textarea>
			</div>
			<input type="submit" class="btn btn-primary my-1" />
			<Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
		  </form>
		</Fragment>
	)
}

// Adds a type to the function 
AddEducation.propTypes = ({
	addEducation: PropTypes.func.isRequired
})

export default connect(null, {addEducation} )(withRouter(AddEducation));