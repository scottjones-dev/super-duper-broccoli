import { Button, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface PricingCardProps {
    previewText: string;
    title: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    href: string;
    buttonLabel: string;
}

export const PricingCard = ({
    previewText,
    title,
    price,
    period,
    description,
    features,
    href,
    buttonLabel,
}: PricingCardProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 py-6">
            <Section className="bg-background border border-border rounded-lg p-8 text-center">
                <Text className="text-foreground text-xs font-sans font-bold uppercase tracking-wider mb-1">
                    {title}
                </Text>
                <Text className="text-primary text-2xl font-heading font-bold mb-1 leading-tight">
                    {price}
                </Text>
                {period && (
                    <Text className="text-muted-foreground text-xs font-sans mb-4">
                        {period}
                    </Text>
                )}
                <Text className="text-muted-foreground text-sm font-sans mb-6 leading-relaxed">
                    {description}
                </Text>

                {/* Features list centered but left-aligned */}
                <table
                    style={{
                        margin: "0 auto",
                        textAlign: "left",
                        borderCollapse: "collapse",
                    }}
                >
                    <tbody>
                        {features.map((feature, index) => (
                            <tr key={index}>
                                <td style={{ padding: "4px 0" }}>
                                    <Text className="text-muted-foreground text-xs font-sans m-0 leading-normal">
                                        • {feature}
                                    </Text>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Button
                    className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block mt-6"
                    href={href}
                >
                    {buttonLabel}
                </Button>
            </Section>
        </Section>
    </Layout>
);

export default PricingCard;
