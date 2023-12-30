import Shelf from "./Shelf";
import { useState } from "react";

export default function Menu({
  onMenuIsOpen,
  fridgeItems,
  menuShelf,
  onMenuShelf,
  onAddItem,
  onRemoveItem,
}) {
  const [input, setInput] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="menu">
      <div>
        <span className="close" onClick={() => onMenuIsOpen((open) => !open)}>
          &times;
        </span>
      </div>
      {fridgeItems
        .flat()
        .filter((shelf) => shelf.shelfId === menuShelf)
        .map((shelf) => {
          return (
            <>
              <Shelf
                shelf={shelf}
                onMenuIsOpen={onMenuIsOpen}
                onMenuShelf={onMenuShelf}
              />
              <p>Shelf number {+shelf.shelfId + 1}</p>
            </>
          );
        })}
      <form>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onAddItem(input);
            setInput("");
          }}
        >
          Add random stuff
        </button>
        <span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </span>
      </form>
      {fridgeItems.flat().filter((shelf) => shelf.shelfId === menuShelf)[0]
        .items?.length > 0 && (
        <>
          <button
            onClick={() => {
              onRemoveItem(selectedItem);
              setSelectedItem(null);
            }}
          >
            Remove an item
          </button>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value={null}>Not Selected</option>

            {fridgeItems
              .flat()
              .filter((shelf) => shelf.shelfId === menuShelf)
              .map((shelf) => {
                return shelf.items.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                });
              })}
          </select>
        </>
      )}
    </div>
  );
}

// async function fetchImages(query) {
//     try {
//       const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
//         headers: {
//           Authorization: '546612 WfC-g97Pg1E5VjQD6E_C3rbZ3YUFkW-rYEuCFJbXL6o'
//         }
//       });

//       const data = await response.json();
//       return data.results;
//     } catch (error) {
//       console.error(error);
//     }
//   }
