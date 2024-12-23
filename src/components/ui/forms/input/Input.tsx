import React, { forwardRef } from "react";
import css from "./styles.module.scss";
import cn from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  "data-validation"?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref}
      className={cn(className, css.formControl)}
      {...props}
    />
  )
);

Input.displayName = "Input";

export default Input;
