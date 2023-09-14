
import Link from "next/link"
import Image from "next/image"
import { Images } from "../../utils/images"
import { Text } from "../../components/text"
import { PrimaryButton } from "../../components/button"

const index = ({ message }) => {
    return (
        <div className="text-center px-[30px] py-[100px]">
            <Image
                src={Images.FourOfour}
                alt="404 image"
                width={400}
                height={250}
            />

            <Text className="text-md font-medium my-4">What are you looking for? Page not found !!!</Text>

            <Link href="/">
                <a>
                    <PrimaryButton type="button">Back to home</PrimaryButton>
                </a>
            </Link>
        </div>
    );
};

export default index;