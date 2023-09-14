
import React from "react"
import { Menu } from "react-feather"
import { Images } from "../../utils/images"
import { ProfileDropdown } from "../dropdown/profile"

export const Navbar = (props) => {
    return (
        <div className="fixed top-0 left-0 w-full p-3 bg-white">
            <div className="flex">
                <div className="grow">
                    <button className="lg:hidden p-2 mt-1 rounded-full hover:bg-slate-200 focus:bg-slate-200"
                        onClick={props.onClick}
                    >
                        <Menu size={25} />
                    </button>
                </div>
                <div className="flex-none">
                    <ProfileDropdown
                        image={Images.UserAvatar}
                    />
                </div>
            </div>
        </div>
    );
};