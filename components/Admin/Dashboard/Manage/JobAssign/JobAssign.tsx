"use client";

import { useEffect, useRef, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import PagesEditModal from "../Pages/PagesEditModal/PagesEditModal";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { jobAssignData } from "@/utils/manageData";
import { IoIosArrowDown } from "react-icons/io";

export default function JobAssign({ data }: any) {
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // assign type selector
    const [userType, setUserType] = useState("all"); // To filter by user type
    const [filteredUsers, setFilteredUsers] = useState(data?.pageItems); // For the filtered data

    // Filtering users based on the selected user type
    useEffect(() => {
        let result = data?.pageItems || [];

        // Filter by user type
        if (userType !== "all") {
            result = result.filter((item: any) => item.type.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType, data]);

    // filtering mode and type
    const [selectedMode, setSelectedMode] = useState<any>();
    const [filteredModeType, setFilteredModeType] = useState<any>();
    const [searchQuery, setSearchQuery] = useState(""); // For the search input in the type selector
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]); // To store filtered options
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if dropdown is open

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter mode based on selected mode
    useEffect(() => {
        const filteredData = jobAssignData?.find((item) => item?.mode === selectedMode);
        if (filteredData) {
            setFilteredModeType(filteredData);
            setFilteredOptions(filteredData?.type || []); // Initialize with all options
        }
    }, [selectedMode, jobAssignData]);

    // Handle search and filter options based on the search query
    useEffect(() => {
        if (filteredModeType && filteredModeType.type) {
            const filtered = filteredModeType.type.filter((type: any) =>
                type.itemName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [searchQuery, filteredModeType]);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [selectedTypeOfAssign, setSelectTypeOfAssign] = useState<any>();

    return (
        <div className="w-full px-2 py-2">
            {/* page heading */}
            <div className="flex justify-between items-center border-b border-black/40 px-3 pb-3">
                <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">
                    {data?.pageName}
                </h1>
                <div className="flex px-3 gap-3 items-center">
                    {/* users type selector */}
                    <select
                        name="users"
                        className="bg-[#FFBE00] hidden sm:block w-auto text-[10px] sm:text-[15px] py-2 font-semibold rounded-md px-2 ring-2 ring-[#FFBE00] outline-none border-none cursor-pointer"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option className="bg-[#EDEDED] text-black" value="all">
                            All
                        </option>
                        <option className="bg-[#EDEDED] text-black" value="category">
                            Category
                        </option>
                        <option className="bg-[#EDEDED] text-black" value="service">
                            Service
                        </option>
                    </select>

                    <button
                        onClick={openModal}
                        className="sm:text-[17px] text-[10px] text-white bg-[#07242B] px-4 sm:px-[20px] py-1 sm:py-[10px] rounded-md flex gap-2 items-center"
                    >
                        Add New <IoArrowForwardOutline className="size-[17px] text-white" />
                    </button>
                </div>
            </div>

            {/* page items */}
            <div className="w-full">
                <div className="w-full max-w-full overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#E7EDF2]">
                            <tr>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Mode
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Type
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Term
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers?.map((item: any, i: number) => (
                                <tr className="border-b border-black/10" key={i}>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.mode}
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.type}
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.term}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button onClick={openModal} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
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
                                            <h4 className="font-semibold uppercase text-[17px]">Add New Job Assign</h4>
                                        </div>

                                        <div className="w-full h-full">
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="mode" className="block pb-2 font-semibold">
                                                        Mode
                                                    </label>
                                                    <select
                                                        onChange={(e) => setSelectedMode(e.target.value)}
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md capitalize"
                                                        name="mode"
                                                        id="mode"
                                                        defaultValue="select"
                                                    >
                                                        <option value="select" disabled>
                                                            Select
                                                        </option>
                                                        {jobAssignData?.map((mode: any, i: number) => (
                                                            <option key={i} value={mode?.mode}>
                                                                {mode?.mode}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Custom Type Selector with Search */}
                                                <div className="py-2 text-start">
                                                    <label htmlFor="type" className="block pb-2 font-semibold">
                                                        Type
                                                    </label>
                                                    <div className="relative" ref={dropdownRef}>
                                                        <div
                                                            className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 cursor-pointer outline-none shadow-md capitalize flex justify-between items-center"
                                                            onClick={toggleDropdown}
                                                        >
                                                            {selectedTypeOfAssign || "Select Type"}
                                                            <IoIosArrowDown className="text-[14px] -me-[9px] text-black" />
                                                        </div>

                                                        {/* Dropdown */}
                                                        {isDropdownOpen && (
                                                            <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search type..."
                                                                    className="w-full px-3 py-2 outline-none"
                                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                                />
                                                                <ul>
                                                                    {filteredOptions.length > 0 ? (
                                                                        filteredOptions.map((type: any, i: number) => (
                                                                            <li
                                                                                key={i}
                                                                                className="py-2 px-4 cursor-pointer hover:bg-gray-200 capitalize"
                                                                                onClick={() => {
                                                                                    setSelectTypeOfAssign(type.itemName);
                                                                                    setIsDropdownOpen(false); // Close dropdown on selection
                                                                                }}
                                                                            >
                                                                                {type.itemName}
                                                                            </li>
                                                                        ))
                                                                    ) : (
                                                                        <li className="py-2 px-4 text-gray-500">Please select a mode first</li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="py-2 text-start">
                                                    <label htmlFor="term" className="block pb-2 font-semibold">
                                                        Term
                                                    </label>
                                                    <input type="text" className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md" />
                                                    <p className="text-[12px] font-bold pt-3">Please enter the ID in the right order and separate with a comma (,)</p>
                                                </div>

                                                <div className="py-2 text-start">
                                                    <button
                                                        className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]"
                                                        type="submit"
                                                    >
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