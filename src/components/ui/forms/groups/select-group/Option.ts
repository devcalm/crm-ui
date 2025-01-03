export default interface Option {
    value: string;
    label: string;
};

export function enumToOptions(enumObject: Record<string, string>): Option[] {
    return Object.values(enumObject).map((value) => ({
        value,
        label: value.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
    }));
};

export function selectedOption(value: string, options: Option[]): Option | undefined {
    return options.find(option => option.value === value);
}