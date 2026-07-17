import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const generateHash = async () => {
  const hash = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD, 10);

  console.log(hash);
};

generateHash();
