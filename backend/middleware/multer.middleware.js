import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure temp directory exists
const tempDir = "./temp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log("Created temp directory at:", path.resolve(tempDir));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Preserve the original file extension
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}-${file.fieldname}${ext}`);
  },
});

const multerUpload = multer({ storage: storage });

export default multerUpload;
