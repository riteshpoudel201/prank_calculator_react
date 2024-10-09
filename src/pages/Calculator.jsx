import { useEffect, useRef, useState } from "react"
import DisplayScreen from "../components/DisplayScreen"
import SingleButton from "../components/SingleButton"
import { btns } from "../lib/data"
import prankAudio from "../assets/aa.wav"

const operators = ["%", "/", "*", "-", "+"];
const invalidOperators = [".%", "./", ".*", ".-", ".+", "%.", "/.", "*.", "-.", "+."];


const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isMouseDown, setIsMouseDown] = useState();
  const [prank, setPrank] = useState(false);

  const isEventAttached = useRef(false);

  

  const audio = new Audio(prankAudio);

  const buttonAction = (value) => {
    setPrank(false);

    if (value === "AC") {
      setDisplay("");
      return;
    }
    if (value === "C") {
      setDisplay(display=>display.slice(0, -1));
      return;
    }

    if (value === "=" || value === "Enter") {
      setLastOperator("");
      const lastChar = display[display.length - 1];

      if (operators.includes(lastChar)) {
        setDisplay(display => display.slice(0, -1));
      }

      // logic to display error in case of . comes next to operator
      const errorDot = invalidOperators.map(item => display.includes(item));
      console.log("A", errorDot);
      const errorDotB = errorDot.includes(true);
      if (errorDotB) {
        setDisplay("error");
        return;
      }
      return displayTotal();
    }

    if (operators.includes(value)) {
      setLastOperator(value);
      const lastChar = display[display.length - 1];
      if (operators.includes(lastChar)) {
        setDisplay(display => display.slice(0, -1) + value);
        return;
      }
    }

    //handle the dot click

    if (value === ".") {
      const lastOperatorIndex = display.lastIndexOf(lastOperator);
      const lastNumebrSet = display.slice(lastOperatorIndex);

      console.log("Last Number Set:", lastNumebrSet);

      if (lastNumebrSet.includes(".")) return;
      if (!lastOperator && display.includes(".")) return;
    }
    setDisplay(display => display + value);
  };

  // calculate total
  const displayTotal = () => {
    const extraValue = randomValue();
    if (extraValue) {
      setPrank(true);
      audio.play();
    }
    const total = eval(display) + extraValue;
    console.log("Total: ", total);
    setDisplay(total.toString());
  };

  const randomValue = () => {
    const num = Math.round(Math.random() * 10); // 0 - 10
    return num < 4 ? num : 0;
  };

  const handleCalculatorButtonClick = value => {
    setIsMouseDown();
    console.log(value);
    buttonAction(value);
  }

  const handleCalculatorMouseDown = (value) => { setIsMouseDown(value); }

  useEffect(() => {
    // Binding keyboard with browser app
     !isEventAttached.current  && window.addEventListener("keydown", (e) => {
      console.log(e.key);
      const value = e.key;
       // Allow only calculator keys, numbers, operators, etc.
       if (!/[0-9%/*+\-.=]/.test(value) && value !== "Enter" && value !== "Backspace") {
        return;
      }
      // Handling backspace to simulate "C" button action
      if (e.key === "Backspace") {
        buttonAction("C");
      }
      else if(e.key === "Enter"){
        setLastOperator("");
      const lastChar = display[display.length - 1];

      if (operators.includes(lastChar)) {
        setDisplay(display => display.slice(0, -1));
      }

      // logic to display error in case of . comes next to operator
      const errorDot = invalidOperators.map(item => display.includes(item));
      console.log("A", errorDot);
      const errorDotB = errorDot.includes(true);
      if (errorDotB) {
        setDisplay("error");
        return;
      }
      return displayTotal();
      }
      else {
        buttonAction(value);
      }
    });
    console.log("Event attached....")
    isEventAttached.current = true;
  }, []);

  const buttonStyle = { transform: `scale(${isMouseDown ? "0.9" : "1"})`, transition: "transform 0.2s" }
  return (
    <div className="wrapper flex-center">
      <div className="calculator">
        <DisplayScreen display={display} isPrank={prank} />
        {/* <Buttons /> */}
        {btns && btns.map(
          (btn, i) => {
            return (
              <SingleButton key={i} {...btn} isMouseDown={isMouseDown} styles={buttonStyle} handleCalculatorButtonClick={handleCalculatorButtonClick} handleCalculatorMouseDown={handleCalculatorMouseDown} />
            )
          }
        )
        }
      </div>

    </div>
  )
}

export default Calculator