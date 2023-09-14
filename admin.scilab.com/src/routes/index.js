
import {
    PieChart,
    List,
    Users,
    Book
} from "react-feather"

import Dashboard from "../pages/dashboard"
import CategoryIndex from "../pages/category"
import CategoryEdit from "../pages/category/edit"
import CategoryStore from "../pages/category/store"
import ResearcherIndex from "../pages/researcher"
import ResearcherShow from "../pages/researcher/show"
import PublicationIndex from "../pages/publication"
import AdminIndex from "../pages/admin"
import AdminStore from "../pages/admin/store"
import AccountIndex from "../pages/account"

export const appRoutes = [
    {
        title: "Dashboard",
        name: "dashboard",
        path: "/dashboard/",
        exact: true,
        inDrawer: true,
        icon: <PieChart size={20} />,
        component: Dashboard
    },

    // Category
    {
        title: "Category",
        name: "category index",
        path: "/dashboard/category",
        exact: true,
        inDrawer: true,
        icon: <List size={20} />,
        component: CategoryIndex
    },
    {
        title: "New Category",
        name: "category store",
        path: "/dashboard/category/store",
        exact: true,
        inDrawer: false,
        icon: null,
        component: CategoryStore
    },
    {
        title: "Edit Category",
        name: "category edit",
        path: "/dashboard/category/:id/edit",
        exact: true,
        inDrawer: false,
        icon: null,
        component: CategoryEdit
    },
    // Researcher
    {
        title: "Researcher",
        name: "researcher index",
        path: "/dashboard/researcher",
        exact: true,
        inDrawer: true,
        icon: <Users size={20} />,
        component: ResearcherIndex
    },
    {
        title: "Show Researcher",
        name: "researcher show",
        path: "/dashboard/researcher/:id",
        exact: true,
        inDrawer: false,
        icon: null,
        component: ResearcherShow
    },
    // Publication
    {
        title: "Publications",
        name: "publication index",
        path: "/dashboard/publication",
        exact: true,
        inDrawer: true,
        icon: <Book size={20} />,
        component: PublicationIndex
    },
    // Admin
    {
        title: "Admin list",
        name: "admin index",
        path: "/dashboard/admin",
        exact: true,
        inDrawer: true,
        icon: <Users size={20} />,
        component: AdminIndex
    },
    {
        title: "Admin create",
        name: "admin store",
        path: "/dashboard/admin/create",
        exact: true,
        inDrawer: false,
        icon: null,
        component: AdminStore
    },
    // My Account
    {
        title: "My account",
        name: "account index",
        path: "/dashboard/account",
        exact: true,
        inDrawer: false,
        icon: null,
        component: AccountIndex
    },
]