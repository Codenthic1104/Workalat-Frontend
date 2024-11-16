"use client"
import Menus from "../Menus/Menus";
import { IoFilterSharp, IoReloadOutline } from "react-icons/io5";
import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import './Responses.css'
import "react-datepicker/dist/react-datepicker.css";
import { RiMapPin5Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { GiCheckedShield } from "react-icons/gi";
import { ResponsesData } from "@/utils/responsesData";
import ResponsesModal from "./ResponsesModal";

export default function Responses() {

    // here is demo data "import { responsesData } from "@/utils/responsesData";", which need to connect api and fetch from api then that data will be here.. and with the api also need to integration for update and delete methods because here is button in "view" and if there click there will show option for approve and reject so depends on that data need to update also. i here taking from leadsData.ts files (demo data)


    // date time filtering and location filtering
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    const handleDateTimeChange = (date: Date | null) => {
        setSelectedDate(date);
        setSelectedTime(date);
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
    };

    const uniqueLocations = Array.from(new Set(ResponsesData.map((data: any) => data.location)));

    const dateSelect = selectedDate ? `${format(selectedDate, "dd/MM/yyyy")}` : "";
    const timeSelect = selectedTime ? `${format(selectedTime, "hh:mm a")}` : "";

    // Filtered data based on selected filters
    const filteredData = ResponsesData.filter((data: any) => {
        const matchesDate = dateSelect ? data?.date === dateSelect : true;
        const matchesTime = timeSelect ? data?.time === timeSelect : true;
        const matchesLocation = selectedLocation ? data?.location === selectedLocation : true;
        return matchesDate && matchesTime && matchesLocation;
    });

    const [modalData, setModalData] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (data: any) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-1 overflow-y-scroll relative hiddenScroll">
                <h3 className="font-semibold text-[20px]">Responses</h3>

                {/* heading */}
                <div className="w-full flex justify-between pt-4 pb-3 items-center">
                    <h3 className="font-bold text-[20px]">{filteredData.length} Records</h3>
                    <button onClick={() => window.location.reload()} className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#FFBE00]"><IoReloadOutline className="size-[20px] text-black" /></button>
                </div>

                {/* table */}
                <div className="overflow-x-auto w-full mt-5">
                    {/* Table header */}
                    <table className="min-w-full leads-table">
                        <thead className="text-black text-[15px] border-y border-black">
                            <tr>
                                <th className="py-3 px-3 text-left font-semibold">Name</th>
                                <th className="py-3 px-3 text-left font-semibold">Project Title</th>
                                <th className="py-3 px-3 text-left font-semibold">Location</th>
                                <th className="py-3 px-3 text-right font-semibold">
                                    <div className="flex justify-end gap-2 items-center">
                                        <h5 className="flex gap-2 items-center">Filter By: <IoFilterSharp className="size-[20px] text-black" /></h5>
                                        {/* Date/Time Picker */}
                                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md w-[200px] xl:w-[254px] py-1 px-2">
                                            <label htmlFor="dateTime" className="text-gray-700">Date/Time:</label>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={handleDateTimeChange}
                                                showTimeSelect
                                                timeFormat="hh:mm aa"
                                                timeIntervals={15}
                                                dateFormat="dd/MM/yyyy | hh:mm aa"
                                                placeholderText="Select Date | Time"
                                                className="p-1 w-full font-normal outline-none"
                                                id="dateTime"
                                            />
                                        </div>

                                        {/* Location Picker */}
                                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md w-[200px] xl:w-[254px] py-1 px-2">
                                            <label htmlFor="location" className="text-gray-700">Location:</label>
                                            <select defaultValue="Select" name="location" id="location" className="font-normal w-full capitalize py-1 outline-none bg-transparent" onChange={handleLocationChange}>
                                                <option value="Select" disabled>Select location</option>
                                                {
                                                    uniqueLocations?.map((data: any, i: number) => (
                                                        <option key={i} value={data}>{data}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        {/* Table body */}
                        <tbody>
                            <tr className="h-4"></tr>
                            {
                                filteredData.map((data: any, i: number) => (
                                    <tr key={i} className="bg-[#07242B] text-white border-y-8 border-white">
                                        {/* Username column */}
                                        <td className="py-4 px-3 text-[17px] xl:text-[20px] font-semibold capitalize">
                                            {data?.userDisplayName}
                                        </td>
                                        {/* Project title column */}
                                        <td className="py-2 px-3 text-[15px] xl:text-[17px] text-[#ACACAC] capitalize">
                                            {data?.projectTitle}
                                        </td>
                                        {/* Location column */}
                                        <td className="py-2 px-3 text-[15px] xl:text-[17px] text-[#ACACAC] capitalize">
                                            <div className="flex gap-3 items-center">
                                                <RiMapPin5Fill className="text-[#FFBE00]" />
                                                <p>{data?.location}</p>
                                            </div>
                                        </td>
                                        {/* Date/Time and Responses column */}
                                        <td className="py-2 px-3 text-right">
                                            <div className="text-[10px] xl:text-[14px] text-[#ACACAC] flex items-center justify-between">
                                                <p>Date/Time: {data?.date} | {data?.time}</p>
                                                <p className="text-[#FFBE00]">{data?.pendingResponse} of {data?.totalResponse} Responses</p>
                                                <button onClick={() => openModal(data)} className="py-[5px] px-5 bg-[#FFBE00] rounded-md text-black font-semibold hover:bg-[#d3a416] transition-all duration-300">View Responses</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div>
                        {/* modal */}
                        {modalData && (
                            <ResponsesModal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                content={
                                    <div className="py-3 px-2">
                                        <div className="flex justify-between pb-2">
                                            <div className="flex">
                                                <img className="w-[60px] h-[60px] object-cover" src={modalData?.userPhoto} alt="work alat" />

                                                <div className="px-2">
                                                    <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center">{modalData?.userDisplayName} <span className="text-sm font-thin lowercase flex gap-0 items-center"><HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" />
                                                        <GiCheckedShield className="size-[12px] text-[#F76C10]" /></span></h2>
                                                    <p className="text-sm font-semibold capitalize">Project title: {modalData.projectTitle}</p>
                                                </div>
                                            </div>

                                            <p className="text-[#FFBE00] text-[12px]">{modalData?.pendingResponse} of {modalData?.totalResponse} Responses</p>
                                        </div>

                                        <div className="pt-3 overflow-x-hidden overflow-y-scroll hiddenScroll h-[300px]">
                                            <ul className="py-1">
                                                {
                                                    modalData?.responses?.map((response: any, i: number) => (
                                                        <li className="p-3 my-2 rounded-sm bg-[#F3F3F3]" key={i}>
                                                            <div className="flex justify-between items-start pb-2">
                                                                <div className="flex">
                                                                    <img className="w-[45px] h-[45px] object-cover" src={modalData?.userPhoto} alt="work alat" />

                                                                    <div className="px-2">
                                                                        <h2 className="capitalize font-semibold text-[13px] flex gap-1 items-center">{modalData?.userDisplayName} <span className="text-sm font-thin lowercase flex gap-0 items-center"><HiMiniCheckBadge className="size-[13px] text-[#29B1FD]" />
                                                                        </span></h2>
                                                                        <div className="flex py-px">
                                                                            <div className="flex gap-[3px] items-center">
                                                                                {
                                                                                    [...Array(response?.ratings)].map((_, i) => (
                                                                                        <FaStar key={i} className="size-[10px] text-amber-300" />
                                                                                    ))
                                                                                }
                                                                                <p className="text-[12px]">{parseFloat(response?.ratings).toFixed(1)}</p>
                                                                            </div>
                                                                            <div className="capitalize flex items-center gap-0.5 px-2 text-[12px]"><img className="size-[13px]" src="/flag.png" alt="workalat" /><p>{modalData?.location}</p></div>
                                                                        </div>
                                                                        <p className="text-sm font-semibold capitalize text-[10px]">Project title: {modalData.projectTitle}</p>
                                                                    </div>
                                                                </div>


                                                                {
                                                                    response?.status == "declined" ? <button className="block bg-[#F52933] px-4 text-[12px] font-semibold py-2 rounded-md hover:bg-[#f52933dc] transition-all duration-300 text-white">Declined</button> : response?.status == "pending" ? <button className="block bg-[#ffbe00] px-4 text-[12px] font-semibold py-2 rounded-md hover:bg-[#bf9c34] transition-all duration-300 text-white">Approve</button> : response?.status == "approved" && <button className="block bg-[#00a770] px-4 text-[12px] font-semibold py-2 rounded-md hover:bg-[#34b78c] transition-all duration-300 text-white">Approved</button>
                                                                }
                                                            </div>

                                                            <p className="text-[13px]">{response?.content}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                }
                            />
                        )
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}
