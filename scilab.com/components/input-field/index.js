import { useController } from "react-hook-form"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Text } from "../text"

// Required Props for text field (input type)
// 1. label
// 2. error 
// 3. name 
// 4. defaultValue 
// 5. placeholder 
// 6. control
// 7. rules
// 8. icon 20X20

export const TextField = ({ label, error, name, defaultvalue, placeholder, control, rules, icon }) => {
    const {
        field: { onChange, onBlur, value, ref }
    } = useController({
        name,
        control,
        rules: { ...rules },
        defaultValue: defaultvalue,
    })

    return (
        <div>
            {error ?
                <Text className="text-sm text-red-500 mb-1">{error}</Text> :
                <Text className="text-sm text-gray-700 mb-1">{label}</Text>
            }

            <div className={icon ? "relative" : ""}>
                <input
                    onChange={onChange} // send value to hook form 
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value} // input value
                    name={name} // send down the input name
                    inputRef={ref} // send input ref, so we can focus on input when error appear
                    placeholder={placeholder}
                    type="text"
                    className={error ?
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3 border-red-400" :
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3"
                    }
                />

                {icon ? <div className="text-gray-400 absolute top-3 left-3">{icon}</div> : null}
            </div>
        </div>
    );
}

// Required Props for password field (input type)
// 1. label
// 2. error 
// 3. name 
// 4. defaultValue 
// 5. placeholder 
// 6. control
// 7. rules
// 8. icon 20X20

export const PasswordField = ({ label, error, name, defaultvalue, placeholder, control, rules, icon }) => {
    const {
        field: { onChange, onBlur, value, ref }
    } = useController({
        name,
        control,
        rules: { ...rules },
        defaultValue: defaultvalue,
    })

    return (
        <div>
            {error ?
                <Text className="text-sm text-red-500 mb-1">{error}</Text> :
                <Text className="text-sm text-gray-700 mb-1">{label}</Text>
            }

            <div className={icon ? "relative" : ""}>
                <input
                    onChange={onChange} // send value to hook form 
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value} // input value
                    name={name} // send down the input name
                    inputRef={ref} // send input ref, so we can focus on input when error appear
                    placeholder={placeholder}
                    type="password"
                    className={error ?
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3 border-red-400" :
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3"
                    }
                />

                {icon ? <div className="text-gray-400 absolute top-3 left-3">{icon}</div> : null}
            </div>
        </div>
    );
}

// Required Props for text field (input type)
// 1. label
// 2. error 
// 3. name 
// 4. defaultValue 
// 5. placeholder 
// 6. control
// 7. rules
// 8. icon 20X20

export const TextAreaField = ({ label, error, name, defaultvalue, placeholder, control, rules, icon, rows }) => {
    const {
        field: { onChange, onBlur, value, ref }
    } = useController({
        name,
        control,
        rules: { ...rules },
        defaultValue: defaultvalue,
    })

    return (
        <div>
            {error ?
                <Text className="text-sm text-red-500 mb-1">{error}</Text> :
                <Text className="text-sm text-gray-700 mb-1">{label}</Text>
            }

            <div className={icon ? "relative" : ""}>
                <textarea
                    onChange={onChange} // send value to hook form 
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value} // input value
                    name={name} // send down the input name
                    inputRef={ref} // send input ref, so we can focus on input when error appear
                    placeholder={placeholder}
                    type="text"
                    rows={rows}
                    className={error ?
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3 border-red-400" :
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3"
                    }
                />

                {icon ? <div className="text-gray-400 absolute top-3 left-3">{icon}</div> : null}
            </div>
        </div>
    );
}


// Required Props for (date picker)
// 1. label
// 2. error 
// 3. name 
// 4. defaultValue 
// 5. placeholder 
// 6. control
// 7. rules
// 8. icon 20X20

export const DateField = ({ label, error, name, defaultvalue, placeholder, control, rules, icon }) => {
    const {
        field: { onChange, onBlur, value, ref }
    } = useController({
        name,
        control,
        rules: { ...rules },
        defaultValue: defaultvalue,
    })

    return (
        <div>
            {error ?
                <Text className="text-sm text-red-500 mb-1">{error}</Text> :
                <Text className="text-sm text-gray-700 mb-1">{label}</Text>
            }

            <div className={icon ? "relative" : ""}>
                <ReactDatePicker
                    onChange={onChange} // send value to hook form 
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value} // input value
                    name={name} // send down the input name
                    inputRef={ref} // send input ref, so we can focus on input when error appear
                    placeholderText={placeholder}
                    selected={value}
                    className={error ?
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3 border-red-400" :
                        "w-full text-sm bg-gray-100 rounded-md outline-none p-3"
                    }
                />

                {icon ? <div className="text-gray-400 absolute top-3 left-3">{icon}</div> : null}
            </div>
        </div>
    )
}