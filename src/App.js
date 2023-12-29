import "./App.css";
import { useState } from "react";
import Pinboard from "./components/Pinboard";
import Menu from "./components/Menu";
import Shelf from "./components/Shelf";

function App() {
  return (
    <div className="App">
      <div className="room">
        <Pinboard>The fridge</Pinboard>
        <Fridge />
        <div className="floor"></div>
      </div>
      <Menu />
    </div>
  );
}

export default App;

function Fridge() {
  const [fridgeIsOpen, setFridgeIsOpen] = useState(false);
  const [freezerIsOpen, setFreezerIsOpen] = useState(false);

  const handleFridgeOpen = () => setFridgeIsOpen((open) => !open);
  const handleFreezerOpen = () => setFreezerIsOpen((open) => !open);

  return (
    <div className="fridge">
      {fridgeIsOpen ? (
        <FridgeOnlySection onFridgeIsOpen={handleFridgeOpen} />
      ) : (
        <FridgeDoor onFridgeIsOpen={handleFridgeOpen} />
      )}
      {freezerIsOpen ? (
        <Freezer onFreezerIsOpen={handleFreezerOpen} />
      ) : (
        <FreezerDoor onFreezerIsOpen={handleFreezerOpen} />
      )}
    </div>
  );
}

function FridgeOnlySection({ onFridgeIsOpen }) {
  const [fridgeItems, setFridgeItems] = useState([]);
  return (
    <>
      <div className="fridge-only">
        <Shelf />
        <Shelf />
        <Shelf />
        <Shelf />
        <Shelf />
      </div>
      <div className="fridge-door-opened" onClick={onFridgeIsOpen}>
        <div className="shelf"></div>
        <div className="shelf"></div>
        <div className="big-shelf"></div>
      </div>
    </>
  );
}

function FridgeDoor({ onFridgeIsOpen }) {
  return (
    <div className="fridge-door">
      <div className="fridge-handle" onClick={onFridgeIsOpen}></div>
    </div>
  );
}

function FreezerDoor({ onFreezerIsOpen }) {
  return (
    <div className="freezer-door">
      <div className="freezer-handle" onClick={onFreezerIsOpen}></div>
    </div>
  );
}

function Freezer({ onFreezerIsOpen }) {
  return (
    <>
      <div className="freezer">
        <div className="shelf"></div>
        <div className="shelf"></div>
        <div className="shelf"></div>
      </div>
      <div className="freezer-door-opened" onClick={onFreezerIsOpen}></div>
    </>
  );
}
