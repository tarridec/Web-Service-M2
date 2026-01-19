import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: String,
        ean: String,
        description: String,
        specs: String,
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const ProductModel = mongoose.model("Product", ProductSchema);

ProductSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        const { _id, createdAt, updatedAt, ...rest } = ret;

        return {
            id: _id.toString(),
            ...rest,
        };
    },
});