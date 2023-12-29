import Shelf from "./Shelf";

export default function Menu() {
  return (
    <div className="menu">
      <div>
        <p>The shelf is empty</p>
        <span className="close">&times;</span>
      </div>
      <Shelf className="shelf-menu" />
      <button>Add random stuff</button>
      <span>
        <input type="text"></input>
      </span>
    </div>
  );
}
