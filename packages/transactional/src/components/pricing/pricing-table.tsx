import { Column, Row, Section, Text, Button } from "react-email";
import { Layout } from "../layout";

export interface PricingTableColumn {
    name: string;
    price: string;
    period?: string;
    features: string[];
    href: string;
    buttonLabel: string;
    isHighlighted?: boolean;
}

export interface PricingTableProps {
    previewText: string;
    title: string;
    description?: string;
    columns: PricingTableColumn[];
}

export const PricingTable = ({
    previewText,
    title,
    description,
    columns,
}: PricingTableProps) => {
    const colWidth = `${Math.floor(100 / columns.length)}%`;

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

            <Section className="px-12 py-3">
                <Row>
                    {columns.map((col, index) => (
                        <Column
                            key={index}
                            style={{
                                width: colWidth,
                                verticalAlign: "top",
                                paddingLeft: index === 0 ? "0px" : "8px",
                                paddingRight: index === columns.length - 1 ? "0px" : "8px",
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
                                        <td
                                            className={
                                                col.isHighlighted
                                                    ? "bg-background border border-border rounded-lg"
                                                    : "border border-border rounded-lg"
                                            }
                                            style={{
                                                padding: "16px",
                                            }}
                                        >
                                            <Text className="text-foreground text-xs font-sans font-bold uppercase tracking-wider m-0 mb-1">
                                                {col.name}
                                            </Text>
                                            <Text className="text-primary text-2xl font-heading font-bold m-0 mb-1 leading-tight">
                                                {col.price}
                                            </Text>
                                            {col.period && (
                                                <Text className="text-muted-foreground text-xs font-sans m-0 mb-4">
                                                    {col.period}
                                                </Text>
                                            )}

                                            <div style={{ minHeight: "120px" }}>
                                                {col.features.map((feature, fIndex) => (
                                                    <Text
                                                        key={fIndex}
                                                        className="text-muted-foreground text-xs font-sans m-0 mb-2 leading-normal"
                                                    >
                                                        • {feature}
                                                    </Text>
                                                ))}
                                            </div>

                                            <Button
                                                className="bg-background text-primary border border-border font-sans font-bold text-xs px-4 py-2 rounded-md no-underline text-center block mt-4"
                                                href={col.href}
                                                style={{ width: "100%", boxSizing: "border-box" }}
                                            >
                                                {col.buttonLabel}
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Column>
                    ))}
                </Row>
            </Section>
        </Layout>
    );
};

export default PricingTable;
