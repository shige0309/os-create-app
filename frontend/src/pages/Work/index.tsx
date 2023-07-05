import { Contact } from "components/Contact";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Front";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWork } from "hooks/useWork";
import { GetWorkType } from "Type";
import { AxiosResponse } from "axios";
import { Head } from "components/Head";
import { WorkList } from "components/WorkList";
import "./Work.css";

export const WorkPage = () => {
  const { getDetailWork } = useWork();
  const id = useParams().id;
  const [ work, setWork ] = useState<GetWorkType>();
  const PUBLIC_FOLDER = process.env.REACT_APP_S3_OBJ_URL;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchWork = async () => {

      if(id) {
        const work: AxiosResponse<GetWorkType> = await getDetailWork(id);
        setWork(work.data);
      }
    }

    fetchWork();

  }, [id]);
  return (
    <>
      <Head title={work ? work.title : null} description={work ? work.title : null}/>
      <Sidebar />
      <main>
        <MainVisual image={"work/mv.jpg"}/>
        <Content>
          <div className="work">
            <SubPageTitle title={"WORK"} sub={work ? work.tag : ""}/>
            <h1 className="work-title">{work ? work.title : ""}</h1>
          </div>
          <SubContent>
            {work && <p className="work-detail"><img src={PUBLIC_FOLDER + "work/" + work.descriptionImage} alt="" /></p>}
          </SubContent>
          <div className="homeSection">
            <WorkList />
          </div>
          <Contact />
        </Content>
      </main>
      <Footer />
    </>
  )
}
