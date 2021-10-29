import React, {Fragment, useEffect} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import Spinner from "../Layout/Spinner"
import {getPosts} from "../../actions/post"
import PostItem from "./PostItem"
import PostForm from "./PostForm"


const Posts = ({ post: {posts, loading} , getPosts }) => {
	
	useEffect( () => {
		getPosts();
		
	}, [getPosts] )
	
// 	Map through all posts and send data to the PostItem component via props
	return loading ? <Spinner /> : <Fragment>
		<h1 className="large text-primary">Posts</h1>
		<p className="lead"> <i className="fas fa-user"></i> Welcome to the community</p>
		<PostForm />
		<div className="posts">
			{posts.map(post => (
				<PostItem key={post._id} post={post} />
			))}
		</div>
	</Fragment>
	
}

const mapStateToProps = state => ({
	post: state.post
})

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {getPosts} )(Posts);