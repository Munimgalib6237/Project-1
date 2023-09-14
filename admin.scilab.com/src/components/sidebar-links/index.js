
import { Power } from "react-feather"
import { NavLink, useHistory } from 'react-router-dom'

export const SidebarLinks = ({ routes }) => {
    const hustory = useHistory()

    const handleLogout = () => {
        localStorage.clear()
        hustory.push("/")
    }

    return (
        <div>
            {routes.map((item, i) => {
                return (
                    item.inDrawer ?
                        <NavLink
                            to={item.path}
                            exact={item.exact}
                            key={i}
                            activeClassName="bg-orange-100"
                            className="px-3 py-[12px] mb-2 block text-[15px] text-orange-500 font-medium rounded-md hover:bg-orange-100 w-full text-left transition-all"
                        >
                            <div className="flex">
                                <div>{item.icon}</div>
                                <div className="ml-2">{item.title}</div>
                            </div>
                        </NavLink>
                        : null
                )
            }
            )}

            <button
                type="button"
                className="px-3 py-[12px] mb-2 block text-[15px] text-orange-500 font-medium rounded-md hover:bg-orange-100 w-full text-left transition-all"
                onClick={() => handleLogout()}
            >
                <div className="flex">
                    <div><Power size={20} /></div>
                    <div className="ml-2">Logout</div>
                </div>
            </button>
        </div>
    )
}