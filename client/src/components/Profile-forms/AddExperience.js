import PropTypes from "prop-types"
import {Link, withRouter} from "react-router-dom"
import { connect } from "react-redux"
import { addExperience } from "../../actions/profile"
import { Fragment, useState } from "react"


const AddExperience = ({addExperience, history}) => {
	const [formData, setFormData] = useState({
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: ""
	})
// 	This state will disable and enable to "TO" input field 
	const [toDateDisabled, setToDateDisabled] = useState(false)
	
	const {
		company,
		title,
		location,
		from,
		to,
		current,
		description
	} = formData
	
// 	Get form data with onChange listener
	const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})
	
	const onSubmitHandler = (e) => {
		e.preventDefault();
		
		addExperience(formData, history)
	}

	
	return(
		<Fragment>
			<h1 class="large text-primary">Add An Experience</h1>
		  <p class="lead">
			<i class="fas fa-code-branch"></i> Add any developer/programming
			positions that you have had in the past
		  </p>
		  <small>* = required field</small>
		  <form onSubmit={onSubmitHandler} class="form">
			<div class="form-group">
			  <input value={title} onChange={e => onChange(e)} type="text" placeholder="* Job Title" name="title" required />
			</div>
			<div class="form-group">
			  <input value={company} onChange={e => onChange(e)} type="text" placeholder="* Company" name="company" required />
			</div>
			<div class="form-group">
			  <input value={location} onChange={e => onChange(e)} type="text" placeholder="Location" name="location" />
			</div>
			<div class="form-group">
			  <h4>From Date</h4>
			  <input value={from} onChange={e => onChange(e)} type="date" name="from" />
			</div>
			 <div class="form-group">
			  <p><input value={current} checked={current} onChange={e => {
						  setFormData({...formData, current: !current})
						  setToDateDisabled(!toDateDisabled)
					  }} type="checkbox" name="current" value="" />{" "} Current Job</p>
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
				placeholder="Job Description"
			  ></textarea>
			</div>
			<input type="submit" class="btn btn-primary my-1" />
			<Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
		  </form>
		</Fragment>
	)
}

// Adds a type to the function 
AddExperience.propTypes = ({
	addExperience: PropTypes.func.isRequired
})

export default connect(null, {addExperience} )(withRouter(AddExperience));

