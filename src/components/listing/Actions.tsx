import { Link } from "react-router-dom";
import css from "./styles.module.scss";
import classNames from "classnames";

interface ActionsProps {
    edit: string,
    view: string
}

export default function Actions({edit, view}: ActionsProps) {
    return (
        <div>
            <Link to={view}>
                <span
                    className={classNames(css.actions, "material-symbols-outlined")}
                    data-action="view"
                >
                    visibility
                </span>
            </Link>
            <Link to={edit}>
                <span
                    className={classNames(css.actions, "material-symbols-outlined")}
                    data-action="edit"
                >
                    edit</span>
            </Link>
        </div>
    );
}