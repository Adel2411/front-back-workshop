import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import memberRoutes from "./routes/members";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/members", memberRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// http://localhost:4000/api/members/
