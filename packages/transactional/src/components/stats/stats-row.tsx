import { Column, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface StatsRowItem {
    value: string;
    label: string;
}

export interface StatsRowProps {
    previewText: string;
    items: StatsRowItem[];
}

export const StatsRow = ({ previewText, items }: StatsRowProps) => {
    const colWidth = `${Math.floor(100 / items.length)}%`;

    return (
        <Layout preview={previewText}>
            <Section className="px-12 py-6 bg-background rounded-lg border border-border">
                <Row>
                    {items.map((item, index) => (
                        <Column
                            key={index}
                            style={{
                                width: colWidth,
                                verticalAlign: "middle",
                                textAlign: "center",
                            }}
                        >
                            <Text className="text-primary text-2xl font-heading font-bold m-0 mb-1 leading-tight text-center">
                                {item.value}
                            </Text>
                            <Text className="text-muted-foreground text-xs font-sans m-0 leading-normal text-center">
                                {item.label}
                            </Text>
                        </Column>
                    ))}
                </Row>
            </Section>
        </Layout>
    );
};

export default StatsRow;
