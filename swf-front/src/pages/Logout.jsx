import React from 'react'
import { logout, reset } from '../services/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from 'react-icons/bs'

function Logout() {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      return "error : " + message
    }

    if (user) {
      dispatch(logout())
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (

    <div>
      <Link to={"/"}>
        <BsArrowLeftShort size={30} />
      </Link>
      <div> 
        Vous êtes déconnecté.
      </div>
    </div>
  )
}

export default Logout