import { arraFromNumber } from "../../utils/helper"

export const ResearcherListPreloader = ({ length }) => {
    return (
        <div className="container mx-auto mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 text-center gap-8">

                {length && arraFromNumber(length).map((item) =>
                    <div className="w-[250px] sm:w-full mx-auto p-8 border shadow-lg rounded-2xl" key={item}>
                        <div className="rounded-full bg-slate-200 h-[100px] w-[100px] mx-auto" />

                        <div className="h-2 w-[150px] mx-auto mt-4 bg-slate-200 rounded col-span-2" />
                    </div>
                )}

            </div>
        </div>
    )
}

export const ResearcherShowPreloader = () => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1">
                <div className="lg:flex">
                    <div className="w-full lg:w-[350px] mb-10 lg:mb-0 lg:pr-5">
                        <div className="border rounded-lg shadow-md p-5">
                            <div className="w-[120px] h-[120px] bg-slate-200 rounded-full mb-5 mx-auto lg:mx-0" />
                            <div className="w-[200px] h-2 bg-slate-200 rounded col-span-2 mb-4 mx-auto lg:mx-0" />
                            <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                            <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                            <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                            <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                            <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                            <div className="h-2 bg-slate-200 rounded col-span-2" />
                        </div>
                    </div>

                    <div className="grow">
                        <div className="border shadow-md rounded-lg p-5">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                                <div className="h-2 bg-slate-200 rounded col-span-2 mb-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

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

export const DashboardPreloader = () => {
    return (
        <div className="w-full relative animate-pulse">
            <div className="w-full h-[180px] lg:h-[200px] rounded-lg overflow-hidden shadow-md bg-slate-300" />

            <div className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full -bottom-[40px] sm:-bottom-[60px] shadow-lg right-[10px] sm:right-[40px] overflow-hidden bg-slate-300 border-2" />
        </div>
    )
}

export const DashboardPublicationCreate = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-10 w-full bg-slate-200 rounded" />
                <div className="h-10 w-full bg-slate-200 rounded" />
                <div className="h-10 w-full bg-slate-200 rounded" />
                <div className="h-10 w-full bg-slate-200 rounded" />
                <div className="h-10 w-full bg-slate-200 rounded" />
                <div className="h-10 w-full bg-slate-200 rounded" />
            </div>

            <div className="my-4">
                <div className="h-24 w-full bg-slate-200 rounded" />
            </div>

            <div className="text-right">
                <div className="h-10 w-[100px] ml-auto bg-slate-200 rounded" />
            </div>
        </div>
    )
}