import { Hr, Link, Section, Text } from "react-email";

export interface FooterLink {
    label: string;
    href: string;
}

export interface LinksFooterProps {
    companyName: string;
    links: FooterLink[];
}

export const LinksFooter = ({ companyName, links, }: LinksFooterProps) => (
    <Section className="px-12 pb-8">
        <Hr className="border-border my-5" />

        {links.length > 0 && (
            <Text className="text-center">
                {links.map((link, index) => (
                    <span key={`${link.label}-${link.href}`}>
                        {index > 0 && (
                            <span className="text-muted-foreground px-2">
                                |
                            </span>
                        )}

                        <Link
                            href={link.href}
                            className="text-muted-foreground text-xs underline"
                        >
                            {link.label}
                        </Link>
                    </span>
                ))}
            </Text>
        )}

        <Text className="text-muted-foreground text-xs leading-5 text-center">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
        </Text>
    </Section>
);

export default LinksFooter;