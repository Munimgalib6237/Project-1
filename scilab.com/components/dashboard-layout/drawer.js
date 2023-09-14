
/* Required props */
// show
// onClick
// hidden

import { MenuItems } from "./MenuItems"

export const Drawer = (props) => {
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
                    <MenuItems />
                </div>
            </div>
        </div>

    );
};
