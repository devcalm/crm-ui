import React from "react";
import css from "./styles.module.scss";
import cn from "classnames";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

const Label: React.FC<LabelProps> = ({ className, children, ...props }) => (
    <label className={cn(className, css.formLabel)} {...props}>
        {children}
    </label>
);

export default Label;
