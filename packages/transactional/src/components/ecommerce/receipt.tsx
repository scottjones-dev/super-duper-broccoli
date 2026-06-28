import { Column, Hr, Link, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface ReceiptItem {
    description: string;
    quantity: number;
    amount: string;
}

export interface ReceiptProps {
    previewText: string;
    receiptNumber: string;
    paymentMethod: string;
    date: string;
    items: ReceiptItem[];
    total: string;
    supportHref: string;
    supportLabel: string;
}

export const Receipt = ({
    previewText,
    receiptNumber,
    paymentMethod,
    date,
    items,
    total,
    supportHref,
    supportLabel,
}: ReceiptProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 pt-6 pb-2">
            <Text className="text-foreground text-2xl font-heading font-bold mb-1 leading-tight text-center">
                Payment Receipt
            </Text>
            <Text className="text-muted-foreground text-sm font-sans text-center mb-4">
                Receipt #{receiptNumber} • {date}
            </Text>
            <Hr className="border-border my-2" />
        </Section>

        <Section className="px-12 py-2">
            <Row className="mb-2">
                <Column style={{ width: "50%" }}>
                    <Text className="text-muted-foreground text-xs font-sans uppercase tracking-wider m-0">
                        Payment Method
                    </Text>
                    <Text className="text-foreground text-sm font-sans font-bold m-0 mt-1">
                        {paymentMethod}
                    </Text>
                </Column>
                <Column style={{ width: "50%", textAlign: "right" }}>
                    <Text className="text-muted-foreground text-xs font-sans uppercase tracking-wider m-0">
                        Receipt Date
                    </Text>
                    <Text className="text-foreground text-sm font-sans font-bold m-0 mt-1">
                        {date}
                    </Text>
                </Column>
            </Row>
            <Hr className="border-border my-4" />
        </Section>

        {/* Receipt Items Table */}
        <Section className="px-12 py-1">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid #e0d8d0" }}>
                        <th style={{ textAlign: "left", paddingBottom: "8px" }}>
                            <Text className="text-muted-foreground text-xs font-sans uppercase tracking-wider m-0 font-bold">
                                Description
                            </Text>
                        </th>
                        <th style={{ textAlign: "center", paddingBottom: "8px", width: "15%" }}>
                            <Text className="text-muted-foreground text-xs font-sans uppercase tracking-wider m-0 font-bold">
                                Qty
                            </Text>
                        </th>
                        <th style={{ textAlign: "right", paddingBottom: "8px", width: "20%" }}>
                            <Text className="text-muted-foreground text-xs font-sans uppercase tracking-wider m-0 font-bold">
                                Amount
                            </Text>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #e0d8d0" }}>
                            <td style={{ padding: "12px 0" }}>
                                <Text className="text-foreground text-sm font-sans m-0">
                                    {item.description}
                                </Text>
                            </td>
                            <td style={{ padding: "12px 0", textAlign: "center" }}>
                                <Text className="text-foreground text-sm font-sans m-0">
                                    {item.quantity}
                                </Text>
                            </td>
                            <td style={{ padding: "12px 0", textAlign: "right" }}>
                                <Text className="text-foreground text-sm font-sans font-bold m-0">
                                    {item.amount}
                                </Text>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2} style={{ padding: "16px 0 8px 0", textAlign: "right" }}>
                            <Text className="text-foreground text-base font-sans font-bold m-0">
                                Total Paid:
                            </Text>
                        </td>
                        <td style={{ padding: "16px 0 8px 0", textAlign: "right" }}>
                            <Text className="text-primary text-base font-sans font-bold m-0">
                                {total}
                            </Text>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Hr className="border-border my-6" />
        </Section>

        <Section className="px-12 pb-6 text-center">
            <Text className="text-muted-foreground text-xs font-sans mb-2">
                If you have any questions about this receipt, please reach out to our team.
            </Text>
            <Link
                href={supportHref}
                className="text-primary text-xs font-sans font-bold no-underline"
            >
                {supportLabel} &rarr;
            </Link>
        </Section>
    </Layout>
);

export default Receipt;
