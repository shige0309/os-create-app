import { Sidebar } from "components/Sidebar/Front";
import { MainVisual } from "components/MainVisual";
import { Content } from "components/Content";
import { SubPageTitle } from "components/SubPageTitle";
import { SubContent } from "components/SubContent";
import { FormContainer } from "components/Form/FormContainer";
import { Button } from "components/Button"
import { Footer } from "components/Footer";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { useForm } from "react-hook-form";
import { InputFormType } from "Type";
import { setContact } from "stores/slice/contactSlice";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

export const ContactFormPage = () => {
  const { contact } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm<InputFormType>({
    defaultValues: {
      name: contact.name,
      email: contact.email,
      content: contact.content,
    }
  });

  const onSubmit = handleSubmit((data: InputFormType) => {
    dispatch(setContact(data));
    navigate("/contact/confirmation");
  });

  return (
    <>
      <Sidebar />
      <main>
          <MainVisual image={"contact/mv.jpg"}/>
          <Content>
              <div className="contact">
                  <SubPageTitle title={"CONTACT"} sub={"お問い合わせ"}/>
                  <p className="contact-text">お気軽にお問い合わせください。お問い合わせ内容の確認後、ご連絡させていただきます。<br />
                  3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。</p>
              </div>
              <SubContent>
                <FormContainer>
                  <form onSubmit={onSubmit}>
                    <dl className="form-def">
                      <dt>お名前</dt>
                      <dd>
                        <input type="text" {...register("name", {required: "※入力が必須の項目です"})} required/>
                        {errors.name?.message && <p className="form-attention">{errors.name.message}</p>}
                      </dd>
                    </dl>
                    <dl className="form-def">
                      <dt>メールアドレス</dt>
                      <dd>
                        <input type="email" {...register("email", {required: "※入力が必須の項目です"})} required/>
                        {errors.name?.message && <p className="form-attention">{errors.email?.message}</p>}
                      </dd>
                    </dl>
                    <dl className="form-def">
                      <dt>内容</dt>
                      <dd>
                        <textarea {...register("content", {required: "※入力が必須の項目です"})}></textarea>
                        {errors.content?.message && <p className="form-attention">{errors.content?.message}</p>}
                      </dd>
                    </dl>
                    <div className="contact-button">
                      <Button buttonType={"button"} text={"確認画面へ"} link={null} handleClick={null}/>
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
