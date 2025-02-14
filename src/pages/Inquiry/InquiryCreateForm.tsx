import { useForm, Controller } from "react-hook-form";
import InputGroup from "@ui/forms/groups/input-group/InputGroup";
import Form from "@ui/forms/form/Form";
import Button from "@ui/buttons/Button";
import AsyncSelectGroup from "@ui/forms/groups/select-group/AsyncSelectGroup";
import TextareaGroup from "@ui/forms/groups/textarea-group/TextareaGroup";
import useProductNameFilter from "@hooks/saga/product/useProductNameFilter";
import useCustomerNameFilter from "@hooks/saga/customer/useCustomerNameFilter";
import useManagerNameFilter from "@hooks/saga/manager/useManagerNameFilter";
import { InquiryCreateFormData } from "@models/form-data/inquiryFormData";
import useCreateInquiry from "@hooks/saga/inquiry/useCreateInquiry";
import ErrorMessage from "@ui/forms/error-message/ErrorMessage";
import { useBackendErrors } from "@hooks/validation/useBackendErrors";

export default function InquiryCreateForm() {
    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitted },
    } = useForm<InquiryCreateFormData>({
        mode: "onBlur",
    });

    const { handleSubmit: createInquiry, error, loading } = useCreateInquiry();
    const errorMessage = useBackendErrors<InquiryCreateFormData>(error, setError);

    const onSubmit = (data: InquiryCreateFormData) => {
        if (!loading) {
            createInquiry(data);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ErrorMessage error={errorMessage} />
            <Controller
                name="source"
                control={control}
                defaultValue=""
                rules={{
                    required: "Source is required",
                    minLength: { value: 2, message: "Source must be at least 2 characters" },
                    maxLength: { value: 100, message: "Source should not be more than 100 characters" },
                }}
                render={({ field, fieldState }) => (
                    <InputGroup
                        {...field}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: fieldState.isTouched || isSubmitted,
                        }}
                        placeholder="Enter source"
                    />
                )}
            />

            <Controller
                name="productRefId"
                control={control}
                defaultValue={undefined}
                rules={{
                    required: "Product is required"
                }}
                render={({ field, fieldState }) => (
                    <AsyncSelectGroup
                        {...field}
                        useSelectNameFilter={useProductNameFilter}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: fieldState.isTouched || isSubmitted || Boolean(field.value),
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
                    <AsyncSelectGroup
                        {...field}
                        useSelectNameFilter={useManagerNameFilter}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: fieldState.isTouched || isSubmitted || Boolean(field.value),
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

            <Controller
                name="customerRefId"
                control={control}
                defaultValue={undefined}
                rules={{
                    required: "Customer is required"
                }}
                render={({ field, fieldState }) => (
                    <AsyncSelectGroup
                        {...field}
                        useSelectNameFilter={useCustomerNameFilter}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: fieldState.isTouched || isSubmitted || Boolean(field.value),
                        }}
                        onChange={(selectedOption) => {
                            field.onChange(selectedOption);
                            field.onBlur();
                        }}
                        inputId="customerRefId"
                        label="Customer"
                        placeholder="Select a customer"
                    />
                )}
            />

            <Controller
                name="comment"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                    <TextareaGroup
                        {...field}
                        placeholder="Enter a comment..."
                    />
                )}
            />

            <Controller
                name="note"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                    <TextareaGroup
                        {...field}
                        placeholder="Enter a note..."
                    />
                )}
            />

            <Button type="submit" className="btnSuccess mt-5" disabled={loading}>
                {loading ? "Submitting..." : "Create"}
            </Button>
        </Form>
    );
}