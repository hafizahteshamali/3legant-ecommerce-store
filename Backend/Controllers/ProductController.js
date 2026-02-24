import slugify from "slugify";
import productModel from "../Database/Models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProductController = async (req, res) => {
    try {
        const file = req.files;
        const { name, description, price, discountedPrice, category, stock, isFeatured, tags, status, ratings } = req.body;
        const slug = slugify(name, { lower: true })

        const images = req.files?.images?.map((img) => ({
            url: img.path,
            public_id: img.filename
        })) || [];

        const product = await productModel.create({
            name,
            slug: slug,
            price,
            description,
            discountedPrice,
            category,
            stock,
            ratings: ratings,
            images: images,
            isFeatured: isFeatured || false,
            tags: tags ? tags.split(",") : [],
            status: status || "active"
        })

        return res.status(200).send({ success: true, message: "product add successfully", product });

    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
}

const getAllProductController = async (_, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).send({success: true, products});
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
}

const filterProductController = async (req, res) => {
    try {
      const { category, sort, page = 1, limit=10, isFeatured } = req.query;
  
      // 🔹 Filter Object
      let filter = {};

      if (category == "All") {
        filter.category = category;
      }
  
      if (category) {
        filter.category = category;
      }

      if (isFeatured) {
        filter.isFeatured = isFeatured;
      }

      const skip = ((page - 1) * limit);

      let sortOption = {};
  
      if (sort === "price_asc") {
        sortOption.price = 1;   // Low to High
      }
  
      if (sort === "price_desc") {
        sortOption.price = -1;  // High to Low
      }
  
      const products = await productModel.find(filter).sort(sortOption).skip(skip).limit(Number(limit));

      const total = await productModel.countDocuments(filter);
  
      res.status(200).send({
        success: true,
        total: total,
        page: page, 
        pages: Math.ceil(total / limit),
        products
      });
  
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message
      });
    }
};

const searchProductController = async (req, res) => {
    try {
        const { search } = req.query;
        const product = await productModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } },
            ]
        });
        if (product.length < 0) {
            return res.status(404).send({ success: false, message: "product not found" });
        }
        return res.status(200).send({ success: true, product })
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
}

const getSingleProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send({ success: false, message: "product not found!" });
        }
        return res.status(201).send({ success: true, product });
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
}

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send({ success: false, message: "product not found!" });
        }
        if (product.images && product.images.length > 0) {
            for (let img of product.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }
        await product.deleteOne();
        return res.status(201).send({ success: true, message: "product delete successfully", product })
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
}

const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, discountedPrice, category, stock, isFeatured, tags, status, ratings } = req.body;
        const slug = slugify(name, { lower: true });
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send({ success: false, message: "product not found!" });
        }
        if (product.images && product.images.length > 0) {
            for (let img of product.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }
        const newImages = req.files.images.map((img) => (
            {
                url: img.path,
                public_id: img.filename
            }
        ))

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountedPrice = discountedPrice || product.discountedPrice;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.images = newImages || product.images;
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.tags = tags ? tags.split(",") : product.tags;
        product.status = status || product.status;

        await product.save();
        return res.status(200).send({ success: true, message: "product updated successfully", product });

    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
}

export { addProductController, filterProductController, searchProductController, getAllProductController, getSingleProductController, deleteProductController, updateProductController };
