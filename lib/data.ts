import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

export async function getDashboardStats() {
    await dbConnect();

    // 1. Total Revenue & Orders (Aggregation)
    const revenueStats = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" },
                totalOrders: { $sum: 1 }
            }
        }
    ]);

    const totalRevenue = revenueStats[0]?.totalRevenue || 0;
    const totalOrders = revenueStats[0]?.totalOrders || 0;

    // 2. Total Customers (Distinct Emails)
    const uniqueCustomers = (await Order.distinct('customer.email')).length;

    // 3. Low Stock Products
    const lowStockCount = await Product.countDocuments({ inStock: true });

    // 4. Recent Orders
    const recentOrders = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .then(orders => orders.map((order: any) => ({
            id: order._id.toString(),
            customer: order.customer.name,
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
            total: `$${order.total.toFixed(2)}`,
            status: order.status
        })));

    // 5. Monthly Sales (Last 6 Months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    const monthlySales = await Order.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: { $month: "$createdAt" },
                revenue: { $sum: "$total" },
                orders: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    // Map month numbers to names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = {
        labels: monthlySales.map(m => monthNames[m._id - 1]),
        revenue: monthlySales.map(m => m.revenue),
        orders: monthlySales.map(m => m.orders)
    };

    return {
        metrics: {
            revenue: totalRevenue,
            orders: totalOrders,
            customers: uniqueCustomers,
            lowStock: lowStockCount
        },
        recentOrders,
        chartData
    };
}
