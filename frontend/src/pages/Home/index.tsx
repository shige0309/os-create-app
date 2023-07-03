import { Contact } from "components/Contact";
import { MainVisual } from "components/MainVisual";
import { Content } from "components/Content";
import { HomeCatch } from "./Components/HomeCatch";
import { HomeProfile } from "./Components/HomeProfile";
import { HomeWork } from "./Components/HomeWork";
import { HomeBlog } from "./Components/HomeBlog";
import { Sidebar } from "components/Sidebar/Front";
import { Footer } from "components/Footer";
import { Head } from "components/Head";

export const HomePage = () => {
  return (
    <>
    <Head title={null} description={null}/>
    <Sidebar />
    <main>
      <div id="top">
        <MainVisual image={"top-main.jpg"}/>
      </div>
      <Content>
        <HomeCatch />
        <div id="profile">
          <HomeProfile />
        </div>
        <div id="work">
          <div className="homeSection">
            <HomeWork />
          </div>
        </div>
        <div id="blog">
          <div className="homeSection">
            <HomeBlog />
          </div>
        </div>
        <Contact />
      </Content>
    </main>
    <Footer />
    </>
  );
}
