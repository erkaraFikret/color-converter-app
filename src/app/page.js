"use client";

import React, { useEffect, useState } from "react";
import "./app.css";

const Home = () => {
  const [rgb, setRgb] = useState({ r: 255, g: 103, b: 87 });
  const [hex, setHex] = useState("#ff6757");

  const handleRgbChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = Number(value);

    setRgb({
      ...rgb,
      [name]: isNaN(parsedValue) ? 0 : Math.max(0, Math.min(255, parsedValue)), 
    });
  };

  const handleHexChange = (e) => {
    const input = e.target.value;
    setHex(input.startsWith("#") ? input : `#${input}`); 
  };

  const rgbToHex = (r, g, b) => {
    const clamp = (value) => Math.max(0, Math.min(255, value)); 
    const red = clamp(r).toString(16).padStart(2, "0");
    const green = clamp(g).toString(16).padStart(2, "0");
    const blue = clamp(b).toString(16).padStart(2, "0");

    return `#${red}${green}${blue}`;
  };

  const hexToRgb = (hex) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      return { r: 0, g: 0, b: 0 }; 
    }

    const cleanedHex = hex.replace("#", "");
    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);

    return { r, g, b };
  };

  useEffect(() => {
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [rgb]);

  useEffect(() => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setRgb(hexToRgb(hex));
    }
  }, [hex]);

  return (
    <div className="app">
      <div className="converter">
        <h1>Color Converter</h1>
        <div className="rgb-section">
          <h2>RGB</h2>
          <div className="input-groups">
            <div className="input-group">
              <label>R:</label>
              <input type="number" name="r" min="0" max="255" value={rgb.r} onChange={handleRgbChange}/>
            </div>
            <div className="input-group">
              <label>G:</label>
              <input type="number" name="g" min="0" max="255" value={rgb.g} onChange={handleRgbChange}/>
            </div>
            <div className="input-group">
              <label>B:</label>
              <input type="number" name="b" min="0" max="255" value={rgb.b} onChange={handleRgbChange} />
            </div>
          </div>
        </div>
        <div className="hex-section">
          <h2>HEX</h2>
          <input type="text" maxLength={7} value={hex} onChange={handleHexChange}/>
        </div>
      </div>
      <div className="color-preview" style={{ backgroundColor: hex }}></div>
    </div>
  );
};

export default Home;
