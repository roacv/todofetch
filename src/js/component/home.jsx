import React, { useEffect, useState } from "react";
import { FaTrash, FaTasks } from "react-icons/fa";
import Input from "./Input.jsx";

//create your first component
const Home = () => {
  const [inputContent, setInputContent] = useState("");
  const [listoftodos, setlistoftodos] = useState([]);
  const [inputTask, setTask] = useState("");
  const [listtodo, setlisttodo] = useState([]);
	console.log("hola");
  const handleChange = (e) => {
	setTask(e.target.value)
	console.log("holax2");
	}

  const enter = (e) => {
	e.key== "Enter" ? setlisttodo(listtodo.concat(inputTask)) : null
	console.log(listtodo);
  }

  return (
	
    <div className="container text-center">
      <h1>To Do's</h1>
      <ul className="list-group">
        <li className="list-group-item">
		  <Input type={"text"} className={"form-control mb-2"} placeholder={"What needs to be done?"} onChange={handleChange} onKeyDown={enter} value={inputTask} />
		  {
            	listtodo.length > 0 ?
            	listtodo.map((task, index) => {
            		return (
            			<li key={index} className={"list-group-item " + (index === 0 ? "active" : null)}>{task}</li>
            		)
                }): (
                    	<li className='list-group-item'>Nothing To Do</li>
                    )
          }
		 
		 
		 
		  <input
            type="text"
            onChange={(e) => setInputContent(e.target.value)}
            value={inputContent}
            onKeyDown={(e) =>
              e.key === "Enter"
                ? setlistoftodos(listoftodos.concat(inputContent))
                : null
            }
            onKeyUp={(e) => (e.key === "Enter" ? setInputContent("") : null)}
            placeholder="Add a morning action to start a good day"
          ></input>
        </li>
        {listoftodos.map((task, index) => (
          <li>
            {task}
            <span>
              <FaTrash
                onClick={() =>
                  setlistoftodos(
                    listoftodos.filter(
                      (t, currentIndex) => index != currentIndex
                    )
                  )
                }
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-start">Number of Tasks: {listoftodos.length}</div>
    </div>
  );
};

export default Home;
