
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUp } from "react-feather"

export const CustomDisclouser = ({ items }) => {
    return (
        <div className="w-full">
            <div className="w-full mt-4 bg-white rounded-2xl">
                {items && items.length > 0 ?
                    items.map((item, i) =>
                        <Disclosure key={i}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex justify-between w-full p-5 rounded-none text-sm font-medium text-left bg-gray-100 hover:bg-gray-200 mb-[1px]">
                                        <span>{item.title}</span>
                                        <ChevronUp
                                            className={`${open ? 'transform rotate-180' : ''
                                                } w-5 h-5 text-sky-500`}
                                        />
                                    </Disclosure.Button>

                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel className="p-4">
                                            <p className="leading-loose text-sm">{item.body}</p>
                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    ) : null
                }
            </div>
        </div>
    )
}
