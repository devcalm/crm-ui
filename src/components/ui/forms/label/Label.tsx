import React from "react";
import cn from "classnames";
import { snakeToHumanReadable } from "@utils/formatter";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

const Label: React.FC<LabelProps> = ({ className, children, ...props }) => (
    <label className={cn(className, "mb-2")} {...props}>
        {children}
    </label>
);

export function printHumanReadableLabel(name?: string, label?: string): string {
    const labelValue = label ?? name ?? "";
    return snakeToHumanReadable(labelValue);
}

export default Label;
