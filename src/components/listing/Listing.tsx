import React from "react"
import cn from "classnames";
import css from "./styles.module.scss";
import { snakeToHumanReadable } from "@utils/formatter";
import Option from "@ui/forms/groups/select-group/Option";
import { useSearchParams } from "react-router-dom";
import ListingFilter from "./ListingFiler";

export enum HeaderType {
    INPUT,
    ASYNC_DROPDOWN,
    DROPDOWN,
    DATE,
    ACTION
}

export type Header =
    | { name: string; type: HeaderType.INPUT }
    | { name: string; type: HeaderType.DATE }
    | { name: string; type: HeaderType.ACTION }
    | { name: string; type: HeaderType.DROPDOWN; options: Option[] }
    | { name: string; type: HeaderType.ASYNC_DROPDOWN; options: Option[] };



export interface Value {
    key: string,
    value: string | number | React.ReactNode
}

interface ListingProps {
    headers: Header[],
    values: Value[][]
}

export default function Listing({ headers, values }: ListingProps) {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <table className={cn(css.table, "mt-2")}>
            <thead>
                <tr>
                    {headers.map((head) => {
                        return (
                            <th scope="col" key={head.name}>
                                <div className={css.searchHead}>
                                    <ListingFilter
                                        head={head}
                                        searchParams={searchParams}
                                        setSearchParams={setSearchParams}
                                    />
                                    <div> {snakeToHumanReadable(head.name)}</div>
                                </div>

                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {values.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cell) => (
                            <td key={cell.key}>{cell.value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

}