import React from 'react';
import Comment from '../components/Comment'

function CommentContainer(){

    return (
      <div className='comment-container'>
        <Comment pseudo = "pseudo" comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula est malesuada lectus semper imperdiet. Sed auctor dui id consequat ultricies. Mauris luctus tortor nisl, vitae porta risus tincidunt sit. " />
        <Comment pseudo = "pseudo" comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula est malesuada lectus semper imperdiet. Sed auctor dui id consequat ultricies. Mauris luctus tortor nisl, vitae porta risus tincidunt sit. " />
        <Comment pseudo = "pseudo" comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula est malesuada lectus semper imperdiet. Sed auctor dui id consequat ultricies. Mauris luctus tortor nisl, vitae porta risus tincidunt sit. " />
      </div>
    )
  }

export default CommentContainer;