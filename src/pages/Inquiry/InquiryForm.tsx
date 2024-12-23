import { useForm, Controller } from "react-hook-form";
import InputGroup from "@ui/forms/input-group/InputGroup";
import Form from "@ui/forms/form/Form";
import Button from "@ui/buttons/Button";

interface FormValues {
    name: string;
    description: string;
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
                name="name"
                control={control}
                defaultValue=""
                rules={{
                    required: "Name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                }}
                render={({ field, fieldState }) => (
                    <InputGroup
                        {...field}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: fieldState.isTouched || isSubmitted,
                        }}
                        placeholder="Enter your name"
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                    required: "Description is required",
                    minLength: {
                        value: 5,
                        message: "Description must be at least 5 characters",
                    },
                }}
                render={({ field, fieldState }) => (
                    <InputGroup
                        {...field}
                        validationState={{
                            error: fieldState.error?.message,
                            wasValidating: fieldState.isTouched || isSubmitted,
                        }}
                        placeholder="Enter description"
                    />
                )}
            />

            <Button type="submit" className="btnSuccess mt-5">Create</Button>
        </Form>
    );
}