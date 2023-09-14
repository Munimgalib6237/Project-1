
import { Images } from "../../utils/images"

export const NoContent = (props) => {
    return (
        <div className="p-5 text-center">
            <img
                src={Images.NoContent}
                alt="No content"
                width={250}
                height={250}
                className="mx-auto"
            />

            <p className="text-md font-medium text-primary mt-4">{props.message}</p>
        </div>
    )
}