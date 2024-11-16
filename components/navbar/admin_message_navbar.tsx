"use client";
import React from "react";
import {
    Navbar,
    NavbarBrand,
} from "@nextui-org/navbar";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import logo_dark from "@/public/logo_dark.png";


const AdminMessageNav = () => {

    return (
        <Navbar
            className="bg-main border-b border-dark border-opacity-20"
            position="sticky"
            maxWidth="full"
        >
            <NavbarBrand>
                <Link href="/" className="flex justify-start items-center gap-1">
                    <Image alt="WhatWorks" className="w-24" src={logo_dark} />
                    {/* <span className={clsx("font-semibold font-sans text-white", fontSans.variable)}>
                        WhatWorks
                    </span> */}
                </Link>
            </NavbarBrand>
        </Navbar>
    );
};

export default AdminMessageNav;
