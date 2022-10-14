import axios from "axios";
import { useEffect, useState } from "react";
import Found from "./components/Found/Found";
import Investments from "./components/Investments/Investments";

export default function App() {
	const [investmentsData, setInvestmentsData] = useState(null);
	const [reports, setReports] = useState(null);

  const investmentsObject = filterByInvestments()


	useEffect(() => {
		async function getDatas() {
			return {
				investments: await axios.get(
					"http://localhost:3000/investments"
				),
				reports: await axios.get("http://localhost:3000/reports")
			};
		}

		async function renderDatas() {
			const data = await getDatas();
			setInvestmentsData(data.investments.data);
			setReports(data.reports.data);
		}

		renderDatas();
	}, []);

	function filterByInvestments() {

    const stock = reports && sortReportsByMonth(reports.filter(report => report.investmentId === investmentsData[0].id))

    const cryptocurrency = reports && sortReportsByMonth(reports.filter(report => report.investmentId === investmentsData[1].id))

	  const protection = reports && sortReportsByMonth(reports.filter(report => report.investmentId === investmentsData[2].id))

		const fixedIncome = reports && sortReportsByMonth(reports.filter(report => report.investmentId === investmentsData[3].id))

		const tech = reports && sortReportsByMonth(reports.filter(report => report.investmentId === investmentsData[4].id))

		const multimarket = reports && sortReportsByMonth(reports.filter(report => report.investmentId === investmentsData[5].id))

		const theme = reports && sortReportsByMonth(reports.filter(report => report.investmentId === investmentsData[6].id))

    return {
      stock,
      cryptocurrency,
      protection,
      fixedIncome,
      tech,
      multimarket,
      theme
    }
  }


	function sortReportsByMonth(report) {
		return report.sort((reportA, reportB) => {
			/* prettier-ignore */
			return reportA.month >reportB.month ? 1 : reportA.month < reportB.month ?  -1 : 0
		});
	}

	return (
		<div>
			<header>
				<div className='bg-blue-200 mx-auto p-4'>
					<h1 className='text-center font-semibold text-xl'>
						React-Investments
					</h1>
				</div>
			</header>

			<main>
				{investmentsData && investmentsData[0].description}
				<Investments>
					<Found title={investmentsData && investmentsData[0].description}
          investment={investmentsObject.stock}/>
        	<Found title={investmentsData && investmentsData[1].description}
          investment={investmentsObject.cryptocurrency}/>
          <Found title={investmentsData && investmentsData[2].description}
          investment={investmentsObject.protection}/>
          <Found title={investmentsData && investmentsData[3].description}
          investment={investmentsObject.fixedIncome}/>
          <Found title={investmentsData && investmentsData[4].description}
          investment={investmentsObject.tech}/>
          <Found title={investmentsData && investmentsData[5].description}
          investment={investmentsObject.multimarket}/>
          <Found title={investmentsData && investmentsData[6].description}
          investment={investmentsObject.theme}/>
				</Investments>
			</main>
		</div>
	);
}
