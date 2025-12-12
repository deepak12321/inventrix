import app from "./app.js";
import connectDB from "../db/index.db.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      try {
        console.log(
          `Server Connected Sucessfully :- http://localhost:${PORT}/`
        );
      } catch (error) {
        console.log("Failed to connect to the server");
      }
    });
  })
  .catch((error) => {
    console.log("Failed to connect to Database. ERROR:-", error);
  });
