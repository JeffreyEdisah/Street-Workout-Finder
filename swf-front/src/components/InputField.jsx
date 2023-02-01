import React from 'react'

function InputField(props) {
  return (
    <>
        <form>
            <input type={props.type} id={props.name} className={props.className} name={props.name} placeholder={props.name}/>
        </form>
    </>
  )
}

export default InputField