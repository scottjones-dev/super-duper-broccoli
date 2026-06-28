import { Column, Img, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface FeatureGridItem {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
}

export interface FeatureGridProps {
    previewText: string;
    title: string;
    description?: string;
    items: FeatureGridItem[];
}

export const FeatureGrid = ({
    previewText,
    title,
    description,
    items,
}: FeatureGridProps) => {
    const chunkedRows: FeatureGridItem[][] = [];
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
                                {item.imageUrl && (
                                    <Img
                                        src={item.imageUrl}
                                        alt={item.imageAlt || ""}
                                        width={48}
                                        height={48}
                                        className="mb-3 block"
                                    />
                                )}
                                <Text className="text-foreground text-base font-heading font-bold mb-1 leading-tight">
                                    {item.title}
                                </Text>
                                <Text className="text-muted-foreground text-xs font-sans mb-4 leading-relaxed">
                                    {item.description}
                                </Text>
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

export default FeatureGrid;
