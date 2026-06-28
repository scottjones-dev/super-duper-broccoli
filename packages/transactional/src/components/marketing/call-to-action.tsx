import { Button, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface CallToActionProps {
    previewText: string;
    title: string;
    description: string;
    href: string;
    buttonLabel: string;
}

export const CallToAction = ({
    previewText,
    title,
    description,
    href,
    buttonLabel,
}: CallToActionProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 py-6 text-center">
            <Text className="text-foreground text-2xl font-heading font-bold mb-2 leading-tight">
                {title}
            </Text>
            <Text className="text-muted-foreground text-sm font-sans mb-6 leading-relaxed">
                {description}
            </Text>
            <Button
                className="bg-background text-primary border border-border font-sans font-bold text-sm px-6 py-3 rounded-md no-underline text-center inline-block"
                href={href}
            >
                {buttonLabel}
            </Button>
        </Section>
    </Layout>
);

export default CallToAction;
