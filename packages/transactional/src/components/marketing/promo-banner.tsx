import { Button, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface PromoBannerProps {
    previewText: string;
    title: string;
    code: string;
    discountText: string;
    description: string;
    href: string;
    buttonLabel: string;
}

export const PromoBanner = ({
    previewText,
    title,
    code,
    discountText,
    description,
    href,
    buttonLabel,
}: PromoBannerProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 py-6 text-center">
            <Text className="text-primary text-2xl font-heading font-bold mb-1 leading-tight">
                {discountText}
            </Text>
            <Text className="text-foreground text-xl font-heading font-bold mb-2 leading-tight">
                {title}
            </Text>
            <Text className="text-muted-foreground text-sm font-sans mb-4 leading-relaxed">
                {description}
            </Text>

            <Section className="bg-background border border-dashed border-border py-3 px-6 rounded-md mb-6 inline-block w-auto mx-auto text-center">
                <Text className="text-foreground font-sans font-bold tracking-widest text-sm m-0">
                    USE CODE: {code}
                </Text>
            </Section>

            <Section className="text-center block mt-2">
                <Button
                    className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                    href={href}
                >
                    {buttonLabel}
                </Button>
            </Section>
        </Section>
    </Layout>
);

export default PromoBanner;
