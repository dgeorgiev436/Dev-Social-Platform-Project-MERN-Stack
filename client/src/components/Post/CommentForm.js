import React, {useState} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {addComment} from "../../actions/post"


const CommentForm = ({addComment, postId }) => {
	
	const [text, setText] = useState("")
	
	const onSubmitHandler = (e) => {
		e.preventDefault()
		addComment(postId, {text})
		setText("")
	}
	
	const onChangeHandler = (e) => {
		setText(e.target.value)
	}
	
	return(
		<div class="post-form">
			<div class="bg-primary p">
			  <h3>Leave a Comment</h3>
			</div>
			<form onSubmit={onSubmitHandler} class="form my-1">
			  <textarea
				name="text"
				cols="30"
				rows="5"
				placeholder="Enter your comment"
				value={text}
				onChange={onChangeHandler}
				required
			  ></textarea>
			  <input type="submit" class="btn btn-dark my-1" value="Submit" />
			</form>
      	</div>
	)
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm)