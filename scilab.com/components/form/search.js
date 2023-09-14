
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { Search } from "react-feather"

export const SearchForm = () => {
    const history = useRouter()
    const { register, handleSubmit } = useForm()

    const onSubmit = async data => {
        history.push(`/researcher?query=${data.query}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">

                    <div className="grow">
                        <input
                            type="text"
                            className="w-full rounded-l-full text-md outline-none py-[15px] px-[20px] border-0 shadow-none"
                            placeholder="Search researcher ..."
                            {...register("query", { required: true })}
                        />
                    </div>

                    {/* Submit button */}
                    <div className="flex-none p-1">
                        <button
                            type="submit"
                            className="p-[10px] rounded-full transition-all shadow-lg text-white bg-primary hover:bg-secondary"
                        >
                            <Search size={25} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}