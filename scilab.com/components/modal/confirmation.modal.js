
import { Modal } from "./index"
import { Text } from "../text"
import { PrimaryButton, DangerButton } from "../button"

export const ConfirmationModal = (props) => {
    return (
        <Modal
            show={props.show}
            title={"Are you sure?"}
            onHide={props.onHide}
        >
            <div>
                <Text className="text-sm mb-5">Want to delete this {props.message}.</Text>
                <div>
                    <PrimaryButton
                        type="button"
                        disabled={props.loading}
                        onClick={props.onDelete}
                    >
                        {props.loading ? "Loading..." : "Yes"}
                    </PrimaryButton>
                    <DangerButton
                        className="ml-2"
                        disabled={props.loading}
                        onClick={props.onHide}
                    >
                        No
                    </DangerButton>
                </div>
            </div>
        </Modal>
    )
}