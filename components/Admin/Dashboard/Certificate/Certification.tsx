'use client'

import { useEffect, useState } from "react";
import Menus from "../Menus/Menus"
import { certificate } from "@/utils/certificationData";
import CertificationModal from "./CertificationModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";
import { PiFilesDuotone } from "react-icons/pi";

export default function Certification() {
    // here users will be dynamically from the backend. for now i using "import {certificate} from "@utils/certificationData"" as a demo certificate users data

    // States for user data, filtering
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // To filter by user type
    const [filteredUsers, setFilteredUsers] = useState(certificate); // For the filtered data

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
        let result = certificate;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user) => user.userType.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);

    // modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any>();

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
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Certification</h4>
                {/* users type selector */}


                {/* header */}
                <div className="flex justify-end items-center pt-5">
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
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">User ID</th>
                                    <th className="p-4 text-left">Date Submitted</th>
                                    <th className="p-4 text-left">Time</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user?.id} className="border-b border-black">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user?.id)}
                                                onChange={() => toggleSelectUser(user?.id)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.firstName} {user?.lastName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{user?.id}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.orderDate}</td>
                                        <td className="p-4 text-[15px] capitalize">{user?.orderTime}</td>
                                        <td className={`p-4 text-[15px] capitalize ${user?.status == "approved" ? "text-[#04842F]" : user?.status == "pending" ? "text-[#FFBE00]" : user?.status == "declined" && "text-[#FE321F]"}`}>{user?.status}</td>
                                        <td className="p-4">
                                            <button onClick={() => openModal(user)} className="bg-transparent border-2 border-[#FFBE00] text-black px-4 py-2 font-semibold rounded flex justify-center items-center gap-2 text-[15px]">Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* modal */}

                        {/* in this modal have form for manage order. so here form i did with demo data but it need to make dynamic with backend and make for CRUD operation */}
                        {modalData && (
                            <CertificationModal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                content={
                                    <div className="w-full max-h-[80vh] h-screen sm:max-h-[80vh] sm:h-auto overflow-y-auto hiddenScroll">
                                        <div className="bg-white w-full h-auto sm:w-[520px] p-3 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                            <button className="ms-auto block" onClick={closeModal}>
                                                <IoCloseCircleOutline className="size-[20px]" />
                                            </button>
                                            <div className="w-full text-center">
                                                <h4 className="font-semibold text-[20px] capitalize">Manage Certification</h4>
                                                <div className="w-[250px] h-2 bg-slate-200 rounded-md mx-auto my-4">
                                                    <div className={`w-full transition-all duration-300 rounded-md h-full bg-black`}></div>
                                                </div>
                                            </div>
                                            <div className="w-full border border-black rounded-md py-2 px-3">
                                                <div className="pt-1 flex flex-wrap">
                                                    <div className="py-2 w-full px-1">
                                                        <label className="block pb-1">Certificate</label>
                                                        <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" defaultValue={modalData?.certificationName} />
                                                    </div>
                                                    <div className="py-2 w-full px-1">
                                                        <label className="block pb-1">Expiration Date</label>
                                                        <div className="flex flex-wrap gap-3">
                                                            <input className="w-full md:w-[48.5%] border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" placeholder="Month" />
                                                            <input className="w-full md:w-[48.5%] border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" placeholder="Year" />
                                                        </div>
                                                    </div>
                                                    <div className="py-2 w-full px-1">
                                                        <label className="block pb-1">Uploaded File</label>
                                                        <div className="flex justify-between items-center">
                                                            <div className="w-auto flex gap-2">
                                                                <PiFilesDuotone className="size-[25px] text-black/60" /> <p>{modalData?.uploadedFile?.fileName}</p>
                                                            </div>
                                                            <button className="border rounded-md outline-none py-1 px-2 border-black/50">View</button>
                                                        </div>
                                                    </div>
                                                    <div className="pt-2 pb-1 px-1 w-full">
                                                        <form className="w-full">
                                                            <label htmlFor="comment" className="pb-1 block">Comment</label>
                                                            <textarea name="comment" id="comment" className="w-full h-32 outline-none border border-black/50 rounded-md px-2 py-1 text-[15px]" placeholder="Comment"></textarea>
                                                        </form>

                                                        <div className="flex gap-2 pt-3 flex-col sm:flex-row w-full">
                                                            <button className="text-black font-semibold px-4 py-2 bg-[#FFBE00] rounded-md w-full sm:w-1/2">Approve</button>
                                                            <button className="text-white font-semibold px-4 py-2 bg-[#FE321F] flex items-center justify-center rounded-md w-full sm:w-1/2"><AiFillCloseSquare className="size-[15px] text-white" /> Reject</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
