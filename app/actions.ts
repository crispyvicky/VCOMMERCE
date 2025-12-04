'use server';

import dbConnect from '@/lib/db';
import Product, { IProduct } from '@/models/Product';
import Order from '@/models/Order';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function getProducts(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    limit?: number;
    isFeatured?: boolean;
    search?: string;
} = {}) {
    await dbConnect();

    const query: any = {};

    if (filters.search) {
        const searchRegex = new RegExp(filters.search, 'i');
        query.$or = [
            { name: searchRegex },
            { description: searchRegex },
            { category: searchRegex },
            { 'colors': searchRegex }
        ];
    }

    if (filters.category && filters.category !== 'All') {
        query.category = filters.category;
    }

    if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = filters.minPrice;
        if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    if (filters.isFeatured) {
        query.isFeatured = true;
    }

    let sortOption: any = { createdAt: -1 }; // Default: Newest
    if (filters.sort === 'price_asc') sortOption = { price: 1 };
    if (filters.sort === 'price_desc') sortOption = { price: -1 };

    let productQuery = Product.find(query).sort(sortOption);

    if (filters.limit) {
        productQuery = productQuery.limit(filters.limit);
    }

    const products = await productQuery.lean();

    // Serialize MongoDB documents to plain objects
    return products.map((product: any) => ({
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        images: product.images,
        sizes: product.sizes,
        colors: product.colors,
        inStock: product.inStock,
        isFeatured: product.isFeatured,
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString(),
    }));
}

export async function getProduct(id: string) {
    await dbConnect();
    const product = await Product.findById(id).lean();

    if (!product) return null;

    return {
        ...product,
        _id: (product as any)._id.toString(),
        createdAt: (product as any).createdAt?.toISOString(),
        updatedAt: (product as any).updatedAt?.toISOString(),
    };
}

export async function createOrder(orderData: any) {
    await dbConnect();

    try {
        const order = await Order.create(orderData);
        return { success: true, orderId: (order as any)._id.toString() };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: 'Failed to create order' };
    }
}

import { revalidatePath } from 'next/cache';

export async function createProduct(productData: any) {
    await dbConnect();

    try {
        const product = await Product.create(productData);

        // Revalidate all product listing pages
        revalidatePath('/');
        revalidatePath('/accessories');
        revalidatePath('/new-arrivals');
        revalidatePath('/admin/products');

        return { success: true, productId: (product as any)._id.toString() };
    } catch (error) {
        console.error('Error creating product:', error);
        return { success: false, error: 'Failed to create product' };
    }
}

export async function getOrders() {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

    return orders.map((order: any) => ({
        _id: order._id.toString(),
        customer: order.customer,
        items: order.items,
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt?.toISOString(),
        updatedAt: order.updatedAt?.toISOString(),
    }));
}

export async function getOrder(id: string) {
    await dbConnect();
    const order = await Order.findById(id).lean();

    if (!order) return null;

    return {
        ...order,
        _id: (order as any)._id.toString(),
        createdAt: (order as any).createdAt?.toISOString(),
        updatedAt: (order as any).updatedAt?.toISOString(),
    };
}

export async function updateOrderStatus(id: string, status: string) {
    await dbConnect();
    try {
        await Order.findByIdAndUpdate(id, { status });
        return { success: true };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}

export async function getCustomers() {
    await dbConnect();

    // Aggregate orders by customer email to create a "Customer" view
    const customers = await Order.aggregate([
        {
            $group: {
                _id: "$customer.email",
                name: { $first: "$customer.name" },
                email: { $first: "$customer.email" },
                totalSpent: { $sum: "$total" },
                orderCount: { $sum: 1 },
                lastOrderDate: { $max: "$createdAt" },
                city: { $first: "$customer.city" },
                country: { $first: "$customer.country" }
            }
        },
        { $sort: { totalSpent: -1 } } // Sort by most valuable customers
    ]);

    return customers.map(c => ({
        ...c,
        lastOrderDate: c.lastOrderDate?.toISOString()
    }));
}

export async function registerUser(userData: any) {
    await dbConnect();

    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return { success: false, error: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.email === process.env.ADMIN_EMAIL ? 'admin' : 'user',
        });

        return { success: true };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: 'Registration failed' };
    }
}

export async function getUserOrders(email: string) {
    await dbConnect();
    const orders = await Order.find({ "customer.email": email }).sort({ createdAt: -1 }).lean();

    return orders.map((order: any) => ({
        _id: order._id.toString(),
        total: order.total,
        status: order.status,
        createdAt: order.createdAt?.toISOString(),
        items: order.items
    }));
}

export async function deleteProduct(productId: string) {
    await dbConnect();
    try {
        await Product.findByIdAndDelete(productId);
        revalidatePath('/');
        revalidatePath('/accessories');
        revalidatePath('/new-arrivals');
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: 'Failed to delete product' };
    }
}

export async function updateProduct(productId: string, productData: any) {
    await dbConnect();
    try {
        await Product.findByIdAndUpdate(productId, productData);
        revalidatePath('/');
        revalidatePath('/accessories');
        revalidatePath('/new-arrivals');
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error: 'Failed to update product' };
    }
}

import Review from '@/models/Review';

export async function addReview(productId: string, rating: number, comment: string, userEmail: string) {
    await dbConnect();

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) return { success: false, error: 'User not found' };

        await Review.create({
            user: user._id,
            product: productId,
            rating,
            comment,
        });

        revalidatePath(`/product/${productId}`);
        return { success: true };
    } catch (error: any) {
        if (error.code === 11000) {
            return { success: false, error: 'You have already reviewed this product' };
        }
        console.error('Error adding review:', error);
        return { success: false, error: 'Failed to add review' };
    }
}

export async function getProductReviews(productId: string) {
    await dbConnect();
    const reviews = await Review.find({ product: productId })
        .populate('user', 'name')
        .sort({ createdAt: -1 })
        .lean();

    return reviews.map((review: any) => ({
        _id: review._id.toString(),
        user: review.user?.name || 'Anonymous',
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt?.toISOString(),
    }));
}

export async function toggleWishlist(productId: string, userEmail: string) {
    await dbConnect();
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) return { success: false, error: 'User not found' };

        const index = user.wishlist.indexOf(productId);
        if (index === -1) {
            user.wishlist.push(productId);
        } else {
            user.wishlist.splice(index, 1);
        }

        await user.save();
        revalidatePath('/wishlist');
        revalidatePath(`/product/${productId}`);
        return { success: true, isInWishlist: index === -1 };
    } catch (error) {
        console.error('Error toggling wishlist:', error);
        return { success: false, error: 'Failed to update wishlist' };
    }
}

export async function getWishlist(userEmail: string) {
    await dbConnect();
    const user = await User.findOne({ email: userEmail }).populate('wishlist').lean();
    if (!user) return [];

    return user.wishlist.map((product: any) => ({
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        images: product.images,
        category: product.category,
        inStock: product.inStock,
    }));
}

export async function getRelatedProducts(productId: string, category: string) {
    await dbConnect();
    const products = await Product.find({
        category,
        _id: { $ne: productId }
    })
        .limit(4)
        .lean();

    return products.map((product: any) => ({
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        images: product.images,
        sizes: product.sizes,
        colors: product.colors,
        inStock: product.inStock,
        isFeatured: product.isFeatured,
    }));
}

import Coupon from '@/models/Coupon';

export async function createCoupon(couponData: any) {
    await dbConnect();
    try {
        await Coupon.create(couponData);
        revalidatePath('/admin/coupons');
        return { success: true };
    } catch (error) {
        console.error('Error creating coupon:', error);
        return { success: false, error: 'Failed to create coupon' };
    }
}

export async function getCoupons() {
    await dbConnect();
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).lean();
    return coupons.map((coupon: any) => ({
        _id: coupon._id.toString(),
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value,
        expiryDate: coupon.expiryDate?.toISOString(),
        usageLimit: coupon.usageLimit,
        usedCount: coupon.usedCount,
        isActive: coupon.isActive,
    }));
}

export async function deleteCoupon(id: string) {
    await dbConnect();
    try {
        await Coupon.findByIdAndDelete(id);
        revalidatePath('/admin/coupons');
        return { success: true };
    } catch (error) {
        console.error('Error deleting coupon:', error);
        return { success: false, error: 'Failed to delete coupon' };
    }
}

export async function validateCoupon(code: string) {
    await dbConnect();
    try {
        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

        if (!coupon) {
            return { success: false, error: 'Invalid coupon code' };
        }

        if (new Date() > new Date(coupon.expiryDate)) {
            return { success: false, error: 'Coupon has expired' };
        }

        if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
            return { success: false, error: 'Coupon usage limit reached' };
        }

        return {
            success: true,
            coupon: {
                code: coupon.code,
                discountType: coupon.discountType,
                value: coupon.value,
            }
        };
    } catch (error) {
        console.error('Error validating coupon:', error);
        return { success: false, error: 'Failed to validate coupon' };
    }
}
