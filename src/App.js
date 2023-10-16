import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [name, setName] = useState("");
	const [datetime, setDatetime] = useState("");
	const [description, setDescription] = useState("");
	const [transactions, setTransactions] = useState("");
	useEffect(() => {
		getTransactions().then((transactions) => {
			setTransactions(transactions);
		});
	}, []);
	async function getTransactions() {
		const url = process.env.REACT_APP_API_URL + "/transactions";
		const res = await fetch(url);
		return await res.json();
	}
	function addNewTransaction(ev) {
		const price = name.split(" ")[0];
		ev.preventDefault();
		const url = process.env.REACT_APP_API_URL + "/transaction";
		fetch(url, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				price,
				name: name.substring(price.length + 1),
				description,
				datetime,
			}),
		}).then((responce) => {
			responce.json().then((data) => {
				setName("");
				setDescription("");
				setDatetime("");
				console.log(data);
			});
		});
	}
	let balance = 0;
	for (const transaction of transactions) {
		balance = balance + transaction.price;
	}
	balance = balance.toFixed(2);
	const fraction = balance.split(".")[1];
	return (
		<main>
			<h1>
				${balance}
				<span>{fraction}</span>
			</h1>
			<form onSubmit={addNewTransaction}>
				<div className="basic">
					<input
						type="text"
						value={name}
						onChange={(ev) => setName(ev.target.value)}
						placeholder={"+200 new samsung tv"}
					/>
					<input
						value={datetime}
						onChange={(ev) => setDatetime(ev.target.value)}
						type="datetime-local"
					/>
				</div>
				<div className="description">
					<input
						type="text"
						value={description}
						onChange={(ev) => setDescription(ev.target.value)}
						placeholder={"description"}
					/>
				</div>
				<button>Add new transaction</button>
			</form>
			<div className="transitions">
				{transactions.length > 0 &&
					transactions.map((transaction) => (
						<div>
							<div className="transaction">
								<div className="left">
									<div className="name">
										{transaction.name}
									</div>
									<div className="description">
										{transaction.description}
									</div>
								</div>
								<div className="right">
									<div
										className={
											"price " +
											(transaction.price < 0
												? "red"
												: "green")
										}
									>
										{transaction.price}
									</div>
									<div className="datetime">
										{transaction.date}
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</main>
	);
}
export default App;
