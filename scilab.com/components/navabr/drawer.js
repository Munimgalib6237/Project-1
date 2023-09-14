
/* Required props */
// show
// onClick
// hidden

import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Award, Globe, Home, UserPlus } from "react-feather"
import { isValidToken } from "../../utils/helper"

export const Drawer = (props) => {
    const router = useRouter()
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

    const isActive = path => {
        if (router.pathname === path) return true
        return false
    }

    return (
        <div className={props.hidden ? `${props.hidden}:hidden` : ""}>
            <div
                className={
                    props.show ?
                        "fixed top-0 visible left-0 w-full h-[100vh] z-[90] transition-all duration-300 bg-black opacity-75" :
                        "fixed top-0 invisible left-0 w-full h-[100vh] z-[90] transition-all duration-300 bg-black opacity-0"
                }
                onClick={props.onClick}
            />

            <div className={
                props.show ?
                    "fixed top-0 left-0 w-[300px] h-[100vh] shadow-lg bg-white z-[100] transition-all duration-300" :
                    "fixed top-0 left-[-300px] w-[300px] h-[100vh] shadow-lg bg-white z-[100] transition-all duration-300"
            }
            >

                <div className="p-3">
                    <Link href="/">
                        <a>
                            <button
                                type="button"
                                className={isActive("/") ?
                                    "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-white bg-primary" :
                                    "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-black"
                                }
                            >
                                <div className="flex">
                                    <div className="mr-2"><Home size={18} /></div>
                                    <div><p className="text-sm font-medium">Home</p></div>
                                </div>
                            </button>
                        </a>
                    </Link>

                    <Link href="/about">
                        <a>
                            <button
                                type="button"
                                className={isActive("/about") ?
                                    "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-white bg-primary" :
                                    "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-black"
                                }
                            >
                                <div className="flex">
                                    <div className="mr-2"><Award size={18} /></div>
                                    <div><p className="text-sm font-medium">About</p></div>
                                </div>
                            </button>
                        </a>
                    </Link>

                    <Link href="/researcher">
                        <a>
                            <button
                                type="button"
                                className={isActive("/researcher") ?
                                    "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-white bg-primary" :
                                    "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-black"
                                }
                            >
                                <div className="flex">
                                    <div className="mr-2"><Globe size={18} /></div>
                                    <div><p className="text-sm font-medium">Researcher</p></div>
                                </div>
                            </button>
                        </a>
                    </Link>

                    {!user ?
                        <Link href="/create-account">
                            <a>
                                <button
                                    type="button"
                                    className={isActive("/create-account") ?
                                        "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-white bg-primary" :
                                        "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-black"
                                    }
                                >
                                    <div className="flex">
                                        <div className="mr-2"><UserPlus size={18} /></div>
                                        <div><p className="text-sm font-medium">Create account</p></div>
                                    </div>
                                </button>
                            </a>
                        </Link>
                        : null
                    }
                </div>
            </div>
        </div>

    );
};
