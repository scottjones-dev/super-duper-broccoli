import { Button, Column, Img, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface ProductGrid2Item {
    title: string;
    price: string;
    imageUrl: string;
    imageAlt: string;
    href: string;
}

export interface ProductGrid2Props {
    previewText: string;
    title: string;
    description?: string;
    items: ProductGrid2Item[];
    buttonLabel: string;
}

export const ProductGrid2 = ({
    previewText,
    title,
    description,
    items,
    buttonLabel,
}: ProductGrid2Props) => {
    const chunkedRows: ProductGrid2Item[][] = [];
    for (let i = 0; i < items.length; i += 2) {
        chunkedRows.push(items.slice(i, i + 2));
    }

    return (
        <Layout preview={previewText}>
            <Section className="px-12 pt-6 pb-2">
                <Text className="text-foreground text-2xl font-heading font-bold mb-2 leading-tight text-center">
                    {title}
                </Text>
                {description && (
                    <Text className="text-muted-foreground text-sm font-sans text-center mb-4 leading-relaxed">
                        {description}
                    </Text>
                )}
            </Section>

            {chunkedRows.map((row, rowIndex) => (
                <Section key={rowIndex} className="px-12 py-2">
                    <Row>
                        {row.map((item, itemIndex) => (
                            <Column
                                key={itemIndex}
                                style={{
                                    width: "50%",
                                    verticalAlign: "top",
                                    paddingLeft: itemIndex === 0 ? "0px" : "12px",
                                    paddingRight: itemIndex === 0 ? "12px" : "0px",
                                }}
                            >
                                <Img
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    className="w-full rounded-md h-auto block mb-3"
                                />
                                <Text className="text-foreground text-base font-heading font-bold mb-1 leading-tight">
                                    {item.title}
                                </Text>
                                <Text className="text-primary text-sm font-sans font-bold mb-3">
                                    {item.price}
                                </Text>
                                <Button
                                    className="bg-background text-primary border border-border font-sans font-bold text-xs px-4 py-2 rounded-md no-underline text-center block"
                                    href={item.href}
                                >
                                    {buttonLabel}
                                </Button>
                            </Column>
                        ))}
                        {row.length === 1 && (
                            <Column style={{ width: "50%" }} />
                        )}
                    </Row>
                </Section>
            ))}
        </Layout>
    );
};

export default ProductGrid2;
