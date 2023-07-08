import { InputFormType } from "Type";
import axios from "axios";

export const useContact = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const registerContact = async (inputForm: InputFormType) => {
    try {
      await axios.post(REACT_APP_BACKEND_URL + "/email/send", inputForm);
    } catch (error) {
      alert(`登録に失敗しました。${error}`);
    }
  };

  return { registerContact };
};
