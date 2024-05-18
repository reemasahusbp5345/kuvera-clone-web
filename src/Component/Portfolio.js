import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePortfolio, openModal } from "../Redux/portfolioSlice";

const Portfolio = () => {
  const portfolio = useSelector((store) => store?.portfolio?.portfolioData);
  const dispatch = useDispatch();
  const handleEdit = (stock) => {
    dispatch(openModal({ ...stock, isAdd: false }));
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`https://kuvera-clone-backend.vercel.app/portfolio/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(deletePortfolio({ id }));
    } catch (error) {
      throw new Error();
    }
  };
  return (
    <div className="m-4">
      <h2 className="font-medium text-slate-700 underline mb-4">Portfolio</h2>
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
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invested Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              1D
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              1Y
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {portfolio?.map((item) => (
            <tr key={item?._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                {item?.stock?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-500">
                {item?.stock?.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item?.value}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                {Number(item?.stock?.price) * Number(item?.value)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item?.stock?.oneDay}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item?.stock?.oneYr}
              </td>
              <td
                className="px-3 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleEdit(item)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                  alt="edit"
                  width={25}
                />
              </td>
              <td
                className="px-3 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleDelete(item?._id)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png"
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

export default Portfolio;
