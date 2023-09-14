
export const DashboardCover = ({ text }) => {
    return (
        <div className="w-full relative">
            <div className="h-[180px] lg:h-[200px] rounded-lg overflow-hidden">
                <img
                    src="/static/cover.jpg"
                    alt="..."
                    className="w-full min-h-[180px] lg:min-h-[200px]"
                />
            </div>

            <div className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full -bottom-[40px] sm:-bottom-[60px] shadow-lg right-[10px] sm:right-[40px] overflow-hidden">
                <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] text-center flex flex-col items-center justify-center bg-primary">
                    <p className="text-5xl sm:text-6xl font-extrabold uppercase text-white">{text.charAt(0)}</p>
                </div>
            </div>
        </div>
    )
}