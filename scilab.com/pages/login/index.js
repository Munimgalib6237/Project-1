
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Navbar } from "../../components/navabr"
import { Footer } from "../../components/footer"
import { Text } from "../../components/text"
import { LoginForm } from "../../components/form/login"
import { Toastify } from "../../components/toastify"
import { Login } from "../api"

const Index = () => {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) return router.push("/dashboard")
    }, [router])

    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await Login(data)
            if (response && response.status === 200) {
                const token = response.data.token
                localStorage.setItem("token", token)
                router.push("/dashboard")
            }

            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)

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
        <div className="pt-[81px]">
            <Navbar />

            <div className="w-full md:w-[550px] lg:w-[650px] mx-auto md:mt-[50px] p-4 mb-10 lg:mb-20">
                <div className="md:border rounded-lg md:shadow-lg">
                    <div className="text-center py-10">
                        <Text className="text-[20px] font-bold">Sign in to AurLab</Text>
                    </div>
                    <div className="px-2 pb-10 md:px-16">
                        <LoginForm
                            isLoading={isLoading}
                            onSubmit={data => handleSubmit(data)}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Index;