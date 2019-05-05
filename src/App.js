import React from "react";
import "./App.css";
import { Gradient } from "./Components/Gradient";
import { BoxShadow } from "./Components/BoxShadow";

function App() {
  return (
    <div className="App" style={{ marginTop: "400px" }}>
      <BoxShadow streng={17} layers={["lime", "lightgreen", "aqua"]}>
        <Gradient colors={["pink", "purple", "white", "lime", "aqua"]}>
          hola mundo
        </Gradient>
      </BoxShadow>
    </div>
  );
}

export default App;
