import Link from 'next/link';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { getProducts } from '@/app/actions';
import Image from 'next/image';

export default async function ProductsPage() {
    const products = await getProducts({ limit: 50 });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground text-sm">Manage your product catalog.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors w-full sm:w-auto"
                >
                    <Plus size={18} />
                    Add Product
                </Link>
            </div>

            {/* Search Bar (Placeholder for now) */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                />
            </div>

            {/* Products Table - Mobile Optimized with Scroll */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 whitespace-nowrap">Product</th>
                                <th className="px-6 py-3 whitespace-nowrap">Category</th>
                                <th className="px-6 py-3 whitespace-nowrap">Price</th>
                                <th className="px-6 py-3 whitespace-nowrap">Stock</th>
                                <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                                                {product.images && product.images[0] && (
                                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.images[0]})` }} />
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900 whitespace-nowrap sm:whitespace-normal line-clamp-1 sm:line-clamp-2 max-w-[150px] sm:max-w-xs">
                                                {product.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1 text-gray-400 hover:text-[var(--primary)] transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        No products found. Add your first product!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
