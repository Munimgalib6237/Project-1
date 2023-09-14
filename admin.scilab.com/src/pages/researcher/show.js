import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card } from "../../components/card"
import { Services } from "../../http-services"
import { DotIcon } from "../../components/dot-icon"
import { Toastify } from "../../components/toastify"
import { dateToYear, dateTodate } from "../../helpers"
import { TableLoader } from "../../components/loader"
import { NoContent } from "../../components/no-content"

const Show = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [serverErr, setServerError] = useState(false)

    /* fetch data */
    const fetchData = useCallback(async () => {
        try {
            const response = await Services.Researcher.show(id)
            if (response.status === 200 && response.data.data) {
                setData(response.data.data)
            } else {
                setServerError(true)
            }
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                setServerError(true)
                if (error.response && error.response.data && error.response.data.errors) {
                    Toastify.Error(error.response.data.errors.message)
                }
            }
        }
    }, [id])

    useEffect(() => {
        fetchData()
    }, [id, fetchData])

    return (
        <div>

            {/* Data loading */}
            {isLoading && !data && !serverErr ?
                <Card>
                    <TableLoader />
                </Card>
                : null
            }

            {/* Server error */}
            {!isLoading && !data && serverErr ?
                <Card>
                    <NoContent message="No result found." />
                </Card>
                : null
            }

            {/* Data successfully loaded */}
            {data ?
                <div>

                    {/* Profile details */}
                    <Card className="mb-4">
                        <p className="text-lg text-inline text-gray-800 font-bold mb-2">
                            {data.name}
                            <span className="ml-1 text-[15px] font-normal">({data.username})</span>
                        </p>
                        <div className="flex mb-2">
                            <div className="min-w-[100px]">
                                <p className="text-[15px] leading-loose text-gray-500">Email</p>
                                <p className="text-[15px] leading-loose text-gray-500">Country</p>
                                <p className="text-[15px] leading-loose text-gray-500">Address</p>
                                <p className="text-[15px] leading-loose text-gray-500">Publications</p>
                                <p className="text-[15px] leading-loose text-gray-500">About</p>
                            </div>
                            <div className="flex-grow">
                                <p className="text-[15px] leading-loose">{data.email}</p>
                                <p className="text-[15px] leading-loose">{data.country || "N/A"}</p>
                                <p className="text-[15px] leading-loose">{data.address || "N/A"}</p>
                                <p className="text-[15px] leading-loose">
                                    {data.publications > 0 ? data.publications : "N/A"}
                                </p>
                                <p className="text-[15px]">{data.about || "N/A"}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Education, Work & Other profiles */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <Card>
                            {data.education && data.education.length > 0 ?
                                <EducationHistory data={data.education} />
                                :
                                <p className="text-center my-1 text-gray-400">No work history found.</p>
                            }
                        </Card>
                        <Card>
                            {data.work && data.work.length > 0 ?
                                <WorkHistory data={data.work} />
                                :
                                <p className="text-center my-1 text-gray-400">No education history found.</p>
                            }
                        </Card>
                        <Card>
                            {data.otherProfiles && data.otherProfiles.length > 0 ?
                                <OtherProfiles data={data.otherProfiles} />
                                :
                                <p className="text-center my-1 text-gray-400">No other profiles found.</p>
                            }
                        </Card>
                    </div>
                </div>
                : null
            }
        </div>
    );
};

export default Show;

/* Education history */
const EducationHistory = ({ data }) => {
    return (
        <div>
            <p className="font-bold text-base mb-3">Education history</p>

            {data.map((item, i) =>
                <div className="flex mb-4" key={i}>
                    <div className="pt-[7px] pr-2">
                        <DotIcon />
                    </div>
                    <div>
                        <p className="text-sm leading-5 font-bold">{item.school}</p>
                        <p className="text-sm leading-5 text-gray-500">
                            Dept. of {item.department}
                        </p>
                        <p className="text-sm leading-5 text-gray-500">
                            Passing year [{dateToYear(item.passingYear)}]
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

/* Work history */
const WorkHistory = ({ data }) => {
    return (
        <div>
            <p className="font-bold text-base mb-3">Work history</p>

            {data.map((item, i) =>
                <div className="flex mb-4" key={i}>
                    <div className="pt-[7px] pr-2">
                        <DotIcon />
                    </div>
                    <div>
                        <p className="text-sm leading-5 font-bold">{item.organization}</p>
                        <p className="text-sm leading-5 text-gray-500">
                            {item.position}
                        </p>
                        <p className="text-sm leading-5 text-gray-500">
                            [{dateTodate(item.startFrom)} - {item.onGoing ? "Current" : dateTodate(item.endTo)}]
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

/* Other profiles */
const OtherProfiles = ({ data }) => {
    return (
        <div>
            <p className="font-bold text-base mb-3">Other profiles</p>
            {data.map((item, i) =>
                <div className="flex mb-4" key={i}>
                    <div className="pt-[7px] pr-2">
                        <DotIcon />
                    </div>
                    <div>
                        <p className="text-sm leading-5 font-bold">{item.title}</p>
                        <p className="text-sm !break-all lowercase leading-5 text-gray-500">{item.link}</p>
                    </div>
                </div>
            )}
        </div>
    )
}