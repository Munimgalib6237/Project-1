import React from 'react'
import { Images } from "../../utils/images"
import { SidebarLinks } from "../sidebar-links"

export const Sidebar = ({ routes }) => {
    return (
        <div className="w-[260px] fixed top-0 left-0 h-full bg-white hidden lg:block">

            {/* Header */}
            <div className="p-[12px]">
                <img
                    src={Images.Logo}
                    alt="Logo"
                    className="w-[150px] h-[40px] mx-auto"
                />
            </div>

            {/* Body */}
            <div className="p-4">
                <SidebarLinks routes={routes} />
            </div>
        </div>
    );
};