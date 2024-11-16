"use client";
import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/navbar";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import logo_dark from "@/public/logo_dark.png";
import logoutIcon from "@/public/icons/logout.svg";
import settingsIcon from "@/public/icons/settings.svg";
import notificationsIcon from "@/public/icons/notifications.svg";
import switchIcon from "@/public/icons/switch.svg";
import testimonial3Img from "@/public/images/testimonial3.png";
import businessIcon from "@/public/icons/business.svg";
import { TiArrowSortedUp } from "react-icons/ti";
import { FaBell } from "react-icons/fa6";
import { usePathname } from "next/navigation";


const AdminNavbar = () => {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = React.useState(false);

    const avatarDropdownMenu = [
        {
            key: "logout",
            icon: logoutIcon,
            text: "Logout",
            href: "/logout",
        },
    ];

    return (
        <Navbar
            className="bg-main border-b border-dark border-opacity-20"
            position="sticky"
            maxWidth="full"
        >
            <NavbarBrand>
                <Link href="/" className="">
                    <Image width={1000} height={1000} alt="WhatWorks" className="w-24" src={logo_dark} />
                    {/*<span className={clsx("font-semibold font-sans text-white", fontSans.variable)}>
                        WhatWorks
                    </span>*/}
                </Link>
            </NavbarBrand>
            <NavbarContent as="div" justify="end">
                <NavbarItem className="cursor-pointer ml-6 flex gap-2 items-center" onClick={() => setOpenDropdown(!openDropdown)}>
                    <FaBell className="size-4 text-white" />
                    <span className="text-sm text-white sm:text-base px-2">Anita Maika</span>
                    <Avatar src={testimonial3Img.src} className="w-8 h-8" />
                    <TiArrowSortedUp className={`size-5 text-secondary transition-transform ${openDropdown ? "transform rotate-0" : "transform rotate-180"}`} />
                </NavbarItem>
                <Box>
                    {openDropdown && (
                        <Box className="absolute right-0 top-14 bg-white border border-dark border-opacity-20 shadow-lg rounded-md px-4 py-2">
                            {avatarDropdownMenu.map((menu) => (
                                <Link key={menu.key} href={menu.href} className={menu.key === "projects" ? "md:hidden" : ""}>
                                    <Box
                                        className={`flex items-center gap-4 p-2 px-3 ${menu.key === "logout" ? "" : "border-b"} border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                                    >
                                        <div className="p-2 bg-main rounded-md">
                                            <Image className="w-5" width={1000} height={1000} src={menu.icon} alt={menu.text} />
                                        </div>
                                        <span
                                            className={
                                                menu.key === "logout" ? " !text-red font-semibold" : ""
                                            }
                                        >
                                            {menu.text}
                                        </span>
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    )}
                </Box>
            </NavbarContent>
        </Navbar>
    );
};

export default AdminNavbar;
