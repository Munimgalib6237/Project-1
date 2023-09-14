
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Menu } from "react-feather"
import { Drawer } from "./drawer"
import { Images } from "../../utils/images"
import { isValidToken } from "../../utils/helper"
import { PrimaryButton, CircleIconButton } from "../button"

export const Navbar = () => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(async () => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("token")
            if (accessToken) {
                const tokenVerify = await isValidToken(accessToken)
                if (tokenVerify) {
                    setUser(tokenVerify)
                } else {
                    localStorage.clear()
                    router.push("/")
                }
            }
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full py-3 z-50 bg-white">
            <div className="container mx-auto">
                <div className="flex w-full">

                    {/* Logo */}
                    <div className="flex-none pt-1">
                        <Link href="/">
                            <a>
                                <Image
                                    src={Images.Logo}
                                    alt="Logo"
                                    width={150}
                                    height={40}
                                />
                            </a>
                        </Link>
                    </div>

                    {/* Page links */}
                    <div className="grow hidden lg:block">
                        <div className="flex justify-end pt-[11px]">
                            <div className="mr-2">
                                <Link href="/">
                                    <a>
                                        <p className="px-6 py-[8px] text-sm font-medium transition-all text-black hover:text-primary">Home</p>
                                    </a>
                                </Link>
                            </div>

                            <div className="mr-2">
                                <Link href="/about">
                                    <a>
                                        <p className="px-6 py-[8px] text-sm font-medium transition-all text-black hover:text-primary">About</p>
                                    </a>
                                </Link>
                            </div>

                            <div className="mr-2">
                                <Link href="/researcher">
                                    <a>
                                        <p className="px-6 py-[8px] text-sm font-medium transition-all text-black hover:text-primary">Researcher</p>
                                    </a>
                                </Link>
                            </div>

                            {!user ?
                                <div className="mr-2">
                                    <Link href="/create-account">
                                        <a>
                                            <p className="px-6 py-[8px] text-sm font-medium transition-all text-black hover:text-primary">Create account</p>
                                        </a>
                                    </Link>
                                </div>
                                : null
                            }
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="ml-auto">
                        <div className="flex pt-[10px]">

                            {!user ?
                                <div>
                                    <Link href="/login">
                                        <a>
                                            <PrimaryButton className="!rounded-full !py-[8px]">
                                                Login
                                            </PrimaryButton>
                                        </a>
                                    </Link>
                                </div>
                                :
                                <div>
                                    <Link href="/dashboard">
                                        <a>
                                            <button
                                                type="button"
                                                className="bg-primary rounded-full text-white font-extrabold text-md uppercase w-[36px] h-[36px] text-center"
                                            >
                                                {user ? user.charAt(0) : null}
                                            </button>
                                        </a>
                                    </Link>
                                </div>
                            }

                            <div className="ml-3 lg:hidden">
                                <CircleIconButton onClick={() => setShow(!show)}>
                                    <Menu size={20} />
                                </CircleIconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Drawer */}
            <Drawer
                show={show}
                hidden={"lg"}
                onClick={() => setShow(!show)}
            />
        </div>
    );
};
