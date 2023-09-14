
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"

export const ProfileDropdown = ({ image }) => {
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="rounded-full">
                        <img
                            src={image}
                            alt="Admin avatar"
                            className="rounded-full w-[45px] h-[45px]"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-[200px] mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                        <div className="p-3">
                            <Menu.Item>
                                <Link to="/dashboard/account">
                                    <button className="px-3 py-2 w-full text-[15px] rounded-md text-orange-500 hover:bg-orange-100 transition ease-in-out delay-50 text-left">
                                        My Account
                                    </button>
                                </Link>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
