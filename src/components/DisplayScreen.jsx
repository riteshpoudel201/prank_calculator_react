
const DisplayScreen = ({display,isPrank}) => {
  return (
    <div className={`display orbitron ${isPrank ? "prank" : ""}`} >
      <input className="orbitron" type="text" value={display || "0.0" } style={{width:"100%",height:"100%",background:"transparent",outline:"none",border:"none",fontSize:"32px",textAlign:"right", color:`${isPrank ? "white" : "black"}`}} readOnly/>
     
      
    </div>
  )
}

export default DisplayScreen