import { Column, Hr, Img, Link, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface ArticleListItem {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    href: string;
    readTime?: string;
}

export interface ArticleListProps {
    previewText: string;
    title: string;
    description?: string;
    items: ArticleListItem[];
    buttonLabel: string;
}

export const ArticleList = ({
    previewText,
    title,
    description,
    items,
    buttonLabel,
}: ArticleListProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 pt-6 pb-2">
            <Text className="text-foreground text-2xl font-heading font-bold mb-2 leading-tight">
                {title}
            </Text>
            {description && (
                <Text className="text-muted-foreground text-sm font-sans mb-4 leading-relaxed">
                    {description}
                </Text>
            )}
        </Section>

        {items.map((item, index) => (
            <Section key={index}>
                <Section className="px-12 py-4">
                    <Row>
                        <Column
                            style={{
                                width: "35%",
                                verticalAlign: "top",
                                paddingRight: "16px",
                            }}
                        >
                            <Img
                                src={item.imageUrl}
                                alt={item.imageAlt}
                                className="w-full rounded-md h-auto block"
                            />
                        </Column>
                        <Column style={{ width: "65%", verticalAlign: "top" }}>
                            <Text className="text-primary text-xs font-sans font-bold uppercase tracking-wider mb-1">
                                {item.category}
                                {item.readTime ? ` • ${item.readTime}` : ""}
                            </Text>
                            <Text className="text-foreground text-base font-heading font-bold mb-1 leading-tight">
                                {item.title}
                            </Text>
                            <Text className="text-muted-foreground text-xs font-sans mb-2 leading-relaxed">
                                {item.description}
                            </Text>
                            <Link
                                href={item.href}
                                className="text-primary text-xs font-sans font-bold no-underline"
                            >
                                {buttonLabel} &rarr;
                            </Link>
                        </Column>
                    </Row>
                </Section>
                {index < items.length - 1 && (
                    <Section className="px-12">
                        <Hr className="border-border my-2" />
                    </Section>
                )}
            </Section>
        ))}
    </Layout>
);

export default ArticleList;
