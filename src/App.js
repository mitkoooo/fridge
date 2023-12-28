import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <div className="room">
        <Pinboard>The fridge</Pinboard>
        <Fridge />
        <div className="floor"></div>
      </div>
    </div>
  );
}

export default App;

function Fridge() {
  const [mainIsOpen, setMainIsOpen] = useState(false);
  const [freezerIsOpen, setFreezerIsOpen] = useState(false);
  const onMainIsOpen = (open) => setMainIsOpen(open);

  return (
    <div className="fridge">
      {mainIsOpen ? (
        <MainSection mainIsOpen={mainIsOpen} onMainIsOpen={onMainIsOpen} />
      ) : (
        <MainDoor />
      )}
      {freezerIsOpen ? <Freezer /> : <FreezerDoor />}
    </div>
  );
}

function Shelf() {
  return <div className="shelf"></div>;
}

function MainSection({ mainIsOpen, onMainIsOpen }) {
  return (
    <div className="main" onClick={() => onMainIsOpen((open) => !open)}>
      <div className="shelf"></div>
      <div className="shelf"></div>
      <div className="shelf"></div>
      <div className="shelf"></div>
      <div className="shelf"></div>
    </div>
  );
}

function Pinboard({ children }) {
  return <div className="pinboard">{children}</div>;
}

function MainDoor() {
  return (
    <div className="main-door">
      <div className="main-handle"></div>
    </div>
  );
}

function FreezerDoor() {
  return (
    <div className="freezer-door">
      <div className="freezer-handle"></div>
    </div>
  );
}

function Freezer() {
  return (
    <div className="freezer">
      <div className="shelf"></div>
      <div className="shelf"></div>
      <div className="shelf"></div>
    </div>
  );
}
