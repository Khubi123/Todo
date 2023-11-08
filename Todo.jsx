import { useEffect, useState } from "react";
import "./Todo.css";

// get data 
const getLocalData = ()=>{
    const lists = localStorage.getItem("mytodo")

    if(lists){
        return JSON.parse(lists)
    } else{
        return []
    }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [item, setItem] = useState(getLocalData());
  const [edit, setEdit] = useState("")
  const [toggle, setToggle] = useState(false)

//   Adding the item
  const addItem = () => {
    if (inputdata === "") {
      alert("Please enter a valid data");
    } else if(inputdata && toggle){
        setItem(
            item.map((curEle)=>{
                if(curEle.id===edit){
                    return ({...curEle, name:inputdata})
                }
                return curEle
            })
        )
        setInputData([])
        setEdit(null)
        setToggle(false)
    }

    
    else {
      const myNew = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItem([...item, myNew]);
      setInputData("");
    }
  };

//   Edit
const EditItem = (index)=>{
    const item_todo_edited = item.find((curEle)=>{
        return curEle.id = index;
    })
    setInputData(item_todo_edited.name)
    setEdit(index)
    setToggle(true)
}

  //   delete

  const deleteItem = (index) => {
    const updatedItem = item.filter((curEle) => {
      return curEle.id != index;
    });
    setItem(updatedItem);
  };

  const removeAll = () => {
    setItem([]); //clearing the list after clicking on clear button
  };

  // local storage
  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="" />
            <figcaption>Add your list here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items"
              className="form-control"
              value={inputdata}
              onChange={(e) => setInputData(e.target.value)}
            />
            {
                toggle ? (
                    <i className="fa fa-edit add-btn" onClick={addItem}></i>
                ):(
                    <i className="fa fa-plus add-btn" onClick={addItem}></i>
                )
            }
          </div>
          {/* show item  */}
          <div className="showItems">
            {item.map((curEle, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{curEle.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>EditItem(curEle.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check list</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
