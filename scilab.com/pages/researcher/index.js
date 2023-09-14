
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { Images } from "../../utils/images"
import { Text } from "../../components/text"
import { Navbar } from "../../components/navabr"
import { Footer } from "../../components/footer"
import { PrimaryButton } from "../../components/button"
import { NoContent } from "../../components/no-content"
import { NetworkError } from "../../components/network-error"
import { ResearcherListPreloader } from "../../components/preloader"
import { ResearcherList, ResearcherSearch } from "../api"

const index = () => {
    const router = useRouter()
    const { query } = router.query
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)

    /* fetch data */
    const fetchData = useCallback(async (page) => {
        try {
            const response = await ResearcherList(page, 20)
            if (response && response.status === 200) {
                setData(response.data.data)
                setPagination(response.data.pagination)
                setLoading(false)

                console.log(response.data);
            } else {
                setLoading(false)
                setServerError(true)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                setServerError(true)
                console.log(error.response)
            }
        }
    }, [])

    /* Search data */
    const searchData = async () => {
        try {
            const response = await ResearcherSearch(query)
            if (response && response.status === 200) {
                setData(response.data.data)
                setLoading(false)
            } else {
                setLoading(false)
                setServerError(true)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                setServerError(true)
                console.log(error.response)
            }
        }
    }

    useEffect(() => {
        if (query && query !== "undefined") {
            searchData()
        } else {
            fetchData(1)
        }
    }, [query, fetchData])


    return (
        <div>
            <Navbar user={""} />

            <div className="container mx-auto mt-[81px]">
                <div className="grid grid-cols-1 text-center py-8">
                    <Text className="text-xl font-regular text-gray-600">Browse researcher</Text>
                </div>
            </div>

            {isLoading && !serverError && !data.length ? <ResearcherListPreloader length={10} /> : null}
            {!isLoading && !serverError && !data.length ? <NoContent message="No results found." /> : null}
            {!isLoading && serverError && !data.length ? <NetworkError /> : null}

            {!isLoading && !serverError && data.length > 0 ?
                <div className="container mx-auto mb-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 text-center gap-8">

                        {data && data.map((item, i) =>
                            <Link href={`/researcher/${item.username}`} key={i}>
                                <a>
                                    <div className="w-[250px] sm:w-full mx-auto p-8 border rounded-2xl hover:border-white hover:shadow-xl transition-all cursor-pointer">
                                        <Image
                                            src={Images.Avatar}
                                            alt="User avatar"
                                            width={100}
                                            height={100}
                                        />

                                        <Text className="text-md font-normal mt-2">{item.name}</Text>
                                    </div>
                                </a>
                            </Link>
                        )}

                    </div>
                </div>
                : null
            }

            {!isLoading && data.length > 0 && !query && pagination && pagination.next_page ?
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 text-center pb-12">
                        <div>
                            <PrimaryButton>Show more</PrimaryButton>
                        </div>
                    </div>
                </div>
                : null
            }

            <Footer />
        </div>
    );
};

export default index;