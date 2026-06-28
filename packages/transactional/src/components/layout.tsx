import { Body, Container, Head, Html, Preview, Tailwind } from "react-email";
import { emailTheme } from "../theme";

interface LayoutProps {
    preview: string;
    children: React.ReactNode;
}

export const Layout = ({ preview, children }: LayoutProps) => (
    <Html>
        <Head />
        <Preview>{preview}</Preview>
        <Tailwind config={emailTheme}>
            <Body className="bg-background font-sans">
                <Container className="mx-auto py-5 pb-12 mb-16 rounded-lg">

                    {children}
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default Layout;