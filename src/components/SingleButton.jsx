

const SingleButton = ({cls, label,handleCalculatorButtonClick,handleCalculatorMouseDown,styles,isMouseDown}) => {
  return (
    <button className={`btn ${cls}`}  onClick={()=>handleCalculatorButtonClick(label)} onMouseDown={handleCalculatorMouseDown} style={isMouseDown===label ? styles
      :null} >{label}</button>
  )
}

export default SingleButton