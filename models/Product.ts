import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        images: { type: [String], required: true },
        sizes: { type: [String], default: [] },
        colors: { type: [String], default: [] },
        inStock: { type: Boolean, default: true },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Prevent overwriting the model if it's already compiled
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
