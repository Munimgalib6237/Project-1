

import { Images } from "../../utils/images"

export const NetworkError = () => {
    return (
        <div className="p-5 text-center">
            <img
                src={Images.ServerError}
                alt="Network error"
                width={250}
                height={250}
                className="mx-auto"
            />

            <p className="text-md font-medium text-primary mt-4">Network error.</p>
        </div>
    )
}