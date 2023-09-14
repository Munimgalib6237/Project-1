
import { Images } from "../../utils/images"

export const NoContent = (props) => {
    return (
        <div className="p-5 text-center">
            <img
                src={Images.FourOFour}
                alt="No content"
                className="w-[150px] sm:w-[250px] h-[150px] sm:h-[250px] mx-auto"
            />

            <p className="text-md font-medium text-indigo-500 mt-4">{props.message}</p>
        </div>
    )
}