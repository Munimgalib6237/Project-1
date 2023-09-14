import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import { appRoutes } from "../../routes"
import { Navbar } from "../../components/navbar"
import { Sidebar } from "../../components/sidebar"
import { Drawer } from "../../components/drawer"
import { SidebarLinks } from "../../components/sidebar-links"
import FourOFour from "../404"

const Index = () => {
    const [show, setShow] = useState(false)

    return (
        <div>
            <Navbar onClick={() => setShow(!show)} />
            <Sidebar routes={appRoutes} />
            <Drawer
                show={show}
                hidden={"lg"}
                onClick={() => setShow(!show)}
            >
                <div className="p-4">
                    <SidebarLinks routes={appRoutes} />
                </div>
            </Drawer>

            <div className="lg:pl-[260px] pt-[76px]">
                <div className="p-3 lg:p-4">
                    <Switch>
                        {appRoutes && appRoutes.map((item, i) =>
                            item.name && item.path ?
                                <Route
                                    key={i}
                                    exact={item.exact}
                                    path={item.path}
                                    component={item.component}
                                />
                                : item.children && item.children.length ? item.children.map((child, j) =>
                                    <Route
                                        key={j}
                                        exact={child.exact}
                                        path={child.path}
                                        component={child.component}
                                    />
                                ) : null)
                        }

                        <Route path="*" component={FourOFour} />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Index;