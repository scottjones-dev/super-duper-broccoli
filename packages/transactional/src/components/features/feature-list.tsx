import { Column, Hr, Img, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface FeatureListItem {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
}

export interface FeatureListProps {
    previewText: string;
    title: string;
    description?: string;
    items: FeatureListItem[];
}

export const FeatureList = ({
    previewText,
    title,
    description,
    items,
}: FeatureListProps) => (
    <Layout preview={previewText}>
        <Section className="px-12 pt-6 pb-2">
            <Text className="text-foreground text-2xl font-heading font-bold mb-2 leading-tight">
                {title}
            </Text>
            {description && (
                <Text className="text-muted-foreground text-sm font-sans mb-4 leading-relaxed">
                    {description}
                </Text>
            )}
            <Hr className="border-border my-2" />
        </Section>

        {items.map((item, index) => (
            <Section key={index}>
                <Section className="px-12 py-3">
                    <Row>
                        {item.imageUrl ? (
                            <>
                                <Column
                                    style={{
                                        width: "15%",
                                        verticalAlign: "top",
                                        paddingRight: "12px",
                                    }}
                                >
                                    <Img
                                        src={item.imageUrl}
                                        alt={item.imageAlt || ""}
                                        width={40}
                                        height={40}
                                        className="block"
                                    />
                                </Column>
                                <Column style={{ width: "85%", verticalAlign: "top" }}>
                                    <Text className="text-foreground text-base font-heading font-bold m-0 mb-1 leading-tight">
                                        {item.title}
                                    </Text>
                                    <Text className="text-muted-foreground text-xs font-sans m-0 leading-relaxed">
                                        {item.description}
                                    </Text>
                                </Column>
                            </>
                        ) : (
                            <Column style={{ width: "100%", verticalAlign: "top" }}>
                                <Text className="text-foreground text-base font-heading font-bold m-0 mb-1 leading-tight">
                                    {item.title}
                                </Text>
                                <Text className="text-muted-foreground text-xs font-sans m-0 leading-relaxed">
                                    {item.description}
                                </Text>
                            </Column>
                        )}
                    </Row>
                </Section>
                {index < items.length - 1 && (
                    <Section className="px-12">
                        <Hr className="border-border my-1" />
                    </Section>
                )}
            </Section>
        ))}
    </Layout>
);

export default FeatureList;
