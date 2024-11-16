"use client";

import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import PagesEditModal from "../Pages/PagesEditModal/PagesEditModal";

export default function PointsPage({ data }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full px-2 py-2">
            {/* page heading */}
            <div className="flex justify-between items-center border-b border-black/40 px-3 pb-3">
                <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">{data?.pageName}</h1>
                <button
                    onClick={openModal}
                    className="sm:text-[17px] text-[12px] text-white bg-[#07242B] px-[20px] py-[10px] rounded-md flex gap-2 items-center"
                >
                    Add New <IoArrowForwardOutline className="size-[17px] text-white" />
                </button>
            </div>

            {/* page items */}
            <div className="w-full">
                <div className="w-full max-w-full overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#E7EDF2]">
                            <tr>
                                <th className="p-3 text-start text-[13px] sm:text-[16px] uppercase whitespace-nowrap">
                                    Points
                                </th>
                                <th className="p-3 text-start text-[13px] sm:text-[16px] uppercase whitespace-nowrap">
                                    Category
                                </th>
                                <th className="p-3 text-start text-[13px] sm:text-[16px] uppercase whitespace-nowrap">
                                    Job Frequency
                                </th>
                                <th className="p-3 text-start text-[13px] sm:text-[16px] uppercase whitespace-nowrap">
                                    Client Budget
                                </th>
                                <th className="p-3 text-start text-[13px] sm:text-[16px] uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.pageItems?.map((item: any, i: number) => (
                                <tr className="border-b border-black/10" key={i}>
                                    <td className="p-3 uppercase text-black sm:text-[16px] text-[13px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.point}
                                        </p>
                                    </td>
                                    <td className="p-3 uppercase text-black sm:text-[16px] text-[13px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.category}
                                        </p>
                                    </td>
                                    <td className="p-3 uppercase text-black sm:text-[16px] text-[13px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.jobFrequency}
                                        </p>
                                    </td>
                                    <td className="p-3 uppercase text-black sm:text-[16px] text-[13px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.clientBudget}
                                        </p>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center justify-end">
                                            <button onClick={openModal} className="px-2 text-[#FFBE00] sm:text-[16px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                            <button>
                                                <MdDelete className="size-[20px] text-[#F52933]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <PagesEditModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    content={
                        <div className="w-full max-h-[80vh] h-full sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[420px] py-3 px-3 md:px-7 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal}>
                                    <AiFillCloseSquare className="size-[20px]" />
                                </button>
                                <div className="w-full text-center">
                                    <div className="pt-4">
                                        <div className="text-center">
                                            <h4 className="font-semibold uppercase text-[17px]">Add Point Rule</h4>
                                        </div>

                                        <div className="w-full h-full">
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="points" className="block pb-2 font-semibold">Points</label>
                                                    <input
                                                        type="text"
                                                        id="points"
                                                        name="points"
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        placeholder="Enter points"
                                                    />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="category" className="block pb-2 font-semibold">Category</label>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        className="w-full capitalize ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        defaultValue="Select"
                                                    >
                                                        <option value="Select">Select Category</option>
                                                        {
                                                            data?.pageItems?.map((catg: any, i: number) => (
                                                                <option key={i} value={catg?.category}>{catg?.category}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="frequency" className="block pb-2 font-semibold">Frequency</label>
                                                    <select
                                                        id="frequency"
                                                        name="frequency"
                                                        className="w-full capitalize ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        defaultValue="Select"
                                                    >
                                                        <option value="Select">Select Frequency</option>
                                                        <option value="daily">Daily</option>
                                                        <option value="monthly">Monthly</option>
                                                        <option value="yearly">Yearly</option>
                                                    </select>
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="budget" className="block pb-2 font-semibold">Client Budget</label>
                                                    <input
                                                        type="text"
                                                        id="budget"
                                                        name="budget"
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        placeholder="Enter client budget"
                                                    />
                                                </div>

                                                <div className="py-2 text-start">
                                                    <button className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]">
                                                        Save <FaArrowRight className="size-[15px] text-black" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}
        </div>
    );
}