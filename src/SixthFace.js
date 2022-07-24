import React from "react"
import Dot from "./Dot"


export default function SixthFace(){
    return(
        <div className="dice sixth-face">
        <div className="column">
            <Dot />
            <Dot />
            <Dot />
        </div>
        <div className="column">
            <Dot />
            <Dot />
            <Dot />
        </div>
    </div>
    )
}