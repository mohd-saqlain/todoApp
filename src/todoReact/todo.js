import React, { useEffect, useState } from "react";
import icon from "../Assets/images/todo.svg"

const getLocalData = () => {
  const list = localStorage.getItem("mytodoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEdititem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const addItem = () => {
    if (!inputData) {
      // prompt("No data entered");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEdititem) {
            return { ...items, name: inputData };
          }
          return curEle;
        })
        );
        setInputData("");
        setIsEditItem("");
        setToggleButton(false);

    } else {
      const myNewData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewData]);
      setInputData("");
    }
  };
  const removeItem = (id) => {
    const updateItems = items.filter((curEle) => {
      return curEle.id !== id;
    });
    setItems(updateItems);
  };

  const removeAll = () => {
    //  const up = [];
    //  setItems(up);
    // items.splice(0,items.length);
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(items));
  }, [items]);

  const editText = (index) => {
    const editItem = items.find((curEle) => {
      return index === curEle.id;
    });
    // removeItem(editItem.id)
    setInputData(editItem.name);
    setIsEditItem(index);
    setToggleButton(true);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={icon} alt="SVG" />
            <figcaption>Add your list here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="📝 Add Item"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {items.map((curEle) => {
            // const {id,name}=curEle;
            return (
              <div className="showItems" key={curEle.id}>
                <div className="eachItem">
                  <h3>{curEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editText(curEle.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => removeItem(curEle.id)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
