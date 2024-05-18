import { useEffect, useState } from "react";
import Portfolio from "./Component/Portfolio";
import Stocks from "./Component/Stocks";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolio } from "./Redux/portfolioSlice";
import Modal from "./Component/Modal";

function App() {
  const [stocks, setStocks] = useState([]);
  const isModalOpen = useSelector((store) => store?.portfolio?.modal);
  const dispatch = useDispatch();
  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:8000/stocks");
      const stockData = await response.json();
      setStocks(stockData);
    } catch (error) {
      throw new Error();
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("http://localhost:8000/portfolio");
      const portfolioData = await response.json();
      dispatch(getPortfolio(portfolioData));
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchPortfolio();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex w-2/3 m-auto flex-col">
      <div className="border-4 m-2 p-2">
        <Stocks stocks={stocks} />
      </div>
      <div className="border-4 m-2 p-2">
        <Portfolio />
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
}

export default App;
