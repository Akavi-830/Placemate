import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (
  fileBuffer,
  folderName,
  resourceType = "auto",
  publicId = null,
) => {
  return new Promise((resolve, reject) => {
    // Validate inputs
    if (!fileBuffer) {
      const error = "File buffer is missing or null";
      console.error("❌", error);
      return reject(new Error(error));
    }

    if (fileBuffer.length === 0) {
      const error = "File buffer is empty";
      console.error("❌", error);
      return reject(new Error(error));
    }

    // Verify Cloudinary config
    if (!cloudinary.config().cloud_name) {
      const error = "Cloudinary cloud_name is not configured";
      console.error("❌", error);
      return reject(new Error(error));
    }

    if (!cloudinary.config().api_key) {
      const error = "Cloudinary api_key is not configured";
      console.error("❌", error);
      return reject(new Error(error));
    }

    console.log("🚀 Starting Cloudinary upload...");
    console.log("📤 Upload config:", {
      folder: folderName,
      resourceType,
      bufferSize: fileBuffer.length,
      cloudName: cloudinary.config().cloud_name,
    });

    const options = {
      folder: folderName,
      resource_type: resourceType,
      type: "upload",
      access_mode: "public",
    };

    if (publicId) {
      // For raw resources with custom public_id, use it as-is
      // For other resource types, remove extension from public_id
      if (resourceType === "raw") {
        options.public_id = publicId;
      } else {
        // Remove extension for non-raw types
        options.public_id = publicId.includes(".")
          ? publicId.split(".").slice(0, -1).join(".")
          : publicId;
      }
    } else {
      // Only use these options if we don't have a custom public_id
      options.use_filename = true;
      options.unique_filename = true;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary upload error:", {
            message: error.message,
            status: error.status,
            http_code: error.http_code,
            fullError: error,
          });
          return reject(
            new Error(`Cloudinary upload failed: ${error.message}`),
          );
        }

        console.log("✅ Cloudinary Upload Success:", {
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          size: result.bytes,
          resourceType: result.resource_type,
          mimeType: result.mime_type,
          type: result.type,
        });

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    // Handle stream errors
    uploadStream.on("error", (error) => {
      console.error("❌ Upload stream error:", {
        message: error.message,
        code: error.code,
        fullError: error,
      });
      reject(new Error(`Upload stream failed: ${error.message}`));
    });

    uploadStream.on("close", () => {
      console.log("📤 Upload stream closed");
    });

    console.log("📝 Writing buffer to upload stream...");
    uploadStream.end(fileBuffer);
  });
};
