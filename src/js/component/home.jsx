import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Input from "./Input.jsx";

//create your first component
const Home = () => {
	const [inputTask, setTask] = useState("");
	const [listtodo, setlisttodo] = useState([]);
	const [hover, setHover] = useState();
	const [userActive, setUserActive] = useState(false);

	useEffect(() => {
		user();
		if (!userActive) {
			newUser();
		}
		else {
			getTodo();
		}
	}, [!userActive]);

	const newUser = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/rcv", {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
			.then(resp => {
				console.log("Response newUser ok", resp.ok);
				console.log("Response newUser status", resp.status);
			})
			.then(data => {
				console.log("newUser data", data);
			})
	}

	const user = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user', {
			method: "GET",
		})
			.then(resp => {
				console.log("Response User ok", resp.ok);
				console.log("Response User status", resp.status);
				return resp.json()
			})
			.then(data => {
				console.log("user data", data);
				setUserActive(data.includes("rcv"));
				console.log("setUserActive status", data.includes("rcv"));
			})
	}

	const getTodo = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/rcv', {
			method: "GET",
		})
			.then(resp => {
				console.log("Response getTodo ok", resp.ok);
				console.log("Response getTodo status", resp.status);
				return resp.json();
			})
			.then(data => {
				setlisttodo(data.map(e => e.label))
			}, [])
	}

	const newTodo = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/rcv', {
			method: "PUT",
			body: JSON.stringify(tarea),
			headers: { "Content-Type": "application/json" }
		})
			.then(resp => {
				console.log("Response newTodo ok", resp.ok);
				console.log("Response newTodo status", resp.status);
				return resp.json();
			})
			.then(data => {
				console.log("newTodo data", data);
				console.log("Tareas:", tarea);
			})
	}

	const deleteAll = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/rcv', {
			method: "DELETE",
			body: JSON.stringify([tarea]),
			headers: { "Content-Type": "application/json" }
		})
			.then(resp => {
				console.log("Response deleteAll ok", resp.ok);
				console.log("Response deleteAll status", resp.status);
				return resp.json();
			})
			.then(data => {
				console.log("deleteAll data", data);
				if (data.result == "ok") {
					setlisttodo([]);
					setUserActive(false);
				}
			})
	}

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
