const { expressjwt } = require("express-jwt");

const isAuthenticated = expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
});

module.exports = isAuthenticated;
