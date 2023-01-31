import React from 'react'

function InputField(props) {
  return (
    <>
        <form>
            <input type="text" id={props.text} className={props.className} name={props.text} placeholder={props.text}/>
        </form>
    </>
  )
}

export default InputField