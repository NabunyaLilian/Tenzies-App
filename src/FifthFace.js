import React from "react"
import Dot from "./Dot"



export default function FifthFace(){
    return(
        <div className="fifth-face dice">
            <div className="column">
                <Dot />
                <Dot />
            </div>
            
            <div className="column">
                <Dot />
            </div>
            
            <div className="column">
                <Dot />
                <Dot />
            </div>
        </div>
    )
}