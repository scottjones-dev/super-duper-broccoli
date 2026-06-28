import { Hr, Link, Section, Text } from "react-email";

export interface SimpleFooterProps {
    companyName: string;
    unsubscribeUrl?: string;
}

export const SimpleFooter = ({ companyName, unsubscribeUrl, }: SimpleFooterProps) => (

    <Section className="px-12 pb-8">
        <Hr className="border-border my-5" />

        <Text className="text-muted-foreground text-xs leading-5 text-center">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
        </Text>

        {unsubscribeUrl && (
            <Text className="text-muted-foreground text-xs leading-5 text-center">
                <Link
                    href={unsubscribeUrl}
                    className="text-muted-foreground underline"
                >
                    Unsubscribe
                </Link>
            </Text>
        )}
    </Section>
);

export default SimpleFooter;