import { MetadataRoute } from 'next';
import { getProducts } from '@/app/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getProducts({});

    const productEntries = products.map((product: any) => ({
        url: `https://vasthra.com/product/${product._id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    return [
        {
            url: 'https://vasthra.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://vasthra.com/search',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        ...productEntries,
    ];
}
