import cn from "classnames";
import css from "./styles.module.scss";
import React, { ButtonHTMLAttributes } from "react";
import combineClassNames from "@utils/combineClassNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => (

    <button className={cn(css.btn, combineClassNames(css, className))} {...props} >
        {children}
    </button>
);

export default Button;