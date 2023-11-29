const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: [true, "Film Must Be Unique"],
            minlength: [2, "Film is too short"],
            maxlength: [32, "Film is too long"],
            required: [true, "Film name is required"]
        },
        description: {
            type: String,
            minlength: [20, "Film description is too short"],
            maxlength: [2000, "Film description is too long"],
            required: [true, "Film description is required"]
        },
        slug: {
            type: String,
            lowercase: true,
            required: true
        },
        // chhal tba3 mn mara
        sold: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            trim: true,
            required: [true, "Film price is required"],
            max: [200000, "Film price is too long"]
        },
        priceAfterDiscount: {
            type: Number
        },
        imageCover: {
            type: String,
            required: [true, "Film image Cover is required"]
        },
        image: [String],
        video: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Film must belong to a Category"]
        },
        date: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Date",
            required: [true, "Film must belong to a Date"]
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: [true, "Film must belong to a Section"]
        },
        ratingsAverage: {
            type: Number,
            min: [1, "Rating must be above or equal 1.0"],
            max: [5, "Rating must be above or equal 5.0"],
            default: 1.0,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Film", filmSchema);