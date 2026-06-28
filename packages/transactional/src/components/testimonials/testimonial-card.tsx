import { Img, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface TestimonialCardProps {
    previewText: string;
    quote: string;
    authorName: string;
    authorTitle?: string;
    authorImageUrl?: string;
}

export const TestimonialCard = ({
    previewText,
    quote,
    authorName,
    authorTitle,
    authorImageUrl,
}: TestimonialCardProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 py-6">
            <Section className="bg-background border border-border rounded-lg p-8 text-center">
                <Text className="text-primary text-xl font-heading italic leading-relaxed m-0 mb-6">
                    &ldquo;{quote}&rdquo;
                </Text>

                {authorImageUrl ? (
                    <table
                        style={{
                            margin: "0 auto",
                            textAlign: "left",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tbody>
                            <tr>
                                <td style={{ paddingRight: "12px", verticalAlign: "middle" }}>
                                    <Img
                                        src={authorImageUrl}
                                        alt={authorName}
                                        width={40}
                                        height={40}
                                        style={{ borderRadius: "50%" }}
                                        className="block"
                                    />
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                    <Text className="text-foreground text-sm font-sans font-bold m-0">
                                        {authorName}
                                    </Text>
                                    {authorTitle && (
                                        <Text className="text-muted-foreground text-xs font-sans m-0 mt-1">
                                            {authorTitle}
                                        </Text>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <Section className="text-center">
                        <Text className="text-foreground text-sm font-sans font-bold m-0">
                            {authorName}
                        </Text>
                        {authorTitle && (
                            <Text className="text-muted-foreground text-xs font-sans m-0 mt-1">
                                {authorTitle}
                            </Text>
                        )}
                    </Section>
                )}
            </Section>
        </Section>
    </Layout>
);

export default TestimonialCard;
