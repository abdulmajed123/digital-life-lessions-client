import axios from "axios";

export const imageUpload = async (profileImage) => {
  const formData = new FormData();
  formData.append("image", profileImage);
  const image_Api_URL = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_image_host_key
  }`;
  const { data } = await axios.post(image_Api_URL, formData);
  return data?.data?.display_url;
};
