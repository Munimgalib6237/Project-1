
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { Images } from "../../utils/images"
import { Text } from "../../components/text"
import { dateTodate } from "../../utils/helper"
import { Navbar } from "../../components/navabr"
import { Footer } from "../../components/footer"
import { DataTable } from "../../components/table"
import { WorkCard } from "../../components/card/work"
import { NoContent } from "../../components/no-content"
import { SocialCard } from "../../components/card/social"
import { CircleIconButton } from "../../components/button"
import { RightDrawer } from "../../components/right-drawer"
import { BookOpen, Flag, MapPin, User, X } from "react-feather"
import { EducationCard } from "../../components/card/education"
import { ResearcherShowPreloader } from "../../components/preloader"
import { ResearcherPublicProfile, ResearcherPublications } from "../../pages/api"

const index = ({ userName, user }) => {
    const [show, setShow] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [perPage, setPerPage] = useState(10)
    const [totalRows, setTotalRows] = useState(0)
    const [publications, setPublications] = useState([])
    const [publicationLoading, setPublicationLoading] = useState(true)
    const [details, setDetails] = useState({ status: false, data: null })

    /* fetch publication */
    const fetchPublications = useCallback(async (userName, page) => {
        try {
            setPublicationLoading(true)
            const response = await ResearcherPublications(userName, page, perPage)
            if (response.status === 200) {
                setPublications(response.data.data)
                setTotalRows(response.data.pagination ? response.data.pagination.total_items : 10)
            }
            setPublicationLoading(false)
        } catch (error) {
            if (error) {
                console.log(error.response)
                setPublicationLoading(false)
            }
        }
    }, [userName, perPage])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [user])

    useEffect(() => {
        if (userName && user) fetchPublications(userName, 1)
    }, [userName, fetchPublications])

    // handle paginate page change
    const handlePageChange = page => fetchPublications(userName, page)

    // handle paginate row change
    const handlePerRowsChange = async (newPerPage, page) => {
        setPublicationLoading(true)
        const response = await ResearcherPublications(userName, page, newPerPage)
        setPublicationLoading(false)
        setPublications(response.data.data)
        setPerPage(newPerPage)
    }

    // data columns
    const columns = [
        {
            name: "Published date",
            sortable: true,
            width: "100px",
            selector: row => row.publicationDate ? dateTodate(row.publicationDate) : "N/A"
        },
        {
            name: "Category",
            sortable: true,
            width: "180px",
            selector: row => row?.category?.title
        },
        {
            name: "Title",
            sortable: true,
            selector: row => row.title && row.title.length > 40 ? row.title.slice(0, 40) + "..." : row.title
        },
        {
            name: "Details",
            width: "120px",
            cell: row =>
                <button
                    type="button"
                    className="w-full text-xs rounded-md transition-all py-2 text-gray-400 bg-gray-100 hover:text-black hover:bg-gray-200"
                    onClick={() => setDetails({ data: row, status: true })}
                >Show details</button>
        }
    ]


    return (
        <div>
            <Navbar user={""} />

            <div className="container mx-auto mt-[81px] py-[30px]">

                {isLoading ? <ResearcherShowPreloader /> : null}
                {!isLoading && !user ? <NoContent message="Account not available." /> : null}

                <div className="grid grid-cols-1">
                    <div className="lg:flex">

                        {/* Profile information */}
                        {!isLoading && user ?
                            <div className="w-full lg:!w-[350px] mb-10 lg:mb-0 lg:pr-5 overflow-x-hidden">
                                <div className="text-center lg:text-left mb-4">
                                    <Image
                                        src={Images.Avatar}
                                        alt="avatar"
                                        width={120}
                                        height={120}
                                    />

                                    <Text className="text-md font-medium capitalize">{user.name}</Text>
                                </div>

                                <div>

                                    {/* About */}
                                    <Text className="text-sm font-normal leading-relaxed text-gray-500 mb-3">{user.about}</Text>

                                    {/* Address */}
                                    <table className="table-auto mb-4">
                                        <tbody>

                                            {user?.address ?
                                                <tr>
                                                    <td className="w-[25px]">
                                                        <MapPin size={16} />
                                                    </td>
                                                    <td>
                                                        <Text className="text-sm font-normal text-gray-500">{user.address}</Text>
                                                    </td>
                                                </tr>
                                                : null
                                            }

                                            {user?.country ?
                                                <tr>
                                                    <td className="w-[25px]">
                                                        <Flag size={16} />
                                                    </td>
                                                    <td>
                                                        <Text className="text-sm font-normal !break-all text-gray-500">{user.country}</Text>
                                                    </td>
                                                </tr>
                                                : null
                                            }

                                            <tr>
                                                <td className="w-[25px]">
                                                    <BookOpen size={16} />
                                                </td>
                                                <td>
                                                    <Text className="text-sm font-normal !break-all text-gray-500">
                                                        {user?.publications ? user.publications + " publications" : "Publication not available."}
                                                    </Text>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-[25px]">
                                                    <User size={16} />
                                                </td>
                                                <td>
                                                    <Text className="text-sm !break-all font-normal text-gray-500">
                                                        aurlab.vercel.app/researcher/{user?.username}
                                                    </Text>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className={show ? "" : "hidden"}>

                                        {/* Work experience */}
                                        {user.work && user.work.length > 0 ?
                                            <div className="mb-5">
                                                <Text className="text-sm font-medium mb-3">Work experience</Text>

                                                {user.work.map((item, i) =>
                                                    <WorkCard
                                                        key={i}
                                                        data={item}
                                                    />
                                                )}
                                            </div>
                                            : null
                                        }

                                        {/* Education */}
                                        {user.education && user.education.length > 0 ?
                                            <div className="mb-5">
                                                <Text className="text-sm font-medium mb-3">Education</Text>

                                                {user.education.map((item, i) =>
                                                    <EducationCard
                                                        key={i}
                                                        data={item}
                                                    />
                                                )}
                                            </div>
                                            : null
                                        }

                                        {/* Other profiles */}
                                        {user.otherProfiles && user.otherProfiles.length > 0 ?
                                            <div>
                                                <Text className="text-sm font-medium mb-3">Other profiles</Text>

                                                {user.otherProfiles.map((item, i) =>
                                                    <SocialCard
                                                        key={i}
                                                        data={item}
                                                    />
                                                )}
                                            </div>
                                            : null
                                        }
                                    </div>

                                    {/* Show more button */}
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            className="w-full p-1 text-center border rounded-md text-xs text-gray-400 transition-all hover:text-gray-500"
                                            onClick={() => setShow(!show)}
                                        >
                                            {show ? "Show less" : "Show more"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            : null
                        }

                        {/* Publications list */}
                        {!isLoading && user ?
                            <div className="grow p-5">
                                <DataTable
                                    data={publications}
                                    columns={columns}
                                    loading={publicationLoading}
                                    totalRows={totalRows}
                                    handlePerRowsChange={handlePerRowsChange}
                                    handlePageChange={handlePageChange}
                                    noDataMessage="Publications not available."
                                />
                            </div>
                            : null
                        }
                    </div>
                </div>

            </div>

            {/* Publication details drawer*/}
            <RightDrawer
                show={details.status}
                onClick={() => setDetails({ data: null, status: false })}
            >
                <div className="flex justify-between p-4 border-b">
                    <p className="text-lg font-bold text-indigo-500 mt-1">{details.data && details.data.title}</p>
                    <div>
                        <CircleIconButton
                            type="button"
                            onClick={() => setDetails({ data: null, status: false })}
                        >
                            <X size={20} />
                        </CircleIconButton>
                    </div>
                </div>
                <div className="p-4">

                    {details.status && details.data ?
                        <>
                            {/* Category */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Category</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.category && details.data.category.title &&
                                        <p className="text-xs">{details.data.category.title}</p>
                                    }
                                </div>
                            </div>

                            {/* Authors */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Authors</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.authors && details.data.authors.length > 0 ?
                                        details.data.authors.map((item, i) =>
                                            <p className="text-xs mr-1" key={i}>{item}{i + 1 < details.data.authors.length ? "," : ""}</p>
                                        ) : null
                                    }
                                </div>
                            </div>

                            {/* Publication date */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Publication date</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.publicationDate &&
                                        <p className="text-xs">{dateTodate(details.data.publicationDate)}</p>
                                    }
                                </div>
                            </div>

                            {/* Publisher */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Publisher</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.publisher &&
                                        <p className="text-xs">{details.data.publisher}</p>
                                    }
                                </div>
                            </div>

                            {/* Conference */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Conference</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.conference &&
                                        <p className="text-xs">{details.data.conference}</p>
                                    }
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Description</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.description &&
                                        <p className="text-xs leading-loose">{details.data.description}</p>
                                    }
                                </div>
                            </div>
                        </>
                        : null
                    }

                </div>
            </RightDrawer>

            <Footer />
        </div>
    );
};

export async function getServerSideProps(context) {
    const { params } = context
    const userName = params.username
    const response = await ResearcherPublicProfile(userName)
    if (response && response.status === 200) {
        return {
            props: {
                userName: userName,
                user: response?.data?.data
            }
        }
    }

    return {
        props: {
            user: null
        }
    }
}

export default index;