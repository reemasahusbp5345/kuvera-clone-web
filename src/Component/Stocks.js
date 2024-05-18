import React from "react";
import { openModal } from "../Redux/portfolioSlice";
import { useDispatch } from "react-redux";

const Stocks = ({ stocks }) => {
  const dispatch = useDispatch();
  const handleAdd = (stock) => {
    dispatch(openModal({ stock, isAdd: true }));
  };
  return (
    <div className="m-4">
      <h2 className="font-medium text-slate-700 underline mb-4">Stocks</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              1D
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              1Y
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks?.map((stock) => (
            <tr key={stock?._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                {stock?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stock?.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                {stock?.oneDay}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                {stock?.oneYr}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleAdd(stock)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4210/4210903.png"
                  alt="delete"
                  width={25}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
