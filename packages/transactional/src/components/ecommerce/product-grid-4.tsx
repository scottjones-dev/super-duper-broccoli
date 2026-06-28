import { Column, Img, Link, Row, Section, Text } from "react-email";
import { Layout } from "../layout";

export interface ProductGrid4Item {
    title: string;
    price: string;
    imageUrl: string;
    imageAlt: string;
    href: string;
}

export interface ProductGrid4Props {
    previewText: string;
    title: string;
    description?: string;
    items: ProductGrid4Item[];
}

export const ProductGrid4 = ({
    previewText,
    title,
    description,
    items,
}: ProductGrid4Props) => {
    const chunkedRows: ProductGrid4Item[][] = [];
    for (let i = 0; i < items.length; i += 4) {
        chunkedRows.push(items.slice(i, i + 4));
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
                                    width: "25%",
                                    verticalAlign: "top",
                                    paddingLeft: itemIndex === 0 ? "0px" : "6px",
                                    paddingRight: itemIndex === row.length - 1 ? "0px" : "6px",
                                }}
                            >
                                <Link href={item.href} className="no-underline">
                                    <Img
                                        src={item.imageUrl}
                                        alt={item.imageAlt}
                                        className="w-full rounded-md h-auto block mb-2"
                                    />
                                    <Text className="text-foreground text-xs font-heading font-bold mb-1 leading-tight block">
                                        {item.title}
                                    </Text>
                                    <Text className="text-primary text-xs font-sans font-bold block">
                                        {item.price}
                                    </Text>
                                </Link>
                            </Column>
                        ))}
                        {/* Fill the remaining columns with empty Columns if the last row is partial */}
                        {row.length < 4 &&
                            Array.from({ length: 4 - row.length }).map((_, i) => (
                                <Column key={`empty-${i}`} style={{ width: "25%" }} />
                            ))}
                    </Row>
                </Section>
            ))}
        </Layout>
    );
};

export default ProductGrid4;
