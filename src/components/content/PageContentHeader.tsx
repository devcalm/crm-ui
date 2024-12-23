import css from "./styles.module.scss";

interface PageContentHeaderProps {
    title: string
};

export default function PageContentHeader({ title }: PageContentHeaderProps) {

    return (
        <div className={css.appContentHeader}>
            <h1>{title}</h1>
        </div>
    );
}