import { convertToLocalDate } from "@utils/formatter";
import { useState } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateFilterProps = DatePickerProps & {
    name: string;
    defaultValue: Date | null;
    selectsMultiple?: never; 
    selectsRange?: never;
    onUpdateQuery: (key: string, value: string) => void;
}

export default function DateFilter({ name, defaultValue, onUpdateQuery, ...props }: DateFilterProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue);

    return (
        <DatePicker
            name={name}
            selected={selectedDate}
            onChange={(date: Date | null) => {
                const value = date ? convertToLocalDate(date) : '';
                setSelectedDate(date);
                onUpdateQuery(name, value);
            }}
            {...props}
        />
    );
}