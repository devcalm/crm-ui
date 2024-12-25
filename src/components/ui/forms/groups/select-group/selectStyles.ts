import { ValidationResponse } from "@hooks/validation/useValidationState";

const customStyles = (validation: ValidationResponse) => ({
    control: (base: any, state: { isFocused: any; }) => {
        let borderColor = "#ced4da"; // Default border
        let boxShadow = "none";

        if (validation.type === "error") {
            borderColor = "#dc3545"; // Red border for error
            boxShadow = state.isFocused ? "0 0 0 .15rem rgba(220, 53, 69, .25)" : "none";
        } else if (validation.type === "success") {
            borderColor = "#198754"; // Green border for success
            boxShadow = state.isFocused ? "0 0 0 .15rem rgba(25, 135, 84, .25)" : "none";
        }

        return {
            ...base,
            borderColor,
            boxShadow,
            "&:hover": {
                borderColor, 
            },
        };
    },
    menu: (base: any) => ({
        ...base,
        zIndex: 9999,
    }),
    option: (base: any, state: { isFocused: any; isSelected: any; }) => ({
        ...base,
        backgroundColor: state.isFocused
            ? "rgba(25, 135, 84, 0.1)" // Light green on hover
            : "white",
        color: state.isSelected ? "#198754" : "black",
    }),
    placeholder: (base: any) => ({
        ...base,
        color: "#6c757d", // Gray placeholder text
    }),
});

export default customStyles;