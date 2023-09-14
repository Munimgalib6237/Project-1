
/* Required props */
/* show: boolean */
/* title: string */
/* onHide: function */
/* children */

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X } from "react-feather"

export const Modal = (props) => {
    return (
        <Transition.Root show={props.show} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={props.onHide}>
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-screen sm:max-w-lg sm:w-full">
                            <div className="p-4 flex w-full">
                                <Dialog.Title className="text-md mt-[6px] font-medium text-gray-900">{props.title || "Modal title"}</Dialog.Title>
                                <div className="ml-auto">
                                    <button
                                        type="button"
                                        className="rounded-full bg-red-100 hover:bg-red-200 p-2"
                                        onClick={props.onHide}
                                    >
                                        <X className="text-red-400" size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* All children goes here */}
                            <div className="bg-white px-4 pb-4">
                                {props.children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
