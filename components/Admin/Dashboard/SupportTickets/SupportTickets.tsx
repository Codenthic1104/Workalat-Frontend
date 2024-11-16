'use client'

import { ticketsData } from "@/utils/TicketsData";
import { useEffect, useState } from "react";
import Menus from "../Menus/Menus";
import { MdDelete } from "react-icons/md";
import { RiCloseFill, RiRefreshLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

export default function SupportTickets() {
    // here tickets data will be dynamically from the backend. for now i using "import { ticketsData } from "@/utils/TicketsData";" as a demo tickets data

    // States for user data, filtering
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // Filter by user type
    const [filteredUsers, setFilteredUsers] = useState(ticketsData); // Filtered data

    // Toggle select all users
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map((user: any) => user.id));
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
        let result = ticketsData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user: any) => user.userType.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);
    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Support Tickets</h4>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px]">{ticketsData?.length} Records</h4>
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
                <div className="h-[1px] w-full bg-black mt-5"></div>
                <div className="py-2 w-full">
                    <div className='flex gap-4 justify-end items-center pb-[10px]'>
                        {/* button for refresh */}
                        <button onClick={() => window.location.reload()} className="flex justify-center items-center px-5 py-3 rounded-md bg-white text-[#07242B] border border-[#07242B] "><RiRefreshLine className="size-[15px]" /></button>
                        {/* open new ticket button */}
                        <Link href="/admin/support-tickets/create-tickets" className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-[#07242B] text-white text-[15px] font-semibold">Open New Ticket<FaArrowRight className="size-3" /></Link>
                        {/* all tickets */}
                        <button className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-white text-[#07242B] border border-[#07242B] text-[15px] font-bold ">All Tickets<FaArrowRight className="size-3" /></button>
                    </div>
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
                                    <th className="p-4 text-left">Tickets</th>
                                    <th className="p-4 text-left">Related projects</th>
                                    <th className="p-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user: any) => (
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
                                            <img src={user?.userPhoto} alt={user?.userDisplayName} className="w-12 h-12 rounded-full mr-2 object-cover" />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.firstName} {user?.lastName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{user?.ticket} | {user?.orderTime}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.relatedProject}</td>
                                        <td className="p-4">
                                            {/* this button will be connected with backend for some function or operation and it will dynamic */}
                                            {
                                                user?.status == "waiting" ? <Link href={`/admin/support-tickets/view/${user?.id}`} className="flex gap-2 justify-center items-center px-2 py-2 rounded-md bg-[#7A7A7A] text-white text-[15px] font-semibold w-[200px]"><RiCloseFill className="size-[15px] rounded-sm text-[#07242B] bg-white" />Waiting on Customer</Link> : user?.status == "closed" && <Link href={`/admin/support-tickets/view/${user?.id}`} className="px-4 py-2 rounded-md bg-[#00A770] text-white text-[15px] font-semibold">Closed</Link>
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
    )
}
