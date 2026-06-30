// To connect to MongoDB y execute Express.server
require("dotenv").config();

// Test will be realized not openning server
const app = require("./app");
const connectDB = require("./config/db.config");

const PORT = process.env.PORT || 5005;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})