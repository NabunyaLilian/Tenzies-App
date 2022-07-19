import React from "react"



export default function Die(props){

    const style ={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div
          style = {style}
          className="die-face"
          onClick={props.holdDice}
          >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}