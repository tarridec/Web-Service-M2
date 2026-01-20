export interface Product {
    id: string,
    title: string,
    category?: string | null,
    ean?: string | null,
    description?: string | null,
    specs?: string | null,
    price: number,
}