import { InputFormType } from "Type"
import axios from "axios"

export const useContact = () => {

    const registerContact = async (inputForm: InputFormType) => {
        try {
            await axios.post("/email/send", inputForm);
        } catch (error) {
            alert(`登録に失敗しました。${error}`);
        }
    }

    return { registerContact }
}
