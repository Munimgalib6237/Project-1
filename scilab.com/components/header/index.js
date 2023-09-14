
import Image from "next/image"
import { Text } from "../text"
import { useWindowSize } from "../window"
import { Images } from "../../utils/images"

export const Header = () => {
    const window = useWindowSize()

    const responsiveImage = () => {
        let width = 300
        let height = 250

        if (window.width >= 640) {
            width = 360
            height = 300
        }

        if (window.width >= 768) {
            width = 460
            height = 380
        }

        if (window.width >= 1536) {
            width = 600
            height = 480
        }

        return { width, height }
    }

    return (
        <div className="py-[30px] 2xl:py-[60px] mt-[74px] relative">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {/* Text container */}
                    <div className="px-3 lg:px-0 py-5 text-center lg:text-left mb-5 lg:mb-0">
                        <Text
                            className="2xl:mt-16 font-extrabold text-transparent text-5xl md:text-6xl lg:text-8xl text-primary"
                        >Connect million researcher.</Text>
                    </div>

                    {/* Image container */}
                    <div className="text-center">
                        <Image
                            src={Images.Time}
                            alt="Time picture"
                            width={responsiveImage().width}
                            height={responsiveImage().height}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
