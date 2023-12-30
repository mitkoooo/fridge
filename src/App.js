import "./App.css";
import { useState } from "react";
import Pinboard from "./components/Pinboard";
import Menu from "./components/Menu";
import Shelf from "./components/Shelf";

function App() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuShelf, setMenuShelf] = useState(null);
  const [fridgeItems, setFridgeItems] = useState([
    [
      {
        shelfId: "0",
        items: [],
      },
      {
        shelfId: "1",
        items: [],
      },
      {
        shelfId: "2",
        items: [],
      },
      {
        shelfId: "3",
        items: [],
      },
      {
        shelfId: "4",
        items: [],
        bottomShelf: true,
      },
    ],
    [
      {
        shelfId: "5",
        items: [],
      },
      {
        shelfId: "6",
        items: [],
      },
      {
        shelfId: "7",
        items: [],
        bigShelf: true,
      },
    ],
    [
      {
        shelfId: "8",
        items: [],
      },
      {
        shelfId: "9",
        items: [],
      },
      {
        shelfId: "10",
        items: [],
      },
    ],
  ]);

  const handleMenuShelf = (shelfId) => {
    if (shelfId === menuShelf) return;
    setMenuShelf(shelfId);
  };

  const handleFetchItemObject = async function (item) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${item}&client_id=WfC-g97Pg1E5VjQD6E_C3rbZ3YUFkW-rYEuCFJbXL6o`
      );

      const data = await response.json();

      console.log(data.results);

      const index = Math.floor(Math.random() * data.results.length);

      return { name: item, url: data.results[index].urls.regular };
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = async function (item) {
    if (!item) return;

    const itemObject = await handleFetchItemObject(item);

    const sectionId = menuShelf < 5 ? 0 : menuShelf < 8 ? 1 : 2;

    console.log(fridgeItems[sectionId]);

    setFridgeItems(
      fridgeItems.map((section, index) => {
        if (index === sectionId) {
          return section.map((shelf) => {
            if (shelf.shelfId === menuShelf) {
              return {
                ...shelf,
                items: [...shelf.items, itemObject],
              };
            }
            return shelf;
          });
        }
        return section;
      })
    );
  };

  const handleRemoveItem = function (itemName) {
    console.log(itemName);
    const sectionId = menuShelf < 5 ? 0 : menuShelf < 8 ? 1 : 2;

    setFridgeItems(
      fridgeItems.map((section, index) => {
        if (index === sectionId) {
          return section.map((shelf) => {
            if (shelf.shelfId === menuShelf) {
              return {
                ...shelf,
                items: shelf.items.filter((i) => i.name !== itemName),
              };
            }
            return shelf;
          });
        }
        return section;
      })
    );
  };

  return (
    <div className="App">
      <div className="room">
        <Pinboard>
          <span>The fridge</span>
        </Pinboard>
        <Fridge
          onMenuIsOpen={setMenuIsOpen}
          onMenuShelf={handleMenuShelf}
          fridgeItems={fridgeItems}
          menuShelf={menuShelf}
        />
        <div className="floor"></div>
      </div>
      {menuIsOpen && (
        <Menu
          onMenuIsOpen={setMenuIsOpen}
          menuShelf={menuShelf}
          onMenuShelf={handleMenuShelf}
          fridgeItems={fridgeItems}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />
      )}
    </div>
  );
}

export default App;

function Fridge({ onMenuIsOpen, onMenuShelf, fridgeItems, menuShelf }) {
  const [fridgeIsOpen, setFridgeIsOpen] = useState(false);
  const [freezerIsOpen, setFreezerIsOpen] = useState(false);

  const handleFridgeOpen = function (e) {
    if (e.target.className === "shelf" || e.target.className === "shelf-big")
      return;
    setFridgeIsOpen((open) =>
      fridgeIsOpen ? onMenuIsOpen(false) && !open : !open
    );
  };
  const handleFreezerOpen = () =>
    setFreezerIsOpen((open) =>
      freezerIsOpen ? onMenuIsOpen(false) && !open : !open
    );

  return (
    <div className="fridge">
      {fridgeIsOpen ? (
        <FridgeOnlySection
          onFridgeIsOpen={handleFridgeOpen}
          onMenuIsOpen={onMenuIsOpen}
          onMenuShelf={onMenuShelf}
          fridgeItems={fridgeItems.slice(0, 2)}
          menuShelf={menuShelf}
        />
      ) : (
        <FridgeDoor onFridgeIsOpen={handleFridgeOpen} />
      )}
      {freezerIsOpen ? (
        <Freezer
          onFreezerIsOpen={handleFreezerOpen}
          onMenuIsOpen={onMenuIsOpen}
          fridgeItems={fridgeItems.slice(2, 3)}
          onMenuShelf={onMenuShelf}
          menuShelf={menuShelf}
        />
      ) : (
        <FreezerDoor onFreezerIsOpen={handleFreezerOpen} />
      )}
    </div>
  );
}

function FridgeOnlySection({
  onFridgeIsOpen,
  onMenuIsOpen,
  onMenuShelf,
  fridgeItems,
  menuShelf,
}) {
  return (
    <>
      <div className="fridge-only">
        {fridgeItems[0].map((shelf) => (
          <Shelf
            shelf={shelf}
            onMenuIsOpen={onMenuIsOpen}
            onMenuShelf={onMenuShelf}
            key={shelf.shelfId}
            menuShelf={menuShelf}
          ></Shelf>
        ))}
      </div>
      <div className="fridge-door-opened" onClick={onFridgeIsOpen}>
        {fridgeItems[1].map((shelf) => (
          <Shelf
            shelf={shelf}
            onMenuIsOpen={onMenuIsOpen}
            onMenuShelf={onMenuShelf}
            menuShelf={menuShelf}
            key={shelf.shelfId}
          ></Shelf>
        ))}
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

function Freezer({
  onFreezerIsOpen,
  onMenuIsOpen,
  onMenuShelf,
  fridgeItems,
  menuShelf,
}) {
  return (
    <>
      <div className="freezer">
        {fridgeItems[0].map((shelf) => {
          return (
            <Shelf
              shelf={shelf}
              onMenuIsOpen={onMenuIsOpen}
              onMenuShelf={onMenuShelf}
              menuShelf={menuShelf}
              key={shelf.shelfId}
            ></Shelf>
          );
        })}
      </div>
      <div className="freezer-door-opened" onClick={onFreezerIsOpen}></div>
    </>
  );
}
