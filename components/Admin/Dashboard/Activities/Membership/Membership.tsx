"use client"

import { activitiesData } from "@/utils/activitiesData";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Menus from "../../Menus/Menus";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

export default function Membership() {
    // States for user data, filtering, and search term
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // Filter by user type
    const [filteredUsers, setFilteredUsers] = useState(activitiesData); // Filtered data
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering

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

    // Filter users based on selected user type
    useEffect(() => {
        let result = activitiesData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user) => user.userType.toLowerCase() === userType);
        }

        // Filter by search term across multiple fields
        if (searchTerm) {
            result = result.filter(
                (user) =>
                    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.id.toString().includes(searchTerm) ||
                    user.activateDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (user.isMemberShip ? "Active" : "Cancelled").toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(result);
    }, [userType, searchTerm]);

    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <div className="flex justify-between items-start">
                    <h4 className="text-[20px] font-bold">Activities</h4>

                    <div className="flex gap-3 items-center">
                        <Link className="block bg-[#FFBE00] text-[15px] font-semibold text-black px-4 py-3 rounded-md" href="/admin/activities/">
                            Membership History
                        </Link>

                        <button className='bg-yellow-400 px-5 py-3 rounded-md font-semibold'>Download</button>
                    </div>
                </div>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px]">{filteredUsers?.length} Records</h4>

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
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* users type selector */}
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
                                    <th className="p-4 text-left">User ID</th>
                                    <th className="p-4 text-left">Date Activated</th>
                                    <th className="p-4 text-left">Current Status</th>
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
                                            <p className="text-gray-500 text-[15px] capitalize">{user?.id}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.activateDate}</td>
                                        <td className="p-4 text-[15px] capitalize">{
                                            user?.isMemberShip ? <p className="text-[13px] text-[#00A770] font-semibold">Active</p> : <p className="text-[13px] font-semibold text-[#C8102E]">Cancelled</p>
                                        }</td>
                                        <td className="p-4 text-end">
                                            {/* this button will be connected with backend for some function or operation */}
                                            {
                                                user?.isMemberShip ? <button className="bg-[#F52933] px-3 py-2 text-white font-semibold rounded-md flex items-center justify-center gap-1 mx-auto"><IoMdClose className="text-[17px] text-white" /> Cancel Membership</button>
                                                    :
                                                    <button className="bg-[#242424] mx-auto flex items-center justify-center px-4 py-2 text-white font-semibold rounded-md">Active Membership</button>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}