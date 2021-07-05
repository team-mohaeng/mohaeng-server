"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
const app = express_1.default();
const db_1 = __importDefault(require("./loader/db"));
// Connect Database
db_1.default();
app.use(express_1.default.json());
// app.use("/api/message", require("./controller/messageController"));
app.use("/api/writeSmallSatisfaction", require("./api/writeSmallSatisfaction"));
=======
const db_1 = __importDefault(require("./loader/db"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const apidocPath = path_1.default.join(__dirname, "../apidoc");
// Connect Database
db_1.default();
app.use(express_1.default.json());
app.use("/apidoc", express_1.default.static(apidocPath));
app.use("/api/signup", require("./api/auth"));
app.use("/api/signin", require("./api/user"));
app.use("/api/home", require("./api/home"));
// app.use("/api/message", require("./controller/messageController"));
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
    // render the error page
    res.status(err.status || 500);
<<<<<<< HEAD
=======
    res.json({
        message: err.message,
        error: err
    });
>>>>>>> ad7adf7d97810049385634942338c20103a7ee17
    res.render("error");
});
app
    .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
})
    .on("error", (err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map