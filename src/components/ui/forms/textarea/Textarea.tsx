import React, { forwardRef } from "react";
import formCSS from "@ui/forms/form.module.scss";
import css from "./styles.module.scss";
import cn from "classnames";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    "data-validation"?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => (
        <textarea ref={ref}
            className={cn(className, css.textarea, formCSS.formControl)}
            {...props}
        />
    )
);

Textarea.displayName = "Textarea";

export default Textarea;