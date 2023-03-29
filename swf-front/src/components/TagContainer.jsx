import React from 'react';
import Tag from '../components/Tag'

function TagContainer() {

  return (
    <div className='tag-container'>
      <Tag equipement="barre de traction" color= {"#699BF7"} />
      <Tag equipement="barres parallèles" color= {"#00BC29"} />
      <Tag equipement="machine de squat" color= {"#CE9400"} />
      <Tag equipement="banc abdominaux" color= {"#CF0AD3"} />
      <Tag equipement="machine obliques" color= {"#E6C79C"} />
      <Tag equipement="banc lombaires" color= {"#DC9596"} />
    </div>
  )
}

export default TagContainer;