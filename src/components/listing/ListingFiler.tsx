import { Header, HeaderType } from "./Listing";
import Select from "react-select";
import { SetURLSearchParams } from "react-router-dom";
import Option from "@ui/forms/groups/select-group/Option";
import Input from "@ui/forms/input/Input";
import "react-datepicker/dist/react-datepicker.css";
import DateFilterComponent from "@components/listing/filters/DateFilter";
import { useState, useRef } from "react";
import { debounce } from "@utils/timeUtil";
import formCSS from "@ui/forms/form.module.scss"

interface ListingFilerProps {
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
    head: Header
}

const updateSearchParams = (
    key: string,
    value: string,
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
) => {
    const newParams = new URLSearchParams(searchParams.toString());
    value ? newParams.set(key, value) : newParams.delete(key);
    setSearchParams(newParams);
};

export default function ListingFilter({ head, searchParams, setSearchParams }: ListingFilerProps) {
    const [value, setValue] = useState<string>(searchParams.get(head.name) || "");
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const handleUpdate = (key: string, newValue: string) => {
        setValue(newValue);
        debounce(
            () => updateSearchParams(key, newValue, searchParams, setSearchParams),
            300,
            debounceTimer
        );
    };

    switch (head.type) {
        case HeaderType.DROPDOWN:
            return (
                <DropdownFilter
                    name={head.name}
                    value={value}
                    options={head.options}
                    onChange={handleUpdate}
                />
            );
        case HeaderType.INPUT:
            return <InputFilter name={head.name} value={value} onChange={handleUpdate} />;
        case HeaderType.DATE:
            return <DateFilter name={head.name} value={value} onChange={handleUpdate} />;
        default:
            return <></>;
    }

}

interface InputFilterProps {
    name: string;
    value: string;
    onChange: (key: string, value: string) => void;
}
const InputFilter = ({ name, value, onChange }: InputFilterProps) => (
    <Input
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={formCSS.formControl}
    />
);

interface DateFilterProps {
    name: string;
    value: string;
    onChange: (key: string, value: string) => void;
}
const DateFilter = ({ name, value, onChange }: DateFilterProps) => (
    <DateFilterComponent
        name={name}
        defaultValue={value ? new Date(value) : null}
        onUpdateQuery={onChange}
        dateFormat="yyyy-MM-dd"
        isClearable
        className={formCSS.formControl}
    />
);

interface DropdownFilterProps {
    name: string;
    value: string;
    options: Option[];
    onChange: (key: string, value: string) => void;
}
const DropdownFilter = ({ name, value, options, onChange }: DropdownFilterProps) => (
    <Select
        value={options.find((option) => option.value === value) || null}
        onChange={(selected) => onChange(name, selected?.value || "")}
        name={name}
        options={options}
        styles={dropdownStyles}
        isSearchable={false}
        isClearable
        placeholder=""
    />
);

const dropdownStyles = {
    control: (base: any, state: { isFocused: any; }) => ({
        ...base,
        height: "1.5rem",
        minHeight: "1.5rem",
        borderColor: "#ced4da",
        boxShadow: state.isFocused ? "0 0 0 0.15rem rgba(13, 110, 253, 0.25)" : base.boxShadow,
        "&:hover": {
            borderColor: "#ced4da"
        },
    }),
    valueContainer: (base: any) => ({
        ...base,
        height: "1.5rem",
        padding: 0,
        fontWeight: 400
    }),
    indicatorsContainer: (base: any) => ({
        ...base,
        height: "1.5rem",
    }),
}