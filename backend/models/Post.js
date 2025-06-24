import { DataTypes } from "sequelize";
import db from "../db/db.js";

const Post = db.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 30], // length between 3 and 30 characters
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // postDate: {
    //   type: DataTypes.DATEONLY,
    // },
  },

  {
    tableName: "posts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Post;
