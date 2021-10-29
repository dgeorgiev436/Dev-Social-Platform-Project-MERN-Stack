import React, {useEffect} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Spinner from "../Layout/Spinner"
import { getGithubRepos } from "../../actions/profile"

const ProfileGithub = ({username, getGithubRepos, repos}) => {
	
	useEffect(() => {
		
		getGithubRepos(username);
		console.log(repos);
		
	}, [getGithubRepos]);
	
	return(
		<div className="profile-github">
			<h2 className="text-primary my-1">Github Repositories</h2>
			{repos === null ? <Spinner/> : (
				repos.map(repo => (
				<div className="repo bg-white p-1 my-1" key={repo._id}>
					<div>
						<h4>
							<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
								{repo.name}
							</a>
						</h4>	
						<p>{repo.description}</p>
					</div>
					<div>
						<ul>
							<li className="badge badge-primary">
								Stars: {repo.stargazers_count}
							</li>
							<li className="badge badge-dark">
								Watchers: {repo.watchers_count}
							</li>
							<li className="badge badge-light">
								Forks: {repo.forks_count}
							</li>
						</ul>
					</div>
				</div>
				))
			)}
		</div>
	)
}

const mapPropsToState = state => ({
	repos: state.profile.repos
})

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired,
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired
}

export default connect(mapPropsToState, {getGithubRepos})(ProfileGithub)