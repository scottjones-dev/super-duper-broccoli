import { Button, Hr, Section, Text } from "react-email";
import { Layout } from "../../components/layout";
import SimpleHeader from "../../components/headers/simple";
import SimpleFooter from "../../components/footers/simple";

export interface OrderItem {
    title: string;
    quantity: number;
    price: string;
}

export interface OrderConfirmationProps {
    previewText: string;
    userName: string;
    orderId: string;
    orderDate: string;
    items: OrderItem[];
    totalPrice: string;
    viewOrderUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
}

export const OrderConfirmation = ({
    previewText,
    userName,
    orderId,
    orderDate,
    items,
    totalPrice,
    viewOrderUrl,
    logoUrl,
    logoAlt,
    logoWidth,
    logoHeight,
    companyName,
}: OrderConfirmationProps) => (
    <Layout preview={previewText}>
        <SimpleHeader
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            {...(logoWidth !== undefined ? { logoWidth } : {})}
            {...(logoHeight !== undefined ? { logoHeight } : {})}
        />
        <Section className="px-12 py-4">
            <Text className="text-foreground text-2xl font-heading font-bold mb-4 leading-tight">
                Order Confirmation
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-4 leading-relaxed">
                Hi {userName},
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-6 leading-relaxed">
                Thank you for your order! We are preparing your items and will notify you as soon as they ship.
            </Text>

            <Hr className="border-border my-4" />

            <Text className="text-foreground text-base font-heading font-bold mb-3">
                Order details (Order #{orderId} • {orderDate})
            </Text>

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #e0d8d0" }}>
                            <td style={{ padding: "12px 0" }}>
                                <Text className="text-foreground text-sm font-sans m-0">
                                    {item.title} (x{item.quantity})
                                </Text>
                            </td>
                            <td style={{ padding: "12px 0", textAlign: "right" }}>
                                <Text className="text-foreground text-sm font-sans font-bold m-0">
                                    {item.price}
                                </Text>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td style={{ padding: "16px 0 8px 0", textAlign: "right" }}>
                            <Text className="text-foreground text-base font-sans font-bold m-0">
                                Total:
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

            <Section className="mb-6 text-center">
                <Button
                    className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                    href={viewOrderUrl}
                >
                    View order
                </Button>
            </Section>
        </Section>
        <SimpleFooter companyName={companyName} />
    </Layout>
);

OrderConfirmation.PreviewProps = {
    previewText: "Your order has been confirmed!",
    userName: "Pinky",
    orderId: "DB-98765",
    orderDate: "Thursday, June 25, 2026",
    items: [
        { title: "Artisanal Sourdough Bread", quantity: 1, price: "£8.50" },
        { title: "Valrhona Chocolate Croissant", quantity: 3, price: "£14.25" },
        { title: "Raspberry Macaron Box (6pcs)", quantity: 1, price: "£18.00" },
    ],
    totalPrice: "£40.75",
    viewOrderUrl: "https://app.deeliciousbakes.com/orders/DB-98765",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "Deelicious Bakes logo",
    logoHeight: 50,
    logoWidth: 150,
    companyName: "Deelicious Bakes",
} satisfies OrderConfirmationProps;

export default OrderConfirmation;
