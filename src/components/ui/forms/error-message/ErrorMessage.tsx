import React from "react";
import css from "./styles.module.scss";
import cn from "classnames";

interface ErrorProps {
    error?: string;
    className?: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ error, className }) => {
    if (!error) return null;

    return (
        <div className={cn(css.invalid, className || "showElement")}>
            {error}
        </div>
    );
};

export default ErrorMessage;
