import React from 'react'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import { useSelector, useDispatch } from 'react-redux'
import InputField from '../components/InputField'
import { useNavigate } from 'react-router-dom'
import { addLocationWithcoordinates, reset } from '../services/auth/authSlice'

function AddLocation() {

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const { name, description } = formData

  const { locationData, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (isError) {
      return "error : " + message
    }

    if (isSuccess || locationData) {
      navigate('/')
      navigate(0)
    }

    dispatch(reset())
  }, [locationData, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()


    navigator.geolocation.getCurrentPosition(async (position) => {
      const longitude = position.coords.longitude
      const latitude = position.coords.latitude

      const locationData = {
        name: name,
        longitude: longitude,
        latitude: latitude,
      }

      dispatch(addLocationWithcoordinates(locationData))

    })}

  return (
    <div>
      <div className="p-10 mb-10">
        <div className='mb-10 mt-10 left'>Ajoutez un nouvel emplacement ? </div>
      </div>
      <form className="center" onSubmit={onSubmit}>
        <div className="mb-5">
          <InputField name="name" type="text" className="inputLogo fontInter" value={name} onChange={onChange} />
        </div>
        <div className="mb-5">
          <InputField name="description" type="text" className="inputLogo fontInter" value={description} onChange={onChange} />
        </div>
        <div className="mb-10 mt-10 left">
          <div className='right'>
            <Button className='RedToYellow fontInter button' text="Ajouter un lieu" type="submit"></Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddLocation;
