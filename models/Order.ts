import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
    customer: {
        name: string;
        email: string;
        address: string;
        city: string;
        zip: string;
        country: string;
    };
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        size?: string;
        color?: string;
    }[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        customer: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true },
        },
        items: [
            {
                productId: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                size: String,
                color: String,
            },
        ],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        paymentMethod: { type: String, required: true },
    },
    { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
