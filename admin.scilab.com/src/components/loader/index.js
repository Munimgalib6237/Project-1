
export const TableLoader = () => {
    return (
        <div className="p-4 w-full mx-auto">
            <div className="animate-pulse">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
            </div>
        </div>
    )
}


export const CategoryLoader = () => {
    return (
        <div className="p-4 bg-white rounded-xl shadow-sm w-full mx-auto">
            <div className="animate-pulse">
                <div className="flex mb-4">
                    <div className="w-[180px] sm:w-[250px] pt-2">
                        <div className="h-2 bg-slate-200 rounded col-span-2" />
                    </div>
                    <div className="ml-auto">
                        <div className="h-[30px] w-[30px] rounded-full bg-slate-200 col-span-2" />
                    </div>
                </div>

                <div className="h-2 w-[200px] bg-slate-200 rounded col-span-2 mb-2" />
                <div className="h-10 bg-slate-200 rounded col-span-2 mb-2" />

                <div className="text-right">
                    <div className="h-8 w-[100px] ml-auto bg-slate-200 rounded col-span-2" />
                </div>
            </div>
        </div>
    )
}