export default function Shelf({ onMenuIsOpen, onMenuShelf, shelf, menuShelf }) {
  return (
    <div
      className={`shelf${shelf?.bigShelf ? "-big" : ""}${
        shelf?.bottomShelf ? "-bottom" : ""
      }`}
      onClick={(e) => {
        onMenuShelf(shelf.shelfId);
        if (e.target.parentElement.className === "menu") return;

        if (menuShelf === shelf.shelfId) onMenuIsOpen((open) => !open);
      }}
    >
      {shelf?.items.map((item) => (
        <img className="shelf-item" src={item.url} alt={item.name} />
      ))}
    </div>
  );
}
