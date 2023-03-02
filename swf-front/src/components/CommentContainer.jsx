import React from 'react';
import Comment from '../components/Comment'

function CommentContainer(comments){
  const listComments = comments.map(comment =>
    <Comment key={comment.id} avatar={comment.avatar} pseudo={comment.pseudo} comment={comment.text}/>
    )

    return (
      <div className='tag-container'>
        {listTags}
      </div>
    )
  }

export default CommentContainer;