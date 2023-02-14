import React from 'react'
import {BsArrowLeftShort} from 'react-icons/bs'
import InputField from '../components/InputField'
import Button from '../components/Button'
import Logo from '../components/Logo'
import GoogleComp from '../components/googleComp'
import FacebookComp from '../components/facebookComp'


function Register() {
  return (
    <>
      
      <BsArrowLeftShort size={30}/>

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
            <div className="mb-5">
              <InputField name="Nom d'utilisateur" type="text" className="inputLogo utilisateur fontInter"/>
            </div>
            <div className="mb-5">
              <InputField name="Mail" type="email" className="inputLogo Email fontInter"/>
            </div>
            <div className="mb-5">
              <InputField name="Mot de passe" type="password" className="inputLogo Password fontInter"/>
            </div>
          </div>
        </div>
        <div className='right'>
          <Button className='RedToYellow fontInter button' text="Se connecter"></Button>
        </div>
    </>
  )
}

export default Register