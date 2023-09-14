

export const RightDrawer = (props) => {
    return (
        <div className={props.hidden ? `${props.hidden}:hidden` : ""}>
            <div
                className={
                    props.show ?
                        "fixed top-0 visible right-0 w-full h-[100vh] z-[90] transition-all duration-300 bg-black opacity-75" :
                        "fixed top-0 invisible right-0 w-full h-[100vh] z-[90] transition-all duration-300 bg-black opacity-0"
                }
                onClick={props.onClick}
            />

            <div className={
                props.show ?
                    "fixed overflow-y-auto top-0 right-0 w-[100%] lg:w-[680px] h-[100vh] shadow-lg bg-white z-[100] transition-all duration-300" :
                    "fixed overflow-y-auto top-0 right-[-100%] lg:w-[680px] h-[100vh] shadow-lg bg-white z-[100] transition-all duration-300"
            }
            >
                {props.children}
            </div>
        </div>
    )
}