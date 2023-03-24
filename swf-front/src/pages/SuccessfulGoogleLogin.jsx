import React from 'react'
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from 'react-icons/bs'
import Button from '../components/Button'


function SuccessfulGoogleLogin() {

    function findGetParameter(parameterName) {
        let result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }


    localStorage.setItem("user", `{"_id": "${findGetParameter("id")}","name":"${findGetParameter("name")}","email":"${findGetParameter("email")}","token":"${findGetParameter("token")}"}`)
    localStorage.setItem("token", findGetParameter("token"))
    findGetParameter("token");

    return (
        <>
            <Link to={"/"}>
                <BsArrowLeftShort size={30} />
            </Link>

            <div className='center mt-15 mb-7'>
                <div>
                    Bonjour {findGetParameter("name")} !
                </div>
                <br/>
                <br/>
                <Link to={"/"}>
                    <Button className='RedToYellow fontInter button' text="Retour à la carte" type="submit"></Button>
                </Link>
            </div>
        </>

    )
}

export default SuccessfulGoogleLogin