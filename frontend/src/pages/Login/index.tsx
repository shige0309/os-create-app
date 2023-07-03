import { FormContainer } from "components/Form/FormContainer";
import { MainVisual } from "components/MainVisual";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { Button } from "components/Button"
import { Footer } from "./Components/Footer";
import { useState } from "react";
import { Link} from "react-router-dom";
import { useAdmin } from "hooks/useAdmin";
import { AdminType } from "Type";
import { Head } from "components/Head";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const { login } = useAdmin();

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
      const admin: AdminType = {
        email: email,
        password: password
      }
      login(admin);
    } catch (error) {
      alert(error);
    }

  }

  return (
    <>
      <Head title={"LOGIN"} description={"LOGIN"}/>
      <main>
        <div className="login">
          <MainVisual image={"top-main.jpg"}/>
          <div className="login-wrap">
            <p className="login-logo"><img src="/logo-white.svg" alt="ロゴ" /></p>
            <div className="login-title">
              <SubPageTitle title={"LOGIN"} sub={"管理者ログイン"}/>
            </div>
            <SubContent>
              <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <dl className="form-def">
                    <dt>メールアドレス</dt>
                    <dd>
                      <input type="email" onChange={(e) => checkEmailInput(e)}/>
                      {emailCheck && <p className="form-attention">{emailCheck}</p>}
                    </dd>
                  </dl>
                  <dl className="form-def">
                    <dt>パスワード</dt>
                    <dd>
                      <input type="password" onChange={(e) => checkPasswordInput(e)}/>
                      {passwordCheck && <p className="form-attention">{passwordCheck}</p>}
                    </dd>
                  </dl>
                  <div className="contact-button">
                    <Button buttonType={"button"} text={"ログイン"} link={null} handleClick={null}/>
                  </div>
                </form>
                <p className="login-topLink">
                  <Link to="/">ホームへ戻る</Link>
                </p>
              </FormContainer>
            </SubContent>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}
