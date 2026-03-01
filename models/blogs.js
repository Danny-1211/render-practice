const mongoose = require('mongoose');

// 定義 blog 這張表的 type以及內容
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'blogs' // 指定 collection 的名稱為 blogs, 小寫複數命名, 連接到 node_tuts 這個 document 裡的 blogs collection
});

// 這裡的 Blog 是一個  Model ,名稱用大寫單數，裡面有很多方法可以使用，例如 save()、find()、findById() 等等，這些方法都是 mongoose 提供的，可以用來操作資料庫中的資料。
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;