import React from 'react'
import { logout, reset } from '../services/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
    <div>Logout</div>
  )
}

export default Logout