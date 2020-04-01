const app = require("express")();
const PORT = process.env.PORT || 4000;

app.use(require("./middlewares"));
app.use(require("./routes"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
