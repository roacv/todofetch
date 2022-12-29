import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Input from "./Input.jsx";

//create your first component
const Home = () => {
  const [inputTask, setTask] = useState("");
  const [listtodo, setlisttodo] = useState([]);
  const [hover, setHover] = useState();

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const enter = (e) => {
    e.key == "Enter" ? setlisttodo(listtodo.concat(inputTask)) : null;
  };

  const deleteItem = (index) => {
    console.log("borrando", index);
    setlisttodo(listtodo.filter((task, currentIndex) => index != currentIndex));
  };

  return (
    <div className="container text-center w-50 mt-5">
      <h1>To Do's</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <Input
            type={"text"}
            className={"form-control mb-2"}
            placeholder={"What needs to be done?"}
            onChange={handleChange}
            onKeyDown={enter}
            value={inputTask}
          />
        </li>
        {listtodo.length > 0 ? (
          listtodo.map((task, index) => {
            return (
              <li
                key={index}
                id={index}
                onMouseOver={() => setHover(index)}
                className={
                  "list-group-item d-flex justify-content-between " +
                  (hover == index ? "active" : null)
                }
              >
                {task}
                <FiX
                  className={hover == index ? "h4" : "d-none"}
                  onClick={() => deleteItem(index)}
                />
              </li>
            );
          })
        ) : (
          <li className="list-group-item">Nothing To Do</li>
        )}
      </ul>
      <div className="d-flex justify-content-start">
        Number of Tasks: {listtodo.length}
      </div>
    </div>
  );
};

export default Home;
