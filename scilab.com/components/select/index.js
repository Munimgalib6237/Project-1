import React from "react"
import AsyncSelect from "react-select/async"
import Creatable from "react-select/creatable"
import Select, { components } from "react-select"
import { useController } from "react-hook-form"
import { Text } from "../text"

const customStyles = (radius) => {

    const myStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: 42,
            fontSize: 14,
            color: '#000',
            background: '#f3f4f6',
            boxShadow: 'none', '&:hover': { borderColor: '1px solid #f3f4f6' },
            border: state.isFocused ? '1px solid #f3f4f6' : '1px solid #f3f4f6',
            borderRadius: radius || 4
        })
    }
    return myStyles
}

// Single select
export const SingleSelect = ({ name, control, isClearable, error, label, placeholder, borderRadius, options, defaultvalue, rules }) => {
    const {
        field: { onChange, onBlur, value, ref }
    } = useController({
        name,
        control,
        rules: { ...rules },
        defaultValue: defaultvalue
    })

    const handleSelect = event => onChange(event)

    return (
        <div>
            {error ?
                <Text className="text-sm text-red-500 mb-1">{error}</Text> :
                <Text className="text-sm text-gray-700 mb-1">{label}</Text>
            }

            <Select
                classNamePrefix="custom-select"
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={name} // send down the input name
                inputRef={ref} // send input ref, so we can focus on input when error appear
                placeholder={placeholder}
                styles={customStyles(borderRadius)}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null
                }}
                options={options}
                onChange={handleSelect}
                isClearable={isClearable}
                defaultValue={defaultvalue ? { ...defaultvalue } : null}
            />
        </div>
    );
}

// Creatable Select
export const CreatableSelect = ({ name, control, error, label, placeholder, borderRadius, defaultvalue, isMulti, rules }) => {
    const {
        field: { onChange, onBlur, value, ref }
    } = useController({
        name,
        control,
        rules: { ...rules },
        defaultValue: defaultvalue
    })

    const handleSelect = event => onChange(event)

    return (
        <div>
            {error ?
                <Text className="text-sm text-red-500 mb-1">{error}</Text> :
                <Text className="text-sm text-gray-700 mb-1">{label}</Text>
            }

            <Creatable
                classNamePrefix="custom-select"
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={name} // send down the input name
                inputRef={ref} // send input ref, so we can focus on input when error appear
                isMulti={isMulti}
                placeholder={placeholder}
                styles={customStyles(borderRadius)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={defaultvalue ? defaultvalue.map(item => ({ value: item.value, label: item.label })) : null}
                onChange={handleSelect}
            />
        </div>
    );
};

// Multi Select
export const MultiSelect = (props) => {
    const handleSelect = event => props.onChanges(event)

    return (
        <div>
            <Select
                isMulti
                ref={props.refs}
                styles={customStyles()}
                options={props.options || null}
                onChange={handleSelect}
                classNamePrefix="custom-select"
                placeholder={`Select ${props.placeholder}`}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={props.default && props.default.length ? props.default.map(item => ({ ...item })) : null}
            />
        </div>
    );
};

// Searcable select
export const SearchableSelect = (props) => {
    const { Option } = components
    const styles = {
        control: (provided, state) => ({
            ...provided,
            ...props.styles,
            minHeight: 42,
            fontSize: 14,
            color: '#000',
            background: '#fff',
            boxShadow: 'none', '&:hover': { borderColor: '1px solid #ced4da' },
            border: state.isFocused ? '1px solid #dfdfdf' : '1px solid #ced4da',
            borderRadius: props.borderRadius || 25,
            paddingLeft: 5,
            paddingRight: 5,
            marginBottom: "30px"
        })
    }

    // Add image in each option
    const Imageoption = (props) => (
        <Option {...props}>
            {props.data.image ? <img src={props.data.image} style={{ width: 30, height: 30, marginRight: 5 }} alt="..." /> : null}
            {props.data.label}
        </Option>
    );

    // Search from API
    const searchOptions = (inputValue, callback) => {
        props.search(inputValue).then(results => {
            if (results) {
                setTimeout(() => {
                    callback(results)
                }, 500)
            }
        })
    }

    // Handle select
    const handleSelect = event => props.onChanges(event)

    return (
        <div>
            <AsyncSelect
                ref={props.refs}
                cacheOptions
                styles={styles}
                isMulti={props.isMulti}
                onChange={handleSelect}
                isClearable={props.isClearable}
                loadOptions={searchOptions}
                placeholder={props.placeholder}
                loadingMessage={() => 'Searching ...'}
                noOptionsMessage={() => 'No results found !'}
                defaultValue={props.defaultValue ? { ...props.defaultValue } : null}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    Option: Imageoption
                }}
            />
        </div>
    )
}
