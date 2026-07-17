import multer from "multer";

const storage = multer.memoryStorage();

// Helper function to validate PDF by magic bytes
const isPdfBuffer = (buffer) => {
  // PDF files start with %PDF magic bytes
  return (
    buffer && buffer.length > 4 && buffer.toString("utf8", 0, 4) === "%PDF"
  );
};

// Configure multer with proper limits and file validation
export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    const allowedMimes = ["application/pdf"];

    console.log(`📎 File filter check for: ${file.originalname}`);
    console.log(`   MIME type: ${file.mimetype}`);
    console.log(`   File size: ${file.size} bytes`);

    const fileName = file.originalname.toLowerCase();
    const hasValidExtension = fileName.endsWith(".pdf");

    if (!hasValidExtension) {
      console.error(
        `❌ Invalid file extension. Expected .pdf, got: ${file.originalname}`,
      );
      return cb(
        new Error(
          `Invalid file extension. Only PDF files are allowed. Got: ${fileName}`,
        ),
      );
    }

    if (!allowedMimes.includes(file.mimetype)) {
      console.error(`❌ Invalid MIME type: ${file.mimetype}`);
      return cb(
        new Error(
          `Invalid file type. Only application/pdf MIME type is allowed. Got: ${file.mimetype}`,
        ),
      );
    }

    console.log(`✅ File passed validation`);
    cb(null, true);
  },
});
