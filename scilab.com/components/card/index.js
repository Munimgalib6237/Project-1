
export const Card = (props) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm p-3 lg:p-4 ${props.className}`}>
            {props.children}
        </div>
    );
};
