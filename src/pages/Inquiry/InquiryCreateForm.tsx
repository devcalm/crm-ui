import { useForm, Controller } from "react-hook-form";
import InputGroup from "@ui/forms/groups/input-group/InputGroup";
import Form from "@ui/forms/form/Form";
import Button from "@ui/buttons/Button";
import SelectGroup from "@ui/forms/groups/select-group/SelectGroup";
import TextareaGroup from "@ui/forms/groups/textarea-group/TextareaGroup";
import useProductNameFilter from "@hooks/saga/product/useProductNameFilter";
import useCustomerNameFilter from "@hooks/saga/customer/useCustomerNameFilter";
import useManagerNameFilter from "@hooks/saga/manager/useManagerNameFilter";
import { InquiryCreateFormData } from "@models/form-data/inquiryFormData";
import useCreateInquiry from "@hooks/saga/inquiry/useCreateInquiry";

export default function InquiryForm() {
    const {
        control,
        handleSubmit,
        formState: { isSubmitted },
    } = useForm<InquiryCreateFormData>({
        mode: "onBlur",
    });

    const { handleSubmit: createInquiry } = useCreateInquiry();

    const onSubmit = (data: InquiryCreateFormData) => {
        createInquiry(data);
        console.log("Submitted Data: ", data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                    <SelectGroup
                        {...field}
                        useSelectNameFilter = {useProductNameFilter}
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
                    <SelectGroup
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
                    <SelectGroup
                        {...field}
                        useSelectNameFilter = {useCustomerNameFilter}
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

            <Button type="submit" className="btnSuccess mt-5">Create</Button>

        </Form>
    );
}