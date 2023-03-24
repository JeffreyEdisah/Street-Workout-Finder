import React from 'react'
import InputField from '../components/InputField'
import { BsArrowLeftShort } from 'react-icons/bs'
import Button from '../components/Button'
import Logo from '../components/Logo'
import GoogleComp from '../components/googleComp'
import FacebookComp from '../components/facebookComp'
import { login, reset } from '../services/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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
      navigate(0)
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
      email,
      password,
    }

    dispatch(login(userData))
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

          <div className='mb-10 mt-10 left'>Se connecter à l'aide de : </div>
          <div className='p-10 mb-10 gridAuthGandF'>

            <div className="mt-5">
              <Link to={"http://localhost:5000/api/users/auth/google"}>
                <GoogleComp />
              </Link>
            </div>

            <div className="">
              <FacebookComp />
            </div>

          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <InputField name="email" type="email" className="inputLogo Email fontInter" value={email} onChange={onChange} />
            </div>
            <div className="mb-5">
              <InputField name="password" type="password" className="inputLogo Password fontInter" value={password} onChange={onChange} />
            </div>
            <div className='right'>
              <Button className='RedToYellow fontInter button' text="Se connecter" type="submit"></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login