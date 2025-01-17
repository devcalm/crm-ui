import { Header, HeaderType } from "./Listing";
import Select from "react-select";
import { SetURLSearchParams } from "react-router-dom";
import Option, { selectedOption } from "@ui/forms/groups/select-group/Option";
import Input from "@ui/forms/input/Input";
import "react-datepicker/dist/react-datepicker.css";
import DateFilter from "@components/listing/filters/DateFilter";
import formCSS from "@ui/forms/form.module.scss"
import { useState, useRef } from "react";

interface ListingFilerProps {
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
    head: Header
}

export default function ListingFilter({ head, searchParams, setSearchParams }: ListingFilerProps) {
    const [value, setValue] = useState<string>(searchParams.get(head.name) || "");
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const updateQuery = (key: string, value: string): void => {
        const newParams = new URLSearchParams(searchParams.toString());
        value ? newParams.set(key, value) : newParams.delete(key);
        setValue(value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            setSearchParams(newParams);
        }, 300);
    }

    switch (head.type) {
        case HeaderType.DROPDOWN:
            return dropdown(value, head.name, head.options, updateQuery);
        case HeaderType.INPUT:
            return input(value, head.name, updateQuery);
        case HeaderType.DATE:
            return date(value, head.name, updateQuery);
        default: <></>;
    }
}

function date(value: string, name: string, updateQuery: (key: string, value: string) => void) {
    return (
        <DateFilter
            name={name}
            defaultValue={value ? new Date(value) : null}
            onUpdateQuery={updateQuery}
            dateFormat="yyyy-MM-dd"
            isClearable={true}
            className={formCSS.formControl}
        />
    );
}

function input(value: string, name: string, updateQuery: (key: string, value: string) => void) {
    return <Input
        name={name}
        value={value}
        onChange={(e) => updateQuery(name, e.target.value)}
    />
}

function dropdown(value: string, name: string, options: Option[], updateQuery: (key: string, value: string) => void) {
    return <Select
        defaultValue={selectedOption(value, options)}
        onChange={(e) => updateQuery(name, e?.value || "")}
        name={name}
        options={options}
        styles={dropdownStyles}
        isSearchable={false}
        isClearable={true}
        placeholder={""}
    />;
}

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