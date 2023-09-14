import { Text } from "../text"

export const SocialCard = (props) => {
    return (
        <div className="pl-2 mb-4">
            <Text className="text-sm font-medium capitalize text-gray-600 mb-1">
                {props?.data?.title}
            </Text>
            <Text className="text-xs font-normal !break-all lowercase text-gray-400">
                {props?.data?.link}
            </Text>
        </div>
    );
}