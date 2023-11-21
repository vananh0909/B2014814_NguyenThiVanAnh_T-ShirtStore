const app = require("./app");
const {config, connectDB} = require("./app/config");

const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`🧘🏻‍♀️Server is running on port ${PORT}🥹`);
});
connectDB();
