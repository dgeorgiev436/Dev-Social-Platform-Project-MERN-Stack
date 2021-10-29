import {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom"
import {login} from "../../actions/auth"
import {connect} from "react-redux"
import PropTypes from "prop-types"

// Destructure props within the function parameters brackets
const Login = ({ login, isAuthenticated}) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	
	const {email, password} = formData
	
	const onChangeHandler = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value })
	} 
	
	const onSubmitHandler = async(event) => {
		event.preventDefault();
		
		login(email, password)
		
	}
	
// 	Redirect if logged in
	if(isAuthenticated) {
		return <Redirect to="/dashboard"/>
	}
	
	return(
		<Fragment>
			  <h1 className="large text-primary">Sign In</h1>
			  <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account </p>
			  <form onSubmit={onSubmitHandler} className="form">
				<div className="form-group">
				  <input type="email" onChange={onChangeHandler} value={email} required placeholder="Email Address" name="email" />
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
				<input type="submit" className="btn btn-primary" value="Login" />
			  </form>
			  <p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			  </p>
		</Fragment>
	)
}

// Add to props
Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

// Get the current state to the component
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);