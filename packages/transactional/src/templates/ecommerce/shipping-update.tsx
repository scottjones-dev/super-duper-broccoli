import { Button, Hr, Section, Text } from "react-email";
import { Layout } from "../../components/layout";
import SimpleHeader from "../../components/headers/simple";
import SimpleFooter from "../../components/footers/simple";

export interface ShippingUpdateProps {
    previewText: string;
    userName: string;
    orderId: string;
    carrier: string;
    trackingNumber: string;
    trackingUrl: string;
    estimatedDelivery?: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
}

export const ShippingUpdate = ({
    previewText,
    userName,
    orderId,
    carrier,
    trackingNumber,
    trackingUrl,
    estimatedDelivery,
    logoUrl,
    logoAlt,
    logoWidth,
    logoHeight,
    companyName,
}: ShippingUpdateProps) => (
    <Layout preview={previewText}>
        <SimpleHeader
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            {...(logoWidth !== undefined ? { logoWidth } : {})}
            {...(logoHeight !== undefined ? { logoHeight } : {})}
        />
        <Section className="px-12 py-4">
            <Text className="text-foreground text-2xl font-heading font-bold mb-4 leading-tight">
                Your order is on the way!
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-4 leading-relaxed">
                Hi {userName},
            </Text>
            <Text className="text-muted-foreground text-base font-sans mb-6 leading-relaxed">
                Great news! Your order #{orderId} has been shipped and is heading your way.
            </Text>

            <Hr className="border-border my-4" />

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
                <tbody>
                    <tr>
                        <td style={{ padding: "8px 0" }}>
                            <Text className="text-muted-foreground text-sm font-sans m-0">
                                Shipping Carrier
                            </Text>
                        </td>
                        <td style={{ padding: "8px 0", textAlign: "right" }}>
                            <Text className="text-foreground text-sm font-sans font-bold m-0">
                                {carrier}
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: "8px 0" }}>
                            <Text className="text-muted-foreground text-sm font-sans m-0">
                                Tracking Number
                            </Text>
                        </td>
                        <td style={{ padding: "8px 0", textAlign: "right" }}>
                            <Text className="text-foreground text-sm font-sans font-bold m-0">
                                {trackingNumber}
                            </Text>
                        </td>
                    </tr>
                    {estimatedDelivery && (
                        <tr>
                            <td style={{ padding: "8px 0" }}>
                                <Text className="text-muted-foreground text-sm font-sans m-0">
                                    Estimated Delivery
                                </Text>
                            </td>
                            <td style={{ padding: "8px 0", textAlign: "right" }}>
                                <Text className="text-primary text-sm font-sans font-bold m-0">
                                    {estimatedDelivery}
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Section className="mb-6 text-center">
                <Button
                    className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                    href={trackingUrl}
                >
                    Track shipment
                </Button>
            </Section>
        </Section>
        <SimpleFooter companyName={companyName} />
    </Layout>
);

ShippingUpdate.PreviewProps = {
    previewText: "Your baked goodies have shipped!",
    userName: "Pinky",
    orderId: "DB-98765",
    carrier: "FedEx Home Delivery",
    trackingNumber: "771234567890",
    trackingUrl: "https://fedex.com/track",
    estimatedDelivery: "Friday, June 26, 2026",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "Deelicious Bakes logo",
    logoHeight: 50,
    logoWidth: 150,
    companyName: "Deelicious Bakes",
} satisfies ShippingUpdateProps;

export default ShippingUpdate;
