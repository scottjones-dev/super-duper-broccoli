import { Hr, Section, Text } from "react-email";
import { Layout } from "../../components/layout";
import SimpleHeader from "../../components/headers/simple";
import SimpleFooter from "../../components/footers/simple";

export interface InvoiceItem {
    description: string;
    quantity: number;
    amount: string;
}

export interface ReceiptProps {
    previewText: string;
    userName: string;
    receiptId: string;
    date: string;
    items: InvoiceItem[];
    totalPrice: string;
    paymentMethod: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
}

export const Receipt = ({
    previewText,
    userName,
    receiptId,
    date,
    items,
    totalPrice,
    paymentMethod,
    logoUrl,
    logoAlt,
    logoWidth,
    logoHeight,
    companyName,
}: ReceiptProps) => (
    <Layout preview={previewText}>
        <SimpleHeader
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            {...(logoWidth !== undefined ? { logoWidth } : {})}
            {...(logoHeight !== undefined ? { logoHeight } : {})}
        />
        <Section className="px-12 py-4">
            <Text className="text-foreground text-2xl font-heading font-bold mb-4 leading-tight">
                Payment Receipt
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-4 leading-relaxed">
                Hi {userName},
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-6 leading-relaxed">
                Thank you for your payment. This is your official confirmation receipt for transaction #{receiptId}.
            </Text>

            <Hr className="border-border my-4" />

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
                <tbody>
                    <tr>
                        <td style={{ verticalAlign: "top" }}>
                            <Text className="text-muted-foreground text-xs font-sans uppercase tracking-wider m-0">
                                Payment Method
                            </Text>
                            <Text className="text-foreground text-sm font-sans font-bold m-0 mt-1">
                                {paymentMethod}
                            </Text>
                        </td>
                        <td style={{ verticalAlign: "top", textAlign: "right" }}>
                            <Text className="text-muted-foreground text-xs font-sans uppercase tracking-wider m-0">
                                Receipt Date
                            </Text>
                            <Text className="text-foreground text-sm font-sans font-bold m-0 mt-1">
                                {date}
                            </Text>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Hr className="border-border my-4" />

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
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
                                {totalPrice}
                            </Text>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Section>
        <SimpleFooter companyName={companyName} />
    </Layout>
);

Receipt.PreviewProps = {
    previewText: "Your payment receipt",
    userName: "Pinky",
    receiptId: "REC-44321",
    date: "Thursday, June 25, 2026",
    items: [
        { description: "Double Fudge Chocolate Cake (8\")", quantity: 1, amount: "£45.00" },
        { description: "Custom Delivery Charge", quantity: 1, amount: "£15.00" },
    ],
    totalPrice: "£60.00",
    paymentMethod: "Apple Pay (•••• 9988)",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "Deelicious Bakes logo",
    logoHeight: 50,
    logoWidth: 150,
    companyName: "Deelicious Bakes",
} satisfies ReceiptProps;

export default Receipt;
