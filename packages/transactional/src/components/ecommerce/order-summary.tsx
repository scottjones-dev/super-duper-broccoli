import { Button, Column, Hr, Img, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface OrderSummaryItem {
    title: string;
    quantity: number;
    price: string;
    imageUrl: string;
    imageAlt: string;
}

export interface OrderSummaryProps {
    previewText: string;
    orderNumber: string;
    orderDate: string;
    items: OrderSummaryItem[];
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
    href: string;
    buttonLabel: string;
}

export const OrderSummary = ({
    previewText,
    orderNumber,
    orderDate,
    items,
    subtotal,
    shipping,
    tax,
    total,
    href,
    buttonLabel,
}: OrderSummaryProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 pt-6 pb-2">
            <Text className="text-foreground text-2xl font-heading font-bold mb-1 leading-tight">
                Order Summary
            </Text>
            <Text className="text-muted-foreground text-sm font-sans mb-4">
                Order #{orderNumber} • {orderDate}
            </Text>
            <Hr className="border-border my-2" />
        </Section>

        {items.map((item, index) => (
            <Section key={index} className="px-12 py-3">
                <Row>
                    <Column
                        style={{
                            width: "20%",
                            verticalAlign: "middle",
                            paddingRight: "12px",
                        }}
                    >
                        <Img
                            src={item.imageUrl}
                            alt={item.imageAlt}
                            className="w-full rounded-md h-auto block"
                        />
                    </Column>
                    <Column style={{ width: "60%", verticalAlign: "middle" }}>
                        <Text className="text-foreground text-sm font-sans font-bold m-0 mb-1">
                            {item.title}
                        </Text>
                        <Text className="text-muted-foreground text-xs font-sans m-0">
                            Quantity: {item.quantity}
                        </Text>
                    </Column>
                    <Column
                        style={{
                            width: "20%",
                            verticalAlign: "middle",
                            textAlign: "right",
                        }}
                    >
                        <Text className="text-foreground text-sm font-sans font-bold m-0">
                            {item.price}
                        </Text>
                    </Column>
                </Row>
            </Section>
        ))}

        <Section className="px-12 pb-4">
            <Hr className="border-border my-4" />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "80%", padding: "4px 0" }}>
                            <Text className="text-muted-foreground text-sm font-sans m-0 text-right">
                                Subtotal
                            </Text>
                        </td>
                        <td style={{ width: "20%", padding: "4px 0" }}>
                            <Text className="text-foreground text-sm font-sans m-0 text-right">
                                {subtotal}
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "80%", padding: "4px 0" }}>
                            <Text className="text-muted-foreground text-sm font-sans m-0 text-right">
                                Shipping
                            </Text>
                        </td>
                        <td style={{ width: "20%", padding: "4px 0" }}>
                            <Text className="text-foreground text-sm font-sans m-0 text-right">
                                {shipping}
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "80%", padding: "4px 0" }}>
                            <Text className="text-muted-foreground text-sm font-sans m-0 text-right">
                                Tax
                            </Text>
                        </td>
                        <td style={{ width: "20%", padding: "4px 0" }}>
                            <Text className="text-foreground text-sm font-sans m-0 text-right">
                                {tax}
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "80%", padding: "8px 0 4px 0" }}>
                            <Text className="text-foreground text-base font-sans font-bold m-0 text-right">
                                Total
                            </Text>
                        </td>
                        <td style={{ width: "20%", padding: "8px 0 4px 0" }}>
                            <Text className="text-primary text-base font-sans font-bold m-0 text-right">
                                {total}
                            </Text>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Hr className="border-border my-6" />
        </Section>

        <Section className="px-12 pb-6 text-center">
            <Button
                className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                href={href}
            >
                {buttonLabel}
            </Button>
        </Section>
    </Layout>
);

export default OrderSummary;
