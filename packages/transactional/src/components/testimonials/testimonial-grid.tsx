import { Column, Img, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface TestimonialGridItem {
    quote: string;
    authorName: string;
    authorTitle?: string;
    authorImageUrl?: string;
}

export interface TestimonialGridProps {
    previewText: string;
    title: string;
    description?: string;
    items: TestimonialGridItem[];
}

export const TestimonialGrid = ({
    previewText,
    title,
    description,
    items,
}: TestimonialGridProps) => {
    const chunkedRows: TestimonialGridItem[][] = [];
    for (let i = 0; i < items.length; i += 2) {
        chunkedRows.push(items.slice(i, i + 2));
    }

    return (
        <Layout preview={previewText}>
            <Section className="px-12 pt-6 pb-2 text-center">
                <Text className="text-foreground text-2xl font-heading font-bold mb-2 leading-tight">
                    {title}
                </Text>
                {description && (
                    <Text className="text-muted-foreground text-sm font-sans mb-4 leading-relaxed">
                        {description}
                    </Text>
                )}
            </Section>

            {chunkedRows.map((row, rowIndex) => (
                <Section key={rowIndex} className="px-12 py-3">
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
                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                    }}
                                >
                                    <tbody>
                                        <tr>
                                            <td className="bg-background border border-border rounded-lg" style={{ padding: "16px" }}>
                                                <Text className="text-primary text-sm font-heading italic leading-relaxed m-0 mb-4">
                                                    &ldquo;{item.quote}&rdquo;
                                                </Text>

                                                {item.authorImageUrl ? (
                                                    <table style={{ borderCollapse: "collapse" }}>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ paddingRight: "8px", verticalAlign: "middle" }}>
                                                                    <Img
                                                                        src={item.authorImageUrl}
                                                                        alt={item.authorName}
                                                                        width={32}
                                                                        height={32}
                                                                        style={{ borderRadius: "50%" }}
                                                                        className="block"
                                                                    />
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    <Text className="text-foreground text-xs font-sans font-bold m-0">
                                                                        {item.authorName}
                                                                    </Text>
                                                                    {item.authorTitle && (
                                                                        <Text className="text-muted-foreground text-[10px] font-sans m-0 mt-0.5">
                                                                            {item.authorTitle}
                                                                        </Text>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <div>
                                                        <Text className="text-foreground text-xs font-sans font-bold m-0">
                                                            {item.authorName}
                                                        </Text>
                                                        {item.authorTitle && (
                                                            <Text className="text-muted-foreground text-[10px] font-sans m-0 mt-0.5">
                                                                {item.authorTitle}
                                                            </Text>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Column>
                        ))}
                        {row.length === 1 && (
                            <Column style={{ width: "50%" }} />
                        )}
                    </Row>
                </Section>
            ))}
        </Layout>
    );
};

export default TestimonialGrid;
