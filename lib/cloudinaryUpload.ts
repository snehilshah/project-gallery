type Props = {
  formData: FormData;
  fileType: string;
};

export const upload = async ({ formData, fileType }: Props) => {
  const file = formData.get('file') as File;
  formData.append(
    'upload_preset',
    `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
  );

  if (!file) {
    throw new Error('File not found in FormData');
  }

  const contentType = fileType;

  let cloudinaryUplaodUrl = '';

  if (contentType && contentType.startsWith('image')) {
    cloudinaryUplaodUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  } else if (contentType && contentType.startsWith('video')) {
    cloudinaryUplaodUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`;
  } else {
    throw new Error('Unsupported file type');
  }

  try {
    const resposne = await fetch(cloudinaryUplaodUrl, {
      method: 'POST',
      body: formData,
    });
    const imageData = await resposne.json();
    return imageData.secure_url;
  } catch (error) {
    throw error;
  }
};
