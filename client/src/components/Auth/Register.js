import {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {setAlert} from "../../actions/alert"
import {register} from "../../actions/auth"
import PropTypes from "prop-types"

// Destructure props.setAlert
const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	})
	
	const {name, email, password, password2} = formData
	
	const onChangeHandler = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value })
	} 
	
	const onSubmitHandler = async(event) => {
		event.preventDefault();
		
		if(password !== password2){
			setAlert("Password do not match", "danger")
		}else{
			register({name, email, password})	
		}
		
		setFormData({
			name: "",
			email: "",
			password: "",
			password2: ""
		})
	}
	
	if(isAuthenticated) {
		return <Redirect to="/dashboard"/>
	}
	
	return(
		<Fragment>
			  <h1 className="large text-primary">Sign Up</h1>
			  <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
			  <form onSubmit={onSubmitHandler} className="form">
				<div className="form-group">
				  <input type="text" placeholder="Name" onChange={onChangeHandler} value={name} name="name" required />
				</div>
				<div className="form-group">
				  <input type="email" onChange={onChangeHandler} value={email} required placeholder="Email Address" name="email" />
				  <small className="form-text"
					>This site uses Gravatar so if you want a profile image, use a
					Gravatar email</small
				  >
				</div>
				<div className="form-group">
				  <input
					type="password"
					placeholder="Password"
					value={password}
					onChange={onChangeHandler}
					name="password"
					minLength="6"
				  />
				</div>
				<div className="form-group">
				  <input
					type="password"
					placeholder="Confirm Password"
					value={password2}
					onChange={onChangeHandler}
					name="password2"
					minLength="6"
				  />
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			  </form>
			  <p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			  </p>
		</Fragment>
	)
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register) ;