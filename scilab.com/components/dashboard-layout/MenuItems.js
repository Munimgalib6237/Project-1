
import Link from "next/link"
import { useRouter } from "next/router"
import { Grid, BookOpen, Power, Home } from "react-feather"

export const MenuItems = () => {
    const router = useRouter()

    const isActive = path => {
        if (router.pathname === path) return true
        return false
    }

    const handleLogout = () => {
        localStorage.clear()
        router.push("/")
    }

    return (
        <>
            <Link href="/">
                <a>
                    <button
                        type="button"
                        className={isActive("/") ?
                            "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-white bg-primary" :
                            "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-gray-500"
                        }
                    >
                        <div className="flex">
                            <div className="mr-2"><Home size={18} /></div>
                            <div><p className="text-sm font-normal">Home</p></div>
                        </div>
                    </button>
                </a>
            </Link>

            <Link href="/dashboard">
                <a>
                    <button
                        type="button"
                        className={isActive("/dashboard") ?
                            "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-white bg-primary" :
                            "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-gray-500"
                        }
                    >
                        <div className="flex">
                            <div className="mr-2"><Grid size={18} /></div>
                            <div><p className="text-sm font-normal">Dashboard</p></div>
                        </div>
                    </button>
                </a>
            </Link>

            <Link href="/dashboard/publication">
                <a>
                    <button
                        type="button"
                        className={isActive("/dashboard/publication") ?
                            "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-white bg-primary" :
                            "w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-gray-500"
                        }
                    >
                        <div className="flex">
                            <div className="mr-2"><BookOpen size={18} /></div>
                            <div><p className="text-sm font-normal">Publication</p></div>
                        </div>
                    </button>
                </a>
            </Link>

            <button
                type="button"
                className="w-full px-3 py-[10px] rounded-[4px] transition-all text-left text-gray-500"
                onClick={handleLogout}
            >
                <div className="flex">
                    <div className="mr-2"><Power size={18} /></div>
                    <div><p className="text-sm font-normal">Logout</p></div>
                </div>
            </button>
        </>
    )
}