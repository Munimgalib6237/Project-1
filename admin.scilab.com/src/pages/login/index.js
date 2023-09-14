
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Images } from "../../utils/images"
import { Card } from "../../components/card"
import { Text } from "../../components/text"
import { LoginForm } from "../../components/form/login"
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
            const response = await Services.Auth.login(data)
            if (response && response.status === 200) {
                const token = response.data.token
                localStorage.setItem("token", token)
                history.push("/dashboard")
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

        // localStorage.setItem("token", data.email)
        // history.push("/dashboard")
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

                    <Text className="text-[20px] font-bold">Sign in to admin portal</Text>
                </div>

                <div className="px-2 pb-10 md:px-16">
                    <LoginForm
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