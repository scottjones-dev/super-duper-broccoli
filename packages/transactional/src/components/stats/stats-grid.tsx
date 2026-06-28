import { Column, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface StatsGridItem {
    value: string;
    label: string;
}

export interface StatsGridProps {
    previewText: string;
    title: string;
    description?: string;
    items: StatsGridItem[];
}

export const StatsGrid = ({
    previewText,
    title,
    description,
    items,
}: StatsGridProps) => {
    const chunkedRows: StatsGridItem[][] = [];
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
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                    paddingLeft: itemIndex === 0 ? "0px" : "12px",
                                    paddingRight: itemIndex === 0 ? "12px" : "0px",
                                }}
                            >
                                <div className="bg-background border border-border rounded-lg p-6">
                                    <Text className="text-primary text-2xl font-heading font-bold m-0 mb-1 leading-tight">
                                        {item.value}
                                    </Text>
                                    <Text className="text-muted-foreground text-xs font-sans m-0 leading-normal">
                                        {item.label}
                                    </Text>
                                </div>
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

export default StatsGrid;
