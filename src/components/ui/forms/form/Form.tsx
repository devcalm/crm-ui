import React from "react";
import css from "./styles.module.scss";
import cn from "classnames";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> { }

const Form: React.FC<FormProps> = ({ className, children, ...props }) => (
    <form className={cn(className, css.formContainer)} {...props}>
        {children}
    </form>
);

export default Form;