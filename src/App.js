import React from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"



export default function App(){

   const [dice, setDice] = React.useState(getNewDice())
   const [tenzies, setTenzies] = React.useState(false)
   const [rolls, setRolls] = React.useState(0)
   const [time, setTime] = React.useState("0:00")
   const [start, setStart] = React.useState(false)
   
   let timeVariable 
   let totalSeconds = 0;
   let time_value = "";
   
    function countUpTimer() {
        ++totalSeconds;
        var hour = Math.floor(totalSeconds / 3600);
        var minute = Math.floor((totalSeconds - hour * 3600) / 60);
        var seconds = totalSeconds - (hour * 3600 + minute * 60);
        time_value = minute + ":" + seconds 
        setTime(time_value)
    }
    
    React.useEffect(
        ()=>{
            if(start){
                timeVariable = setInterval(countUpTimer, 1000);
            }
            return ()=>{
                clearInterval(timeVariable)
            }
        },
        [start]
    )

    function getBestTime(time){        
        const arr = time.split(":")
        const bestTime = localStorage.getItem('bestTime');
        if(bestTime != null){
            localStorage.setItem('bestTime', Math.min(bestTime, arr[1]));
        }else{
            localStorage.setItem('bestTime', arr[1]);
        }
    }

   React.useEffect(
       ()=> {
           const anyHeld = dice.some(die=>die.isHeld)
           if(anyHeld){
                setStart(true)
           }
           const allHeld = dice.every(die=> die.isHeld)
           const firstValue = dice[0].value
           const sameValues = dice.every(die=> die.value === firstValue)
           if(allHeld && sameValues){
             console.log(time)
             getBestTime(time)
             setTenzies(true)
             setStart(false)
           }
           
        },
       [dice])


   function generateNewDie(){
       return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
   }
   
   function getNewDice(){
        const arr = []
        for(let i=0;  i < 10; i++){
            arr.push(
                generateNewDie()
            )
        }
        return arr ;
   }

   function rollDice(){
       if(tenzies){
            setDice(getNewDice())
            setTenzies(false)
            setRolls(0)
            setTime("0:00")
            clearInterval(timeVariable)
       }else{
            setRolls(preRolls => preRolls + 1)
            setDice(oldDice=> oldDice.map(die=>{
                return die.isHeld? die: generateNewDie()
            }))
       };
   }

   function holdDice(id){
       setDice(oldDice => oldDice.map(die=>{
           return die.id === id ? ({...die, isHeld: !die.isHeld}) : die
       }))

   }

    const diceElements = dice.map(die=>{
        return (
            <Die 
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={()=>holdDice(die.id)}
                />)
    })

    const best_time = localStorage.getItem('bestTime')
    const best_time_value = "0:"+ best_time

    function useWindowSize(){
        return(
            {
                width: window.screen.width,
                height: window.screen.height
            }
        )
    }
    const { width, height } = useWindowSize()

    return (
        <main>
            {tenzies && <Confetti  width={width} height={height}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <h3 className="statics">
                { best_time && <span>Best Time: {best_time_value}</span> }
                <span>Time: {time}</span>
                <span>Rolls: {rolls}</span>
            </h3>
            <div className="dice-board">
                {diceElements}
            </div>
            <button onClick={rollDice}>
                {tenzies? "New Game": "Roll"}
            </button>
        </main>)
}