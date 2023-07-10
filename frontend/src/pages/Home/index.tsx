import { Contact } from "components/Contact";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { Head } from "components/Head";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Front";
import { WorkList } from "components/WorkList";
import { useEffect } from "react";

import { HomeBlog } from "./Components/HomeBlog";
import { HomeCatch } from "./Components/HomeCatch";
import { HomeProfile } from "./Components/HomeProfile";

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Head title={null} description={null} />
      <Sidebar />
      <main>
        <div id="top">
          <MainVisual image={"top-main.jpg"} />
        </div>
        <Content>
          <HomeCatch />
          <div id="profile">
            <HomeProfile />
          </div>
          <div id="work">
            <div className="homeSection">
              <WorkList />
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
};
