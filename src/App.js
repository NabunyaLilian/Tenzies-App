import React from "react"
import Die from "./Die"




export default function App(){

   const [dice, setDice] = React.useState(getNewDice())

   
   function getNewDice(){
        const arr = []
        for(let i=0;  i < 10; i++){
            arr.push(
                {
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: i
                }
            )
        }
        return arr ;
   }

   function rollDice(){
       setDice(getNewDice());
   }

   function holdDice(id){
       setDice(oldDice => oldDice.map(die=>{
           return die.id === id ? ({...die, isHeld: !die.isHeld}) : die
       }))
   }

    const diceElements = dice.map(die=>{
        return (<Die value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)
    })

    return (
    <main>
        <div className="dice-board">
          {diceElements}
        </div>
        <button onClick={rollDice}>Roll</button>
    </main>)
}