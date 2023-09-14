
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Images } from "../../utils/images"
import { Card } from "../../components/card"
import { Text } from "../../components/text"
import { ResetForm } from "../../components/form/reset"
import { Toastify } from "../../components/toastify"
import { Services } from "../../http-services"

const Index = () => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) return history.push("/dashboard")
    }, [history])

    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await Services.Auth.reset(data)
            if (response && response.status === 201) {
                Toastify.Success(response.data.message)
                history.push("/")
            }

            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                if (error.response && error.response.data && error.response.data) {
                    Toastify.Error(error.response.data.errors.message)
                }
            }
        }
    }

    return (
        <div className="w-full md:w-[550px] lg:w-[650px] mx-auto md:mt-[50px] p-4">
            <Card>
                <div className="text-center py-10">
                    <img
                        src={Images.Logo}
                        alt="Logo"
                        className="w-[150px] h-[40px] mx-auto mb-4"
                    />

                    <Text className="text-[20px] font-bold">Change account password</Text>
                </div>

                <div className="px-2 pb-10 md:px-16">
                    <ResetForm
                        disabled={isLoading}
                        isLoading={isLoading}
                        onSubmit={data => handleSubmit(data)}
                    />
                </div>

            </Card>
        </div>
    );
};

export default Index;