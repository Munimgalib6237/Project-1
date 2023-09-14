
import React, { useCallback, useEffect, useState } from "react"
import { Plus, Settings, Trash2 } from "react-feather"
import { withAuth } from "../../hook/with-auth"
import { dateTodate } from "../../utils/helper"
import { NetworkError } from "../../components/network-error"
import { DashboardPreloader } from "../../components/preloader"
import { DashboardLayout } from "../../components/dashboard-layout"
import { DashboardCover } from "../../components/dashboard/cover"
import { EducationForm } from "../../components/form/education"
import { CircleIconButton } from "../../components/button"
import { SocialForm } from "../../components/form/social"
import { WorkForm } from "../../components/form/work"
import { Modal } from "../../components/modal"
import { CustomDisclouser } from "../../components/disclosure"
import { UsernameForm } from "../../components/form/username"
import { ProfileForm } from "../../components/form/profile"
import { Toastify } from "../../components/toastify"
import { ConfirmationModal } from "../../components/modal/confirmation.modal"
import {
    Me,
    UpdateProfileInfo,
    UpdateUsername,
    AddWork,
    RemoveWork,
    AddEducation,
    RemoveEducation,
    AddSocial,
    RemoveSocial
} from "../api"

const index = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)
    const [profile, setProfile] = useState({ show: false })
    const [isProfileUpdating, setProfileUpdating] = useState(false)
    const [changeUsername, setChangeUsername] = useState(false)
    const [work, setWork] = useState({ show: false, loading: false })
    const [deleteWork, setDeleteWork] = useState({ id: null, show: false, loading: false })
    const [education, setEducation] = useState({ show: false, loading: false })
    const [deleteEducation, setDeleteEducation] = useState({ id: null, show: false, loading: false })
    const [social, setSocial] = useState({ show: false, loading: false })
    const [deleteSocial, setDeleteSocial] = useState({ id: null, show: false, loading: false })

    /* fetch data */
    const fetchData = useCallback(async () => {
        try {
            setData(null)
            setLoading(true)
            const response = await Me()
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
            }
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    /* Handle profile update */
    const handleProfileUpdate = async (data) => {
        try {
            setProfileUpdating(true)
            const response = await UpdateProfileInfo(data)
            if (response && response.status === 201) {
                fetchData()
                setProfile({ show: false })
                Toastify.Success(response.data.message)
            }

            setProfileUpdating(false)
        } catch (error) {
            if (error) {
                console.log(error.response)

                setProfileUpdating(false)
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    /* Handle username update */
    const handleUsernameUpdate = async (data) => {
        try {
            setChangeUsername(true)
            const response = await UpdateUsername(data)
            if (response && response.status === 201) {
                fetchData()
                setChangeUsername(false)
                setProfile({ show: false })
                Toastify.Success(response.data.message)
            }

            setChangeUsername(false)
        } catch (error) {
            if (error) {
                console.log(error.response)

                setChangeUsername(false)
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    /* Add work */
    const addWork = async (data) => {
        try {
            setWork({ ...work, loading: true })
            const response = await AddWork(data)
            if (response && response.status === 201) {
                fetchData()
                Toastify.Success(response?.data?.message)
            }
            setWork({ loading: false, show: false })
        } catch (error) {
            if (error) {
                console.log(error.response)

                setWork({ loading: false })
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    /* Remove work */
    const removeWork = async () => {
        try {
            setDeleteWork({ ...deleteWork, loading: true })
            const response = await RemoveWork(deleteWork.id)
            if (response && response.status === 201) {
                fetchData()
                Toastify.Success(response?.data?.message)
            }
            setDeleteWork({ ...deleteWork, id: data, loading: false, show: false })
        } catch (error) {
            if (error) {
                console.log(error.response)
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    /* Add education */
    const addEducation = async (data) => {
        try {
            setEducation({ ...education, loading: true })
            const response = await AddEducation(data)
            if (response && response.status === 201) {
                fetchData()
                Toastify.Success(response?.data?.message)
            }
            setEducation({ loading: false, show: false })
        } catch (error) {
            if (error) {
                console.log(error.response)

                setEducation({ loading: false })
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    /* Remove education */
    const removeEducation = async () => {
        try {
            setDeleteEducation({ ...deleteEducation, loading: true })
            const response = await RemoveEducation(deleteEducation.id)
            if (response && response.status === 201) {
                fetchData()
                Toastify.Success(response?.data?.message)
            }
            setDeleteEducation({ ...deleteEducation, id: data, loading: false, show: false })
        } catch (error) {
            if (error) {
                console.log(error.response)
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    /* Add social */
    const addSocial = async (data) => {
        try {
            setSocial({ ...social, loading: true })
            const response = await AddSocial(data)
            if (response && response.status === 201) {
                fetchData()
                Toastify.Success(response?.data?.message)
            }
            setSocial({ loading: false, show: false })
        } catch (error) {
            if (error) {
                console.log(error.response)
                setSocial({ ...social, loading: false})
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    /* Remove social */
    const removeSocial = async () => {
        try {
            setDeleteSocial({ ...social, loading: true })
            const response = await RemoveSocial(deleteSocial.id)
            if (response && response.status === 201) {
                fetchData()
                Toastify.Success(response?.data?.message)
            }
            setDeleteSocial({ ...social, loading: false, show: false })
        } catch (error) {
            if (error) {
                console.log(error.response)
                if (error.response && error.response.data && error.response.data && error.response.data.errors) {
                    const object = error.response.data.errors
                    for (const item in object) {
                        Toastify.Error((object[item]))
                    }
                }
            }
        }
    }

    return (
        <div>
            <DashboardLayout>
                {isLoading && !serverError && !data ? <DashboardPreloader /> : null}
                {!isLoading && !data && serverError ? <NetworkError /> : null}
                {!isLoading && !serverError && data ?
                    <>
                        <DashboardCover text={data.name} />
                        <div className="py-3">
                            <p className="text-lg sm:text-2xl font-bold">{data.name}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5 2xl:gap-6 mt-8">

                            {/* Personal info */}
                            <div className="rounded-md shadow-lg bg-white min-h-[350px]">
                                <div className="border-b w-full inline-flex justify-between p-3">
                                    <p className="text-sm font-medium mt-1">Profile info.</p>
                                    <button
                                        onClick={() => setProfile({ show: true, loading: false })}
                                        className="p-1 bg-gray-50 rounded-full text-gray-600 transition-all hover:bg-gray-100 hover:text-black">
                                        <Settings size={18} />
                                    </button>
                                </div>
                                <div className="p-3">
                                    <div className="flex mb-2">
                                        <div className="min-w-[100px]">
                                            <p className="text-sm font-normal mb-2 text-gray-500">Username</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">E-mail</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">Country</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">Address</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">Publications</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">About</p>
                                        </div>

                                        <div className="grow">
                                            <p className="text-sm font-normal mb-2 text-gray-500">: {data.username}</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">: {data.email}</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">: {data.country}</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">: {data.address}</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">: {data.publications}</p>
                                            <p className="text-sm font-normal mb-2 text-gray-500">: {data.about}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Work exp */}
                            <div className="rounded-md shadow-lg bg-white min-h-[350px]">
                                <div className="border-b w-full inline-flex justify-between p-3">
                                    <p className="text-sm font-medium mt-1">Work exp.</p>
                                    <button
                                        onClick={() => setWork({ show: true, loading: false })}
                                        className="p-1 bg-gray-50 rounded-full text-gray-600 transition-all hover:bg-gray-100 hover:text-black">
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="p-3">
                                    {data.work && data.work.length > 0 ?
                                        data.work.map((item, i) =>
                                            <div className="flex w-full p-2" key={i}>
                                                <div className="grow">
                                                    <p className="text-sm font-normal capitalize">{item.position}</p>
                                                    <p className="text-sm font-normal capitalize mb-1">{item.organization}</p>
                                                    <p className="text-xs font-normal text-gray-500">[{dateTodate(item.startFrom)} - {item.onGoing ? "CURRENT" : item.endTo ? dateTodate(item.endTo) : null}]</p>
                                                </div>
                                                <div>
                                                    <CircleIconButton
                                                        type="button"
                                                        className="!text-red-500"
                                                        onClick={() => setDeleteWork({ ...deleteWork, id: item._id, show: true })}
                                                    >
                                                        <Trash2 size={18} />
                                                    </CircleIconButton>
                                                </div>
                                            </div>
                                        ) :
                                        <p className="text-[13px] font-regular text-gray-500">No work history added.</p>
                                    }
                                </div>
                            </div>

                            {/* Education */}
                            <div className="rounded-md shadow-lg bg-white min-h-[350px]">
                                <div className="border-b w-full inline-flex justify-between p-3">
                                    <p className="text-sm font-medium mt-1">Education</p>
                                    <button
                                        onClick={() => setEducation({ show: true, loading: false })}
                                        className="p-1 bg-gray-50 rounded-full text-gray-600 transition-all hover:bg-gray-100 hover:text-black">
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="p-3">
                                    {data.education && data.education.length > 0 ?
                                        data.education.map((item, i) =>
                                            <div className="flex w-full p-2" key={i}>
                                                <div className="grow">
                                                    <p className="text-sm font-normal capitalize">{item.school}</p>
                                                    <p className="text-sm font-normal mb-1">Department of {item.department}</p>
                                                    <p className="text-xs font-normal text-gray-500">[{dateTodate(item.passingYear)}]</p>
                                                </div>
                                                <div>
                                                    <CircleIconButton
                                                        type="button"
                                                        className="!text-red-500"
                                                        onClick={() => setDeleteEducation({ ...deleteEducation, id: item._id, show: true })}
                                                    >
                                                        <Trash2 size={18} />
                                                    </CircleIconButton>
                                                </div>
                                            </div>
                                        ) :
                                        <p className="text-xs font-normal text-gray-500">No education history added.</p>
                                    }
                                </div>
                            </div>

                            {/* Profiles */}
                            <div className="rounded-md shadow-lg bg-white min-h-[350px]">
                                <div className="border-b w-full inline-flex justify-between p-3">
                                    <p className="text-sm font-medium mt-1">Public profiles</p>
                                    <button
                                        className="p-1 bg-gray-50 rounded-full text-gray-600 transition-all hover:bg-gray-100 hover:text-black"
                                        onClick={() => setSocial({ show: true, loading: false })}
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="p-3">
                                    {data.otherProfiles && data.otherProfiles.length > 0 ?
                                        data.otherProfiles.map((item, i) =>
                                            <div className="flex w-full p-2" key={i}>
                                                <div className="grow">
                                                    <p className="text-sm font-normal capitalize mb-1">{item.title}</p>
                                                    <p className="text-xs font-normal text-gray-500">{item.link}</p>
                                                </div>
                                                <div>
                                                    <CircleIconButton
                                                        type="button"
                                                        className="!text-red-500"
                                                        onClick={() => setDeleteSocial({ ...deleteSocial, id: item._id, show: true })}
                                                    >
                                                        <Trash2 size={18} />
                                                    </CircleIconButton>
                                                </div>
                                            </div>
                                        ) :
                                        <p className="text-[13px] font-normal text-gray-500">No profiles added.</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                    : null
                }
            </DashboardLayout>

            {/* Profile modal */}
            <Modal
                title="Change profile"
                show={profile.show}
                onHide={() => setProfile({ ...work, show: false })}
            >
                <CustomDisclouser
                    items={[
                        {
                            title: "Edit username",
                            body:
                                <UsernameForm
                                    data={data}
                                    loading={changeUsername}
                                    onSubmit={data => handleUsernameUpdate(data)}
                                />
                        },
                        {
                            title: "Edit personal info.",
                            body:
                                <ProfileForm
                                    data={data}
                                    loading={isProfileUpdating}
                                    onSubmit={data => handleProfileUpdate(data)}
                                />
                        }
                    ]}
                />
            </Modal>

            {/* Work creation */}
            <Modal
                show={work.show}
                loading={work.loading}
                onHide={() => setWork({ ...work, show: false })}
                title="Create work"
            >
                <WorkForm
                    loading={work.loading}
                    onSubmit={data => addWork(data)}
                />
            </Modal>

            {/* Remove work */}
            <ConfirmationModal
                message="work"
                show={deleteWork.show}
                loading={deleteWork.loading}
                onHide={() => setDeleteWork({ ...deleteWork, loading: false, show: false })}
                onDelete={() => removeWork()}
            />

            {/* Education creation */}
            <Modal
                title="Create education"
                show={education.show}
                loading={education.loading}
                onHide={() => setEducation({ ...education, show: false })}
            >
                <EducationForm
                    loading={education.loading}
                    onSubmit={data => addEducation(data)}
                />
            </Modal>

            {/* Remove Education */}
            <ConfirmationModal
                message="education"
                show={deleteEducation.show}
                loading={deleteEducation.loading}
                onHide={() => setDeleteEducation({ ...deleteEducation, loading: false, show: false })}
                onDelete={() => removeEducation()}
            />

            {/* Social profile creation */}
            <Modal
                show={social.show}
                title="Create profile"
                loading={social.loading}
                onHide={() => setSocial({ ...social, show: false })}
            >
                <SocialForm
                    loading={social.loading}
                    onSubmit={data => addSocial(data)}
                />
            </Modal>

            {/* Remove social */}
            <ConfirmationModal
                message="social profile"
                show={deleteSocial.show}
                loading={deleteSocial.loading}
                onHide={() => setDeleteSocial({ ...deleteSocial, loading: false, show: false })}
                onDelete={() => removeSocial()}
            />
        </div>
    );
};

export default withAuth(index);


