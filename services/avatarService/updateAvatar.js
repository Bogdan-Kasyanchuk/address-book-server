const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true,
});

const updateAvatar = async (tmpUpload, publicId, folder) => {
  const uploadToCloud = promisify(cloudinary.uploader.upload);
  const { secure_url: secureUrl } = await uploadToCloud(tmpUpload, {
    public_id: publicId,
    folder: folder,
    width: 150,
    height: 150,
    gravity: 'faces',
    crop: 'fill',
  });
  return secureUrl;
};

module.exports = updateAvatar;
