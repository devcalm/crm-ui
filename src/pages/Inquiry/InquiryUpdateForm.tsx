import useUpdateInquiry from "@hooks/saga/inquiry/useUpdateInquiry";
import { useBackendErrors } from "@hooks/validation/useBackendErrors";
import useProductNameFilter from "@hooks/saga/product/useProductNameFilter";
import useManagerNameFilter from "@hooks/saga/manager/useManagerNameFilter";
import { InquiryDto } from "@models/dto/inquiryDto";
import { InquiryUpdateFormData } from "@models/form-data/inquiryFormData";
import Button from "@ui/buttons/Button";
import Option from "@ui/forms/groups/select-group/Option";
import ErrorMessage from "@ui/forms/error-message/ErrorMessage";
import Form from "@ui/forms/form/Form";
import SelectGroup from "@ui/forms/groups/select-group/SelectGroup";
import { Controller, useForm } from "react-hook-form";
import useProductInitialName from "@hooks/saga/product/useProductInitialName";
import { useEffect } from "react";
import useCustomerInitialName from "@hooks/saga/customer/useCustomerInitialName";
import useManagerInitialName from "@hooks/saga/manager/useManagerInitialName";
import ValidationFormError from "@models/form-data/ValidationFormError";
import InputGroup from "@ui/forms/groups/input-group/InputGroup";

interface UpdateFormProps {
    inquiry: InquiryDto
}

export default function UpdateForm({ inquiry }: UpdateFormProps) {
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        formState: { isSubmitted },
    } = useForm<InquiryUpdateFormData>({
        mode: "onBlur",
    });

    const { handleSubmit: updateInquiry, error, loading } = useUpdateInquiry(inquiry.id);
    const errorMessage = useBackendErrors<InquiryUpdateFormData>(error, setError);

    const { productOption, productError } = useProductInitialName(inquiry.product);
    const { customerName, customerError } = useCustomerInitialName(inquiry.customer);
    const { managerOption, managerError } = useManagerInitialName(inquiry.manager);

    useEffect(() => {
        const handleFieldUpdate = (
            value: Option | string | undefined,
            error: ValidationFormError | undefined,
            fieldName: "productRefId" | "customerRefId" | "managerRefId"
        ) => {
            if (value) {
                setValue(fieldName, value);
            } else if (error) {
                setError(fieldName, error);
            }
        };

        handleFieldUpdate(productOption, productError, "productRefId");
        handleFieldUpdate(customerName, customerError, "customerRefId");
        handleFieldUpdate(managerOption, managerError, "managerRefId");
    }, [
        productOption, productError,
        customerName, customerError,
        managerOption, managerError,
        setValue, setError
    ]);

    const onSubmit = (data: InquiryUpdateFormData) => {
        if (!loading) {
            updateInquiry(data);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ErrorMessage error={errorMessage} />

            <Controller
                name="customerRefId"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                    <InputGroup
                        {...field}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: fieldState.isTouched || isSubmitted,
                        }}
                        disabled={true}
                    />
                )}
            />

            <Controller
                name="productRefId"
                control={control}
                defaultValue={productOption}
                rules={{
                    required: "Product is required"
                }}
                render={({ field, fieldState }) => (
                    <SelectGroup
                        {...field}
                        useSelectNameFilter={useProductNameFilter}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: Boolean(fieldState.error)
                                || isSubmitted
                                || fieldState.isDirty
                                || fieldState.isTouched
                        }}
                        onChange={(selectedOption) => {
                            field.onChange(selectedOption);
                            field.onBlur();
                        }}
                        inputId="productRefId"
                        label="Product"
                        placeholder="Select a product"
                    />
                )}
            />

            <Controller
                name="managerRefId"
                control={control}
                defaultValue={undefined}
                rules={{
                    required: "Manager is required"
                }}
                render={({ field, fieldState }) => (
                    <SelectGroup
                        {...field}
                        useSelectNameFilter={useManagerNameFilter}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: Boolean(fieldState.error)
                                || isSubmitted
                                || fieldState.isDirty
                                || fieldState.isTouched
                        }}
                        onChange={(selectedOption) => {
                            field.onChange(selectedOption);
                            field.onBlur();
                        }}
                        inputId="managerRefId"
                        label="Manager"
                        placeholder="Select a manager"
                    />
                )}
            />

            <Button type="submit" className="btnSuccess mt-5" disabled={loading}>
                {loading ? "Submitting..." : "Update"}
            </Button>

        </Form>
    );
}