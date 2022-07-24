import React from "react"
import FifthFace from "./FifthFace"
import SecondFace from "./SecondFace"
import ThirdFace  from "./ThirdFace"
import ForthFace from "./ForthFace"
import SixthFace from "./SixthFace"
import FirstFace from "./FirstFace"



export default function Die(props){

    const style ={
        backgroundColor: props.isHeld ? "#59E391" : "orange"
    }

    //console.log(props.value)

    return(
        <div
            className="die-face" 
            style = {style}
            onClick={props.holdDice}
        >
            {props.value === 1 && <FirstFace />}
            {props.value === 2 && <SecondFace />}
            {props.value === 3 && <ThirdFace />}
            {props.value === 4 && <ForthFace />}
            {props.value === 5 && <FifthFace />}
            {props.value === 6 && <SixthFace />}
        </div>
    )
}