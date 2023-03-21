import React from 'react';
import Tag from '../components/Tag'

function TagContainer(tags) {
  const listTags = tags.map(tag =>
    <Tag key={tag.id} equipement={tag.name} />
  )

  return (
    <div className='tag-container'>
      {listTags}
    </div>
  )
}

export default TagContainer;