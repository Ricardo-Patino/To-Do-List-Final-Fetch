import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Alert } from "bootstrap";

//create your first component
export function Home() {
	const [task, setTask] = useState(""); //VALORES DEL INPUT
	const [list, setList] = useState([]); //["LAVAR","PLANCHAR","COCINAR"]

	let url = "https://assets.breatheco.de/apis/fake/todos/user/ricardopatino";
	const LoadData = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setList(data);
				//console.log({ data });
			}) //cargando la info
			.catch(error => console.error("Error:", error.message));
	};

	const UpdateData = list => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(list),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				LoadData();
				alert(data.result);
			}) //cargando la info
			.catch(error => console.error("Error:", error.message));
	};

	const NewData = () => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				LoadData();
			})
			.catch(error => console.error("Error:", error.message));
	};

	const DeleteData = () => {
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				NewData();
			})
			.catch(error => console.error("Error:", error.message));
	};
	useEffect(() => {
		LoadData();
	}, []);

	return (
		<div className="container mt-5 text-center">
			<div className="row d-flex justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body text-primary">
							<h1 className="display-5">To Do List</h1>
							<input
								className="form-control"
								type="text"
								value={task}
								onChange={e => {
									setTask(e.target.value.toUpperCase());
								}}
								onKeyPress={e => {
									if (e.key === "Enter") {
										if (task != "") {
											let obj = {
												label: task.toUpperCase(),
												done: true
											};

											setList(list.concat(obj));
											setTask("");
											//console.log({ list });
										} else {
											alert("Ingrese una actividad");
										}
									}
								}}
							/>
							{!list
								? "loading..."
								: list.map((item, index) => {
										return (
											<label
												className="form-control text-primary list-group-item list-group-item-action"
												key={index}
												onDoubleClick={() => {
													setList(
														list.filter(
															(itemf, indexf) =>
																indexf !== index
														)
													);
												}}>
												{item.label}
											</label>
										);
								  })}
							<div className="row d-flex justify-content-center">
								<button
									type="button"
									className="btn btn-outline-success"
									onClick={() => {
										UpdateData(list);
									}}>
									Update
								</button>
								<button
									type="button"
									className="btn btn-outline-danger"
									onClick={() => {
										DeleteData();
									}}>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
