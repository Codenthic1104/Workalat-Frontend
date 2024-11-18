"use client"

import { activitiesData } from "@/utils/activitiesData";
import { useEffect, useState } from "react";
import Menus from "../Menus/Menus";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { GiCheckedShield } from "react-icons/gi";
import ActivitiesModal from "./ActivitiesModal";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";

export default function Activities() {
    // here users will be dynamically from the backend. for now i using "import { activitiesData } from "@/utils/activitiesData";" as a demo users data

    // States for user data, filtering
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // Filter by user type
    const [dataType, setDataType] = useState('all'); // Filter by data type
    const [filteredUsers, setFilteredUsers] = useState(activitiesData); // Filtered data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    // Toggle select all users
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map((user) => user.id));
        }
        setSelectAll(!selectAll);
    };

    // Toggle individual user selection
    const toggleSelectUser = (id: number) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    // Filter users based on selected user type, data type, and search term
    useEffect(() => {
        let result = activitiesData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user) => user.userType.toLowerCase() === userType);
        }

        // Filter by data type
        if (dataType !== 'all') {
            result = result.filter((user) => user.activity.toLowerCase() === dataType);
        }

        // Filter by search term
        if (searchTerm) {
            result = result.filter((user) =>
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(result);
    }, [userType, dataType, searchTerm]); // Watch userType, dataType, and searchTerm

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
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <div className="flex justify-between items-start">
                    <h4 className="text-[20px] font-bold">Activities</h4>

                    <div className="flex  gap-3 items-center">
                        <Link className="block bg-[#FFBE00] text-[15px] font-semibold text-black px-4 py-3 rounded-md" href="/admin/activities/membership">
                            Membership Activity
                        </Link>

                        <button className='bg-yellow-400 px-5 py-3 rounded-md font-semibold'>Download</button>
                    </div>
                </div>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px]">{activitiesData?.length} Records</h4>
                    {/* users type selector */}
                    <div className="flex gap-3">
                        <div className="flex items-center justify-end">
                            {/* search box */}
                            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 w-[250px]">
                                <AiOutlineSearch className="size-[18px] text-[#909090]" />
                                <input
                                    type="search"
                                    placeholder="Search here"
                                    className="outline-none bg-transparent ml-2 text-gray-500 placeholder-gray-400 w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                                />
                            </div>
                        </div>
                        <select
                            name="users"
                            className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option className="bg-[#07242B] text-white" value="all">All</option>
                            <option className="bg-[#07242B] text-white" value="client">Client</option>
                            <option className="bg-[#07242B] text-white" value="professional">Professional</option>
                        </select>
                        <select
                            name="dataType"
                            className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                            value={dataType}
                            onChange={(e) => setDataType(e.target.value)}
                        >
                            <option className="bg-[#07242B] text-white" value="all">All</option>
                            <option className="bg-[#07242B] text-white" value="lead purchase">Lead Purchase</option>
                            <option className="bg-[#07242B] text-white" value="wallet top up">Wallet Top Up</option>
                        </select>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-black mt-5"></div>
                <div className="py-2">
                    <p className="text-[15px] text-black/50 capitalize">Professional: <b>{userType}</b></p>
                </div>

                <div className="w-full pt-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="py-2 border-b border-black/20">
                                <tr>
                                    <th className="p-4 text-left">
                                        {selectedUsers.length > 0 ? (
                                            <div className="flex items-center">
                                                <span className="text-slate-600 font-semibold mr-2 text-[15px]">{selectedUsers.length} selected</span>
                                                {/* here will be functional for selected data for delete method for backend */}
                                                <MdDelete className="text-slate-500 cursor-pointer" size={15} />
                                            </div>
                                        ) : (
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4"
                                            />
                                        )}
                                    </th>
                                    <th className="p-6 text-left"></th>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Date/Time</th>
                                    <th className="p-4 text-left">Invoice ID</th>
                                    <th className="p-4 text-left">Activity</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user?.id} className="border-b border-black/20">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user?.id)}
                                                onChange={() => toggleSelectUser(user?.id)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-0">
                                            <img src={user?.userPhoto} alt="work alat" className="w-12 h-12 rounded-full mr-2 object-cover" />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.firstName} {user?.lastName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{user?.orderDate} | {user?.orderTime}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.invoiceId}</td>
                                        <td className="p-4 text-[15px] capitalize">{user?.activity}</td>
                                        <td className="p-4 text-[15px] capitalize">
                                            {user?.amount}
                                        </td>
                                        <td className={`p-4 text-[15px] capitalize ${user?.status == "successful" ? "text-[#04842F]" : user?.status == "pending" ? "text-[#FFBE00]" : user?.status == "cancelled" && "text-[#FE321F]"}`}>{user?.status}</td>
                                        <td className="p-4">
                                            {/* this button will be connected with backend for some function or operation */}
                                            <div className="flex justify-end gap-2 items-center">
                                                {
                                                    user?.isRefund && <button className="bg-[#FFBE00] px-4 py-2 text-white font-semibold rounded-md">Refund</button>
                                                }
                                                <button onClick={() => openModal(user)} className="bg-[#242424] px-8 py-2 text-white font-semibold rounded-md">View</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* modal */}
                {modalData && (
                    <ActivitiesModal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        content={
                            <div className="py-3 px-2">
                                <div className="flex pb-2">
                                    <img className="w-[60px] h-[60px] object-cover" src={modalData?.userPhoto} alt="work alat" />

                                    <div className="px-2">
                                        <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center">{modalData?.firstName} {modalData?.lastName} <span className="text-sm font-thin lowercase flex gap-0 items-center"><HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" />
                                            <GiCheckedShield className="size-[12px] text-[#F76C10]" /></span></h2>
                                        <p className="text-sm font-semibold capitalize">Invoice ID: {modalData.invoiceId}</p>
                                        <p className="text-sm font-semibold capitalize">Status: {modalData.status}</p>
                                    </div>
                                </div>

                                <div className="pt-3 mb-2 overflow-x-hidden overflow-y-scroll hiddenScroll h-[250px]">
                                    <ul className="py-1">
                                        <li className="py-1">
                                            <p className="font-semibold text-[15px]">Amount</p>
                                            <p className="text-[15px] text-[#323C47]">{modalData?.amount}</p>
                                        </li>
                                        <li className="py-1">
                                            <p className="font-semibold text-[15px]">Activity</p>
                                            <p className="text-[15px] text-[#323C47]">{modalData?.activity}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                    />)}
            </div>
        </div>
    );
}