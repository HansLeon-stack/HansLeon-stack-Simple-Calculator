import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Support from "./components/support";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const ops = ["/", "*", "+", "-"];

  const updateCalc = (value) => {
    if (calc === "0" && value !== "0") {
      setCalc(value);
    }
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const handleClear = () => {
    setCalc("");
    setResult("");
  };

  const handleDelete = () => {
    if (calc !== "") {
      setCalc(calc.slice(0, -1));
    }
  };

  const handleEquals = () => {
    console.log(calc);
    if (calc == "" || ops.includes(calc.slice(-1))) {
      console.log("Err");
      return;
    }

    try {
      if (/\d+\/0/.test(calc)) {
        setResult("Err");
        setCalc("Err");
        return;
      }
      const resultValue = eval(calc).toString();
      setCalc(resultValue);
      setHistory([resultValue, ...history]);
      setResult(resultValue);
    } catch (error) {
      alert("Error: Calculation Failed");
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="calculator">
              <div className="display">
                <div className="history">
                  {history.map((entry, index) => (
                    <div key={index}>{entry}</div>
                  ))}
                </div>
                <div className="current-calc">{calc || "0"}</div>
              </div>

              <div className="Row">
                <button onClick={handleClear}>C</button>
                <button onClick={handleDelete}>DEL</button>
                <Link to="/support">
                  <button className="Brown">?</button>
                </Link>
                <button className="Orange" onClick={() => updateCalc("/")}>
                  /
                </button>
              </div>

              <div className="Row">
                <button onClick={() => updateCalc("1")}>1</button>
                <button onClick={() => updateCalc("2")}>2</button>
                <button onClick={() => updateCalc("3")}>3</button>
                <button className="Orange" onClick={() => updateCalc("*")}>
                  x
                </button>
              </div>

              <div className="Row">
                <button onClick={() => updateCalc("4")}>4</button>
                <button onClick={() => updateCalc("5")}>5</button>
                <button onClick={() => updateCalc("6")}>6</button>
                <button className="Orange" onClick={() => updateCalc("-")}>
                  -
                </button>
              </div>

              <div className="Row">
                <button onClick={() => updateCalc("7")}>7</button>
                <button onClick={() => updateCalc("8")}>8</button>
                <button onClick={() => updateCalc("9")}>9</button>
                <button className="Orange" onClick={() => updateCalc("+")}>
                  +
                </button>
              </div>

              <div className="RowBottom">
                <button onClick={() => updateCalc("0")}>0</button>
                <button className="Orange" onClick={handleEquals}>
                  =
                </button>
              </div>
            </div>
          }
        />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  );
}

export default App;
