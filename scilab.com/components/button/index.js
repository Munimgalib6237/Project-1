
export const PrimaryButton = (props) => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type || "button"}
            className={`bg-primary px-6 py-[10px] rounded-[4px] transition-all disabled:bg-secondary ${props?.className}`}
        >
            <p className="text-sm font-medium text-white">{props.children}</p>
        </button>
    )
}

export const DangerButton = (props) => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={`px-6 py-[10px] rounded-[4px] transition-all bg-orange-300 hover:bg-orange-400 disabled:bg-orange-200 ${props?.className}`}
        >
            <p className="text-sm font-medium text-white">{props.children}</p>
        </button>
    )
}

export const CircleIconButton = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`p-2 rounded-full transition-all text-gray-500 bg-gray-100 hover:bg-gray-200 ${props?.className}`}
        >
            {props.children}
        </button>
    )
}