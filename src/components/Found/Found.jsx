import React from "react";

export default function Found({ title, investment }) {
	const reduceInvestment =
		investment &&
		investment.reduce((acc, curValue, index) => {
			if (index === 0) {
				acc = [{ ...curValue, porcent: 0 }];
			} else {
			acc.push({
					...curValue,
					porcent: Number(
						(((curValue.value - acc[index - 1].value)/acc[index - 1].value)*100)
					).toFixed(
						2
					)
				})
			}

			return acc;
		}, []);

	return (
		<div>
			<h1 className='text-center mt-2 font-bold text-lg'>{title}</h1>
			<h3 className='text-center'>
				Rendimento Total: R${" "}
				{investment &&
					(
						investment[investment.length - 1].value -
						investment[0].value
					).toFixed(2)}
			</h3>

			<table className='w-full text-left text-black-500'>
				<thead>
					<tr>
						<th>Mês</th>
						<th>Valor</th>
						<th>Porcentagem</th>
					</tr>
				</thead>

				<tbody>
					{reduceInvestment &&
						reduceInvestment.map((investment, index, arr) => {
							return (
								<tr key={investment.id}>
									<td>
										{investment.month}/{investment.year}
									</td>
									<td>R$ {investment.value.toFixed(2)}</td>
									<td>{investment.porcent} % </td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
