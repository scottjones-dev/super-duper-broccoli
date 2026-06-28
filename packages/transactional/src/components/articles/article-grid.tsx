import { Column, Img, Link, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface ArticleGridItem {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    href: string;
}

export interface ArticleGridProps {
    previewText: string;
    title: string;
    description?: string;
    items: ArticleGridItem[];
    buttonLabel: string;
}

export const ArticleGrid = ({
    previewText,
    title,
    description,
    items,
    buttonLabel,
}: ArticleGridProps) => {
    // Chunk items into rows of 2
    const chunkedRows: ArticleGridItem[][] = [];
    for (let i = 0; i < items.length; i += 2) {
        chunkedRows.push(items.slice(i, i + 2));
    }

    return (
        <Layout preview={previewText}>
            <Section className="px-12 pt-6 pb-2">
                <Text className="text-foreground text-2xl font-heading font-bold mb-2 leading-tight text-center">
                    {title}
                </Text>
                {description && (
                    <Text className="text-muted-foreground text-sm font-sans text-center mb-4 leading-relaxed">
                        {description}
                    </Text>
                )}
            </Section>

            {chunkedRows.map((row, rowIndex) => (
                <Section key={rowIndex} className="px-12 py-2">
                    <Row>
                        {row.map((item, itemIndex) => (
                            <Column
                                key={itemIndex}
                                style={{
                                    width: "50%",
                                    verticalAlign: "top",
                                    paddingLeft: itemIndex === 0 ? "0px" : "12px",
                                    paddingRight: itemIndex === 0 ? "12px" : "0px",
                                }}
                            >
                                <Img
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    className="w-full rounded-md h-auto block mb-3"
                                />
                                <Text className="text-primary text-xs font-sans font-bold uppercase tracking-wider mb-1">
                                    {item.category}
                                </Text>
                                <Text className="text-foreground text-base font-heading font-bold mb-2 leading-tight">
                                    {item.title}
                                </Text>
                                <Text className="text-muted-foreground text-xs font-sans mb-3 leading-relaxed">
                                    {item.description}
                                </Text>
                                <Link
                                    href={item.href}
                                    className="text-primary text-xs font-sans font-bold no-underline"
                                >
                                    {buttonLabel} &rarr;
                                </Link>
                            </Column>
                        ))}
                        {/* If row has only 1 item, add an empty column for visual balance */}
                        {row.length === 1 && (
                            <Column style={{ width: "50%" }} />
                        )}
                    </Row>
                </Section>
            ))}
        </Layout>
    );
};

export default ArticleGrid;
