import PageContentHeader from "./PageContentHeader";

interface PageContentProps {
    title: string,
    children?: React.ReactNode
};

export default function PageContent({ title, children }: PageContentProps) {
    return (
        <>
            <PageContentHeader title={title} />
            {children}
        </>
    );
}