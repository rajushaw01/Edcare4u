import { useState } from "react";

export default function CalculatorWidget({ onClose }) {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  }

  function inputDot() {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function clear() {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  function performOperation(nextOperator) {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      let result;
      switch (operator) {
        case "+":
          result = prevValue + inputValue;
          break;
        case "-":
          result = prevValue - inputValue;
          break;
        case "*":
          result = prevValue * inputValue;
          break;
        case "/":
          result = inputValue !== 0 ? prevValue / inputValue : "Error";
          break;
        default:
          result = inputValue;
      }
      setDisplay(String(result));
      setPrevValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }

  function equals() {
    performOperation(null);
  }

  const buttons = [
    [
      { label: "C", action: clear, type: "clear" },
      { label: "/", action: () => performOperation("/"), type: "operator" },
      { label: "*", action: () => performOperation("*"), type: "operator" },
      { label: "-", action: () => performOperation("-"), type: "operator" },
    ],
    [
      { label: "7", action: () => inputDigit(7), type: "digit" },
      { label: "8", action: () => inputDigit(8), type: "digit" },
      { label: "9", action: () => inputDigit(9), type: "digit" },
      { label: "+", action: () => performOperation("+"), type: "operator" },
    ],
    [
      { label: "4", action: () => inputDigit(4), type: "digit" },
      { label: "5", action: () => inputDigit(5), type: "digit" },
      { label: "6", action: () => inputDigit(6), type: "digit" },
      { label: "=", action: equals, type: "equals" },
    ],
    [
      { label: "1", action: () => inputDigit(1), type: "digit" },
      { label: "2", action: () => inputDigit(2), type: "digit" },
      { label: "3", action: () => inputDigit(3), type: "digit" },
      { label: ".", action: inputDot, type: "digit" },
    ],
    [
      { label: "0", action: () => inputDigit(0), type: "digit", span: 2 },
    ],
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 w-64">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Calculator
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="px-3 py-3">
        <div className="bg-gray-800 rounded-lg px-3 py-2 mb-3 text-right">
          <span className="text-white text-lg font-mono font-semibold truncate block">
            {display}
          </span>
        </div>

        <div className="space-y-1.5">
          {buttons.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  className={`h-10 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    btn.type === "operator"
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : btn.type === "equals"
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : btn.type === "clear"
                      ? "bg-red-600 hover:bg-red-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  } ${btn.span === 2 ? "flex-[2]" : "flex-1"}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
