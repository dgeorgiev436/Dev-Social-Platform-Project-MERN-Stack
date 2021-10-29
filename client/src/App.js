import './App.css';
import Navbar from "./components/Layout/Navbar"
import Landing from "./components/Layout/Landing"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Alert from "./components/Layout/Alert"
import CreateProfile from "./components/Profile-forms/CreateProfile"
import EditProfile from "./components/Profile-forms/EditProfile"
import Dashboard from "./components/Dashboard/Dashboard"
import AddExperience from "./components/Profile-forms/AddExperience"
import AddEducation from "./components/Profile-forms/AddEducation"
import Profiles from "./components/Profiles/Profiles"
import Profile from "./components/Profile/Profile"
import Posts from "./components/Posts/Posts"
import Post from "./components/Post/Post"
import PrivateRoute from "./components/Routing/PrivateRoute"
import {Fragment, useEffect} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom" 
// REDUX
import {Provider} from "react-redux"
import store from "./store"
import {loadUser} from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"

if(localStorage.token){
	setAuthToken(localStorage.token)
}

const App = () => {
	
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])
	
  return ( 
	<Provider store={store}>
		<Router>
			<Fragment>
				<Navbar />
				<Route exact path="/" component={Landing}/>
				<section className="container">
					<Alert />
					<Switch>
						<Route exact path="/register" component={Register}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/profiles" component={Profiles}/>
						<Route exact path="/profile/:id" component={Profile}/>
						<PrivateRoute exact path="/create-profile" component={CreateProfile}/>
						<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/add-experience" component={AddExperience} />
						<PrivateRoute exact path="/add-education" component={AddEducation} />
						<PrivateRoute exact path="/posts" component={Posts} />
						<PrivateRoute exact path="/posts/:id" component={Post} />
					</Switch>
				</section>
			</Fragment>
		</Router>
	</Provider>
	  
	  
	)
}

export default App;
