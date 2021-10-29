import React, {Fragment, useEffect} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { getPost, deleteComment } from "../../actions/post"
import Spinner from "../Layout/Spinner"
import PostItem from "../Posts/PostItem"
import {Link} from "react-router-dom"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"


const Post = ({ getPost, match, post: {post, loading} }) => {
	
	useEffect(() => {
		getPost(match.params.id)
		
	}, [getPost])
// 	If post exists and loading is done render the PostItem component and send the post data and set showActions to false
// 	the props showActions is used in the postItem component to conditionally render parts of the component
// 	We loop through the post comments and render a CommentItem component for each comment
// 	We send props with comment data and postId to each CommentItem component
	return loading || post === null ? <Spinner /> : (
		<Fragment>
			<Link className="btn" to="/posts">Back To Posts</Link>
			<PostItem post = {post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className="comments">
				{post.comments.map(comment => (
					<CommentItem key={comment._id} comment={comment} postId={post._id}/>	
				))}
			</div>
		</Fragment>
	)}

const mapStateToProps = state => ({
	post: state.post
})

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
}


export default connect(mapStateToProps, {getPost})(Post)