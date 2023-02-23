import React from 'react'

function InputField(props) {
  return (
    <>
      <input type={props.type} id={props.name} className={props.className} name={props.name} placeholder={props.name} onChange={props.onChange} value={props.value}/>
    </>
  )
}

export default InputField