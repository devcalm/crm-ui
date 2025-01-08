import ValidationFormError from "@models/form-data/ValidationFormError";

interface Props {
    loading?: boolean,
    name?: string,
    error?: ValidationFormError
}

export default function RelationalName({ loading, name, error }: Props) {
    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return <>Error: {error.message}</>;
    }

    if (name) {
        return <>{name}</>;
    }

    return <>No information available.</>;
};