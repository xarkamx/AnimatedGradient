import React from "react";
import "./App.css";
import { Paralax } from "./Components/Paralax";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Paralax
        layers={[
          {
            path: "https://wallpaperplay.com/walls/full/9/5/9/212899.jpg",
            deep: 150,
            scale: 1.3,
            filter: "blur(5px)"
          },
          {
            path: "https://storage.googleapis.com/kapwing/Rain-wocDHnOT7.gif",
            deep: 50,
            scale: 1,
            filter: "blur(4px )",
            mixBlendMode: "overlay"
          },
          {
            path:
              "http://pngriver.com/wp-content/uploads/2018/04/Download-Fantasy-PNG-Image.png",
            deep: 50,
            scale: 1,
            mixBlendMode: "soft-light",
            filter: "drop-shadow(4px 4px 6px)"
          },

          {
            path: "http://rainwifi.ru/img/rain_tr_wt.gif",
            deep: 100,
            scale: 1
          }
        ]}
      />{" "}
    </div>
  );
}

export default App;
