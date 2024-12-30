import { BackendError } from "@models/dto/BackendError";
import { useEffect, useState } from "react";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

export function useBackendErrors<T extends FieldValues>(
    backendError: BackendError | undefined,
    setError: UseFormSetError<T>
) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (backendError === undefined) {
            setErrorMessage(undefined);
            return;
        }

        if (backendError.errors) {
            Object.entries(backendError.errors).forEach(([field, message]) => {
                setError(field as Path<T>, {
                    type: "backend",
                    message,
                });
            });
        } else {
            setErrorMessage(backendError.detail);
        }
    }, [backendError, setError]);

    return errorMessage;
}
