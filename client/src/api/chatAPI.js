import axios from "axios";

export const chatAPI = async (inputPrompt) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_CHATBOT_URL,
      {
        prompt: inputPrompt,
      }
    );
    return res
  } catch (err) {
    throw err;
  }
};