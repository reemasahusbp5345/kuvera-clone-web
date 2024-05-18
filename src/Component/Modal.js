import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPortfolio,
  closeModal,
  editPortfolio,
} from "../Redux/portfolioSlice";

const Modal = () => {
  const stock = useSelector((store) => store?.portfolio?.selectedStock);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (stock?.value) {
      setValue(stock?.value);
    }
    // eslint-disable-next-line
  }, []);
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const addStockToPortfolio = async (id) => {
    try {
      const response = await fetch("https://kuvera-clone-backend.vercel.app/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, value: Number(value) }),
      });
      const newStock = await response.json();
      dispatch(addToPortfolio(newStock));
    } catch (error) {
      throw new Error();
    }
  };
  const updatePortfolio = async (id, data) => {
    try {
      await fetch(`https://kuvera-clone-backend.vercel.app/portfolio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      dispatch(editPortfolio({ id, data }));
    } catch (error) {
      throw new Error();
    }
  };
  const handleSaveModal = async () => {
    if (stock?.isAdd) {
      addStockToPortfolio(stock?.stock?._id);
    } else {
      const data = { ...stock, value: Number(value) };
      updatePortfolio(stock?._id, data);
    }
    dispatch(closeModal());
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-slate-500 bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white w-96 mx-auto rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              {stock?.stock?.name}
            </h2>
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                {stock?.stock?.price}
              </h4>
              <p className="text-sm text-gray-500">
                1D:{" "}
                <span className="text-green-500">{stock?.stock?.oneDay}</span>
              </p>
              <p className="text-sm text-gray-500">
                1Y:{" "}
                <span className="text-green-500">{stock?.stock?.oneYr}</span>
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity:
              </label>
              <input
                type="number"
                name="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700">
                Total value:{" "}
                <span className="font-semibold text-gray-900">
                  {value && Number(stock?.stock?.price) * Number(value)}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {stock?.isAdd ? "Add Stock" : "Edit Stock"}
              </button>
            </div>
          </div>
          {/* Close Button */}
          <button
            className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={handleCloseModal}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
