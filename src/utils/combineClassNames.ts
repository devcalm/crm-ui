const combineClassNames = (
    cssModule: Record<string, string>,
    className?: string
): string => {
    return className
        ?.split(" ")
        .map(cls => cssModule[cls] || cls)
        .join(" ") || "";
}

export default combineClassNames;