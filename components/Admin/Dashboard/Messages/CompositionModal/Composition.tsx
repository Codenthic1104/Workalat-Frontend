"use client"

import { AiFillCloseSquare } from "react-icons/ai"
import CompositionModal from "./CompositionModal"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { useState } from "react"
import CompositionLoader from "@/utils/CompositionLoader"
import Link from "next/link"
import { allUsersData } from "@/utils/usersData"
import { IoSearchSharp } from "react-icons/io5"

type PropsType = {
    closeModal: any,
    isOpen: any
}

export default function Composition({ closeModal, isOpen }: PropsType) {

    const [accountType, setAccountType] = useState<any>();
    const [userType, setUserType] = useState<string | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>();
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Filtering logic based on selected userType and searchTerm
    const filteredUsers = allUsersData.filter(user => {
        if (userType === 'All') {
            return user.userDisplayName.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return user.status === userType && user.userDisplayName.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const [subject, setSubject] = useState<any>();
    const [message, setMessage] = useState<any>();

    const [messageSending, setMessageSending] = useState<boolean>(false);
    const [messageSent, setMessageSent] = useState<boolean>(false);

    const composeMessage = (e: any) => {
        e.preventDefault();
        setMessageSending(true);

        // Simulate sending message for 2 seconds for demo but it will dynamically with backend in real time
        setTimeout(() => {
            setMessageSending(false);
            setMessageSent(true);
        }, 2000); // 2 seconds i set as demo for now
    };

    return (
        <div>
            <CompositionModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                content={
                    <div className="w-full max-h-[90vh] flex gap-3 justify-center items-start h-screen sm:max-h-[90vh] sm:h-auto overflow-y-scroll hiddenScroll">
                        <div className="bg-white w-full h-full md:w-[420px] p-3 rounded-md overflow-y-auto hiddenScroll">
                            <button className="ms-auto block" onClick={closeModal}>
                                <AiFillCloseSquare className="size-[20px]" />
                            </button>
                            <div className="w-full text-center">
                                <h4 className="font-semibold text-[20px]">Compose Email</h4>
                                <form onSubmit={composeMessage} className="w-full">
                                    <div className="py-2 text-start">
                                        <label htmlFor="account" className="block pb-2 font-semibold">Account</label>
                                        <select name="account" onChange={(e: any) => setAccountType(e.target.value)} id="account" className="w-full ring-[1px] ring-gray-400 outline-none border-none rounded-md px-3 py-2">
                                            <option value="support">Support</option>
                                            <option value="system">System</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                    <div className="py-2 text-start">
                                        <label htmlFor="recipient" className="block pb-2 font-semibold">Recipient</label>
                                        <select name="recipient" onChange={(e: any) => setUserType(e.target.value)} id="recipient" className="w-full ring-[1px] ring-gray-400 outline-none border-none rounded-md px-3 py-2">
                                            <option value="all">All User</option>
                                            <option value="client">Client</option>
                                            <option value="professional">Professional</option>
                                        </select>
                                    </div>
                                    <div className="py-2 text-start">
                                        <label htmlFor="subject" className="block pb-2 font-semibold">Subject</label>
                                        <input required type="text" id="subject" onChange={(e: any) => setSubject(e.target.value)} name="subject" className="w-full ring-[1px] ring-gray-400 outline-none border-none rounded-md px-3 py-2" />
                                    </div>


                                    <div className="text-start relative">
                                        <label htmlFor="search" className="block pb-2 font-semibold">Search User</label>

                                        {/* Input field */}
                                        <div className="flex w-full ring-[1px] ring-gray-400 outline-none border-none rounded-md px-3 py-2 items-center">
                                            <input
                                                type="search"
                                                id="search"
                                                value={selectedUser ? selectedUser.userDisplayName : searchTerm}
                                                onFocus={() => setDropdownVisible(true)}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value);
                                                    setDropdownVisible(true);
                                                    setSelectedUser(null); // Reset selected user when searching again
                                                }}
                                                className="bg-transparent border-none outline-none ring-0 flex-1 flex-grow"
                                            />
                                            <IoSearchSharp className="size-[17px] text-black/50" />
                                        </div>

                                        {/* Dropdown */}
                                        {isDropdownVisible && filteredUsers.length > 0 && (
                                            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto z-10">
                                                {filteredUsers.map((user, i) => (
                                                    <li
                                                        key={i}
                                                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                                        onClick={() => {
                                                            setSelectedUser(user); // Set the selected user
                                                            setDropdownVisible(false); // Hide the dropdown
                                                            setSearchTerm(''); // Clear the search term
                                                        }}
                                                    >
                                                        {user.userDisplayName}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Show a message when no users are found */}
                                        {isDropdownVisible && filteredUsers.length === 0 && searchTerm && (
                                            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 z-10">
                                                <li className="px-3 py-2">No users found</li>
                                            </ul>
                                        )}
                                    </div>

                                    <div className="py-2 text-start">
                                        <label htmlFor="message" className="block pb-2 font-semibold">Message</label>
                                        <textarea required id="message" name="message" onChange={(e: any) => setMessage(e.target.value)} className="w-full h-[100px] ring-[1px] bg-[#EFEFEF] ring-[#EFEFEF] outline-none border-none rounded-md px-3 py-2" />
                                    </div>

                                    <div className="py-2 text-start">
                                        <button className="py-3 px-4 w-full rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#FFBE00]">Send <FaArrowRight className="size-[15px] text-black" /></button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="bg-[#EDEDED] w-[310px] h-auto hidden md:block p-3 rounded-md overflow-y-auto hiddenScroll">
                            <h4 className="font-bold text-[15px] text-[#363636] pb-3">Message Preview</h4>

                            <div className="py-2">
                                {accountType && (
                                    <div className="flex gap-2 items-center capitalize">
                                        <h5 className="text-[17px] font-bold">Account:</h5>
                                        <p className="text-[15px] px-3 break-words whitespace-normal overflow-hidden">{accountType}</p>
                                    </div>
                                )}
                            </div>

                            <div className="py-2">
                                {userType && (
                                    <div className="flex gap-2 items-center capitalize">
                                        <h5 className="text-[17px] font-bold">Recipient:</h5>
                                        <p className="text-[15px] px-3 break-words whitespace-normal overflow-hidden">{selectedUser?.userDisplayName ? selectedUser?.userDisplayName : userType}</p>
                                    </div>
                                )}
                            </div>

                            <div className="py-2">
                                {subject && (
                                    <div className="flex gap-2 items-center capitalize">
                                        <h5 className="text-[17px] font-bold">Subject:</h5>
                                        <p className="text-[15px] px-3 break-words whitespace-normal overflow-hidden">{subject}</p>
                                    </div>
                                )}
                            </div>

                            <div className="py-2">
                                {message && (
                                    <div className="flex gap-2 items-center capitalize">
                                        <h5 className="text-[17px] font-bold">Message:</h5>
                                        <p className="text-[15px] px-3 break-words whitespace-normal overflow-hidden">{message}</p>
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>
                }
            />

            {messageSending && (
                <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-screen z-[300] bg-black/50 flex items-center justify-center">
                    <div className="w-10/12 sm:w-[450px] bg-white py-12 rounded-md">
                        <div className="flex items-center justify-center">
                            <CompositionLoader />
                        </div>
                        <h4 className="text-center text-[24px] font-semibold tracking-wider">
                            Sending Message
                        </h4>
                    </div>
                </div>
            )}

            {messageSent && (
                <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-screen z-[300] bg-black/50 flex items-center justify-center">
                    <div className="w-10/12 sm:w-[450px] bg-white py-12 rounded-md">
                        <div className="flex items-center justify-center">
                            <img className="w-[100px]" src="/successMessage.png" alt="work alat" />
                        </div>
                        <h4 className="text-center text-[24px] font-semibold tracking-wider py-3">
                            Message sent successfully.
                        </h4>
                        <Link href="/admin/messages" onClick={() => {
                            window.location.reload()
                        }} className="flex items-center bg-[#FFBE00] px-5 py-2 w-8/12 mx-auto justify-center gap-3">
                            <FaArrowLeft className="size-[15px] text-black" /> Back to Messages
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
