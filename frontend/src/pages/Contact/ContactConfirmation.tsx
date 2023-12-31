import "./Contact.css";

import { Button } from "components/Button";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { FormContainer } from "components/Form/FormContainer";
import { Head } from "components/Head";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Front";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { useContact } from "hooks/useContact";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "stores/hooks";

export const ContactConfirmationPage = () => {
  const { contact } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const { registerContact } = useContact();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contact.name === "" && contact.email === "" && contact.content === "") {
      navigate("/contact");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    await registerContact(contact);
    navigate("/contact/thanks");
  };

  return (
    <>
      <Head title={"お問い合わせ確認"} description={"お問い合わせ確認"} />
      <Sidebar />
      <main>
        <MainVisual image={"contact/mv.jpg"} />
        <Content>
          <div className="contact">
            <SubPageTitle title={"CONTACT"} sub={"お問い合わせ"} />
            <p className="contact-text">
              お気軽にお問い合わせください。お問い合わせ内容の確認後、ご連絡させていただきます。
              <br />
              3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。
            </p>
          </div>
          <SubContent>
            <FormContainer>
              <dl className="form-def">
                <dt>お名前</dt>
                <dd>{contact.name}</dd>
              </dl>
              <dl className="form-def">
                <dt>メールアドレス</dt>
                <dd>{contact.email}</dd>
              </dl>
              <dl className="form-def">
                <dt>内容</dt>
                <dd>{contact.content}</dd>
              </dl>
              <div className="contact-button">
                <p className="contact-button-return">
                  <Button
                    buttonType={"link"}
                    text={"戻る"}
                    link={"/contact/"}
                    handleClick={null}
                  />
                </p>
                <p>
                  <Button
                    buttonType={"button"}
                    text={"送信する"}
                    link={null}
                    handleClick={handleSubmit}
                  />
                </p>
              </div>
            </FormContainer>
          </SubContent>
        </Content>
      </main>
      <Footer />
    </>
  );
};
