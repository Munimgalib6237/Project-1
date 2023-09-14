import { Briefcase } from "react-feather"
import { Text } from "../text"
import { dateTodate } from "../../utils/helper"

export const WorkCard = (props) => {
    return (
        <div className="pl-2 mb-4">
            <Text className="text-sm font-medium capitalize leading-relaxed text-gray-600">
                {props?.data?.position}
            </Text>
            <Text className="text-sm font-medium capitalize mb-1 text-gray-600">
                {props?.data?.organization}
            </Text>

            <Text className="text-xs font-normal text-gray-400 capitalize">
                [{dateTodate(props?.data?.startFrom)} - {props.data && props.data.onGoing ? "Current" : dateTodate(props?.data?.endTo)}]
            </Text>
        </div>
    );
}