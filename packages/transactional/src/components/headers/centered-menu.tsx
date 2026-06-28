import { Column, Img, Link, Row, Section } from "react-email";

export interface CenteredMenuHeaderLink {
    label: string;
    href: string;
}

export interface CenteredMenuHeaderProps {
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    links: CenteredMenuHeaderLink[];
}

export const CenteredMenuHeader = ({ logoUrl, logoAlt, logoWidth = 120, logoHeight = 40, links, }: CenteredMenuHeaderProps) => (
    <Section className="px-12 pt-8 pb-6">
        <Row>
            <Column align="center">
                <Img
                    src={logoUrl}
                    alt={logoAlt}
                    width={logoWidth}
                    height={logoHeight}
                />
            </Column>
        </Row>

        {links.length > 0 && (
            <Row className="pt-6">
                <Column align="center">
                    <table>
                        <tbody>
                            <tr>
                                {links.map((link) => (
                                    <td
                                        key={`${link.label}-${link.href}`}
                                        className="px-3"
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground text-sm no-underline"
                                        >
                                            {link.label}
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </Column>
            </Row>
        )}
    </Section>
);

export default CenteredMenuHeader;