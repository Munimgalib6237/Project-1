
import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin } from "react-feather"
import { Images } from "../../utils/images"

export const Footer = () => {
    return (
        <div className="border-t px-3 md:px-0">
            <div className="container mx-auto py-[40px]">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 text-center lg:text-left">

                    {/* About */}
                    <div>
                        <Image
                            src={Images.Logo}
                            alt="logo"
                            width={150}
                            height={40}
                        />

                        <p className="text-sm text-gray-600 mt-2 mb-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-md text-gray-700 font-semibold mb-5">Contact</p>

                        <p className="text-sm text-gray-600 mb-0 inline-flex">
                            <Mail size={18} className="text-gray-300 mr-1" />
                            support@aurlab.com</p>
                        <br />

                        <p className="text-sm text-gray-600 mb-0 inline-flex">
                            <MapPin size={18} className="text-gray-300 mr-1" />Dhaka, Bangladesh</p>
                    </div>

                    {/* Privacy & policy */}
                    <div>
                        <p className="text-md text-gray-700 font-semibold mb-5">Policy & Info</p>

                        <div>
                            <Link href={"/about"}>
                                <a>
                                    <p className="text-sm transition-all text-gray-600 hover:text-primary mb-2">About Us</p>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/faq"}>
                                <a>
                                    <p className="text-sm transition-all text-gray-600 hover:text-primary mb-2">FAQs</p>
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* My Account */}
                    <div>
                        <p className="text-md text-gray-700 font-semibold mb-5">My Account</p>

                        <div>
                            <Link href={"/dashboard"}>
                                <a>
                                    <p className="text-sm transition-all text-gray-600 hover:text-primary mb-2">Dashboard</p>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/dashboard/publication"}>
                                <a>
                                    <p className="text-sm transition-all text-gray-600 hover:text-primary mb-2">Publications</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
