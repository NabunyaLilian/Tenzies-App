import React from "react"
import Dot from "./Dot"


export default function ForthFace(){
    return(
        <div className="fourth-face dice">
            <div className="column">
                <Dot />
                <Dot />
            </div>
            <div className="column">
                <Dot />
                <Dot />
            </div>
        </div>
    )
}