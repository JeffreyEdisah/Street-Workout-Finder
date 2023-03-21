import React from 'react'
import {BsArrowLeftShort} from 'react-icons/bs'
import InputField from '../components/InputField'
import Button from '../components/Button'
import Logo from '../components/Logo'
import GoogleComp from '../components/googleComp'
import FacebookComp from '../components/facebookComp'
import { register, reset } from '../services/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      return "error : " + message
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
    }

    dispatch(register(userData))
  }

  if (isLoading) {
    return "wait..."
  }


  return (
    <>
      
      <Link to={"/"}>
        <BsArrowLeftShort size={30} />
      </Link>

      <div className='center mt-15 mb-7'>

        <Logo />
        
        <div className="p-10 mb-10">

          <div className='mb-10 mt-10 left'>S'inscrire à l'aide de : </div>
            <div className='p-10 mb-10 gridAuthGandF'>

            <div className="mt-5">
              <GoogleComp/>
            </div>

            <div className="">
              <FacebookComp />
            </div>

          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <InputField name="name" type="text" className="inputLogo utilisateur fontInter" value={name} onChange={onChange}/>
            </div>
            <div className="mb-5">
              <InputField name="email" type="email" className="inputLogo Email fontInter" value={email} onChange={onChange}/>
            </div>
            <div className="mb-5">
              <InputField name="password" type="password" className="inputLogo Password fontInter" value={password} onChange={onChange}/>
            </div>
            <div className='right'>
              <Button className='RedToYellow fontInter button' text="S'inscrire"></Button>
            </div>
          </form>
          </div>
        </div>
    </>
  )
}

export default Register