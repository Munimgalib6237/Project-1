import { dateTodate } from "../../utils/helper";
import { Text } from "../text"

export const EducationCard = (props) => {
    return (
        <div className="pl-2 mb-4">
            <Text className="text-sm font-medium leading-relaxed capitalize text-gray-600 mb-1">
                {props?.data?.school}
            </Text>
            <Text className="text-xs font-normal capitalize text-gray-400">
                {props?.data?.department} [{dateTodate(props?.data?.passingYear)}]
            </Text>
        </div>
    );
}