import { useForm, Controller } from "react-hook-form";
import InputGroup from "@ui/forms/groups/input-group/InputGroup";
import Form from "@ui/forms/form/Form";
import Button from "@ui/buttons/Button";
import SelectGroup from "@ui/forms/groups/select-group/SelectGroup";
import TextareaGroup from "@ui/forms/groups/textarea-group/TextareaGroup";
import useProductNameFilter from "@hooks/saga/product/useProductNameFilter";
import useCustomerNameFilter from "@hooks/saga/customer/useCustomerNameFilter";
import useManagerNameFilter from "@hooks/saga/manager/useManagerNameFilter";

interface FormValues {
    source: string;
    productRefId: string;
    managerRefId: string;
    customerRefId: string;
    comment: string;
    note: string;
}

export default function InquiryForm() {
    const {
        control,
        handleSubmit,
        formState: { isSubmitted },
    } = useForm<FormValues>({
        mode: "onBlur",
    });

    const onSubmit = (data: FormValues) => {
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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