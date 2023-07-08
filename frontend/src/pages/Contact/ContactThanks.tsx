import { Button } from "components/Button";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { FormContainer } from "components/Form/FormContainer";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Front";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "stores/slice/contactSlice";
import { Head } from "components/Head";

export const ContactThanksPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteContact());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head
        title={"お問い合わせサンクス"}
        description={"お問い合わせサンクス"}
      />
      <Sidebar />
      <main>
        <MainVisual image={"contact/mv.jpg"} />
        <Content>
          <div className="contact contact-thanks">
            <SubPageTitle title={"CONTACT"} sub={"お問い合わせ"} />
            <p className="contact-text">
              お気軽にお問い合わせください。お問い合わせ内容の確認後、ご連絡させていただきます。
              <br />
              3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。
            </p>
          </div>
          <SubContent>
            <FormContainer>
              <h1 className="contact-thanks-heading">
                お問い合わせ頂きありがとうございます。
              </h1>
              <p className="contact-thanks-text">
                内容確認の上、ご連絡を致しますので、今しばらくお待ちくださいませ。
                <br />
                3日経っても返事がない場合、申し訳ありませんが再度ご連絡ください。
              </p>
              <div className="contact-button">
                <Button
                  buttonType={"link"}
                  text={"トップページに戻る"}
                  link={"/"}
                  handleClick={null}
                />
              </div>
            </FormContainer>
          </SubContent>
        </Content>
      </main>
      <Footer />
    </>
  );
};
