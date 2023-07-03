import { Content } from "components/Content"
import { Footer } from "components/Footer"
import { MainVisual } from "components/MainVisual"
import { Sidebar } from "components/Sidebar/Admin"
import { SubContent } from "components/SubContent"
import { SubPageTitle } from "components/SubPageTitle"
import { Button } from "components/Button"
import { FormContainer } from "components/Form/FormContainer"
import { useCallback, useEffect, useState } from "react"
import { useAdmin } from "hooks/useAdmin"
import { AxiosResponse } from "axios"
import { AdminType } from "Type"
import { Alert } from "components/Alert"
import "./AdminUpdate.css"
import { Head } from "components/Head"

export const AdminUpdate = () => {
  const {getRegisterAdmin, updateAdmin} = useAdmin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    const getAdmin = async () => {
        const response: AxiosResponse<any> = await getRegisterAdmin();
        setEmail(response.data.email);
    }

    getAdmin();
  }, []);

  const checkEmailInput = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setEmail(e.target.value);
    setEmailCheck("");
  }

  const checkPasswordInput = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setPassword(e.target.value);
    setPasswordCheck("");
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(email === "") {
      setEmailCheck("メールアドレスは必須です。");
    }

    if(password === "") {
      setPasswordCheck("パスワードは必須です。");
    } else if(password.length <= 6 && password.length <= 20) {
      setPasswordCheck("6文字以上20文字以内でご入力ください。");
    }

    if(emailCheck !== "" || passwordCheck !== "") {
      return false;
    }

    try {
      const updateData: AdminType = {
        email: email,
        password: password
      }

      const response: AxiosResponse<any> = await updateAdmin(updateData);
      if(response.data.email) {
        setEmail(response.data.email);
      }

      setIsAlertVisible(true);

    } catch (error) {
      alert(`エラーが発生しました${error}`);
    }

  }

  const changeAlertVisible = useCallback(() => {
    setIsAlertVisible((prevState) => !prevState);
  }, []);

  return (
    <>
      <Head title={"管理者情報更新"} description={"管理者情報更新"}/>
      <Sidebar />
      <main>
          <MainVisual image={"contact/mv.jpg"}/>
          <Content>
              <div className="c-admin-register">
                  <SubPageTitle title={"管理者更新"} sub={""}/>
              </div>
              <SubContent>
                {isAlertVisible &&
                  <Alert changeAlertVisible={changeAlertVisible}  text={"管理者を更新しました。"}/>
                }
                <FormContainer>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <dl className="form-def">
                      <dt>メールアドレス</dt>
                      <dd>
                        <input type="email" value={email} onChange={(e) => checkEmailInput(e)}/>
                        {emailCheck && <p className="form-attention">{emailCheck}</p>}
                      </dd>
                    </dl>
                    <dl className="form-def">
                      <dt>新しいパスワード</dt>
                      <dd>
                        <input type="password" onChange={(e) => checkPasswordInput(e)}/>
                        {passwordCheck && <p className="form-attention">{passwordCheck}</p>}
                      </dd>
                    </dl>
                    <div className="contact-button">
                      <Button buttonType={"button"} text={"登録する"} link={""} handleClick={null}/>
                    </div>
                  </form>
                </FormContainer>
              </SubContent>
          </Content>
      </main>
      <Footer />
    </>
  )
}
