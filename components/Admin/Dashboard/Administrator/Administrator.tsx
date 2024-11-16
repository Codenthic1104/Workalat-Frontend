'use client'

import { allAdmins } from "@/utils/usersData";
import { useEffect, useState } from "react";
import Menus from "../Menus/Menus";
import { FaArrowRight } from "react-icons/fa6";
import { AiFillCloseSquare, AiOutlineControl } from "react-icons/ai";
import AdministratorModal from "./AdministratorModal";

export default function Administrator() {
    // here users will be dynamically form the backend. for now i useing "import {allAdmins} from "@utils/usersData"" as a demo users data

    // States for user data, filtering, and search
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // To filter by user type
    const [filteredUsers, setFilteredUsers] = useState(allAdmins); // For the filtered data

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

    // Filtering users based on the selected user type
    useEffect(() => {
        let result = allAdmins;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user) => user.status.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isADModalOpen, setIsADModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModalAD = () => {
        setIsADModalOpen(true);
    };

    const closeModalAD = () => {
        setIsADModalOpen(false);
    };
    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Administrators</h4>
                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h3 className="text-black font-bold text-[20px]">{filteredUsers?.length} Records</h3>

                    <div className="flex items-center gap-3 justify-end">
                        <select
                            name="users"
                            className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option className="bg-[#07242B] text-white" value="all">All Users</option>
                            <option className="bg-[#07242B] text-white" value="user admin">User Admin</option>
                            <option className="bg-[#07242B] text-white" value="system admin">System Admin</option>
                        </select>

                        <button onClick={openModal} className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#07242B] text-white">Create Admin <FaArrowRight className="size-[15px] text-white" /></button>
                    </div>
                </div>

                <div className="w-full pt-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="py-2 border-y border-black">
                                <tr>
                                    <th className="p-4 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4"
                                        />
                                    </th>
                                    <th className="p-6  text-left"></th>
                                    <th className="p-4 text-left">Username</th>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Level</th>
                                    <th className="p-4 text-left"></th>
                                    <th className="p-4 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user:any) => (
                                    <tr key={user?.id} className="border-b border-black">
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
                                            <p className="text-[15px]">{user?.username}</p>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-bold capitalize text-[20px]">{user?.userDisplayName}</p>
                                                <p className="text-gray-500 text-[15px]">{user?.userEmail}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.status}</td>
                                        <td className="p-4 text-[15px] capitalize">{user?.country}</td>
                                        <td className="p-4">
                                            {/* this is manage button. in this figma i didn't seeing what will open here but i think it must would be dynamic and connected with backend */}
                                            <button onClick={openModalAD} className="bg-[#FFBE00] text-black px-4 py-3 rounded flex justify-center items-center gap-2 text-[15px]">
                                                <AiOutlineControl className="rotate-90 text-black size-[15px] xl:size-[20px]" /> Manage
                                            </button>
                                        </td>
                                        <td className="p-4"></td>
                                        <td className="p-4"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* modal */}

                        {/* in this modal have form for create admin. so here form i did with demo data but it need to make dynamic with backend and make for CRUD operation */}
                        {isModalOpen && (
                            <AdministratorModal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                content={
                                    <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                                        <div className="bg-white w-full h-auto sm:w-[420px] p-3 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                            <button className="ms-auto block" onClick={closeModal}>
                                                <AiFillCloseSquare className="size-[20px]" />
                                            </button>
                                            <div className="w-full text-center">
                                                <h4 className="font-semibold text-[20px]">Create Admin</h4>
                                                <form className="w-full">
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="fullName" className="block pb-2 font-semibold">Full Name</label>
                                                        <input type="text" id="fullName" name="fullName" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" placeholder="Name" />
                                                    </div>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="username" className="block pb-2 font-semibold">Username</label>
                                                        <input type="text" id="fullName" name="username" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" placeholder="username" />
                                                    </div>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="password" className="block pb-2 font-semibold">Password</label>
                                                        <input type="password" id="password" name="password" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" placeholder="***********" />
                                                    </div>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="level" className="block pb-2 font-semibold">Level</label>
                                                        <select name="status" id="level" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2">
                                                            <option value="Select">Select</option>
                                                            <option value="finance">Finance</option>
                                                            <option value="support">Support</option>
                                                            <option value="sales">Sales</option>
                                                            <option value="audit">Audit</option>
                                                        </select>
                                                    </div>

                                                    <div className="py-2 text-start">
                                                        <button className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#FFBE00]">Create Admin <FaArrowRight className="size-[15px] text-black" /></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        )}


                        <AdministratorModal
                            isOpen={isADModalOpen}
                            onRequestClose={closeModalAD}
                            content={
                                <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                                    <div className="bg-white w-full h-auto sm:w-[420px] p-3 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                        <button className="ms-auto block" onClick={closeModalAD}>
                                            <AiFillCloseSquare className="size-[20px]" />
                                        </button>
                                        <div className="w-full text-center">
                                            <h4 className="font-semibold text-[20px]">Manage Admin</h4>
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="fullName" className="block pb-2 font-semibold">Full Name</label>
                                                    <input type="text" id="fullName" name="fullName" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" placeholder="Name" />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="level" className="block pb-2 font-semibold">Level</label>
                                                    <select name="status" id="level" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2">
                                                        <option value="Select">Select</option>
                                                        <option value="finance">Finance</option>
                                                        <option value="support">Support</option>
                                                        <option value="sales">Sales</option>
                                                        <option value="audit">Audit</option>
                                                    </select>
                                                </div>

                                                <div className="py-2 text-start flex gap-5">
                                                    <button className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#FFBE00]">Save <FaArrowRight className="size-[15px] text-black" /></button>
                                                    <button className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#f6464f] text-white">Delete</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
