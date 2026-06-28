import { Button, Section, Text } from "react-email";
import { Layout } from "../components/layout";
import SimpleHeader from "../components/headers/simple";

export interface WelcomeEmailProps {
    userName: string;
    dashboardUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoHeight: number;
    logoWidth: number;
}

export const WelcomeEmail = ({ userName, dashboardUrl, logoUrl, logoAlt, logoHeight, logoWidth }: WelcomeEmailProps) => (
    <Layout preview={`Welcome to deeliciousbakes, ${userName}!`}>
        <SimpleHeader logoAlt={logoAlt} logoUrl={logoUrl} logoHeight={logoHeight} logoWidth={logoWidth} />
        <Section className="px-12">
            <Text className="text-foreground text-2xl font-heading font-bold leading-tight text-left">
                Welcome to deeliciousbakes 🧁
            </Text>
            <Text className="text-muted-foreground text-base leading-6 text-left">
                Hi {userName}, your account is ready. Start managing orders, inventory,
                and recipes from your dashboard right away.
            </Text>
            <Button
                className="bg-primary text-primary-foreground rounded-md text-[16px] font-bold no-underline text-center block p-3"
                href={dashboardUrl}
            >
                Go to your dashboard
            </Button>
        </Section>
    </Layout>
);

WelcomeEmail.PreviewProps = {
    userName: "Pinky",
    dashboardUrl: "https://app.deeliciousbakes.com/dashboard",
    logoUrl: "https://deeliciousbakes.com/logo.png",
    logoAlt: "deeliciousbakes logo",
    logoHeight: 50,
    logoWidth: 150,
} satisfies WelcomeEmailProps;

export default WelcomeEmail;