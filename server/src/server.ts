import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });


 