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
import CircularProgress from "@mui/joy/CircularProgress";
import "./Work.css";

export const WorkPage = () => {
  const { getDetailWork } = useWork();
  const id = useParams().id;
  const [work, setWork] = useState<GetWorkType>();
  const PUBLIC_FOLDER = process.env.REACT_APP_S3_OBJ_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchWork = async () => {
      if (id) {
        setLoading(true);
        const work: AxiosResponse<GetWorkType> = await getDetailWork(id);
        setWork(work.data);
        setLoading(false);
      }
    };

    fetchWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <Head
        title={work ? work.title : null}
        description={work ? work.title : null}
      />
      <Sidebar />
      <main>
        <MainVisual image={"work/mv.jpg"} />
        <Content>
          <div className="work">
            <SubPageTitle title={"WORK"} sub={work ? work.tag : ""} />
            <h1 className="work-title">{work ? work.title : ""}</h1>
          </div>
          <SubContent>
            {loading && (
              <div>
                <div className="work-progress">
                  <div className="work-progress-circle"><CircularProgress size="lg" /></div>
                  <p>ローディング中</p>
                </div>
                <div className="work-mask"></div>
              </div>
            )}
            {work && (
              <p className="work-detail">
                <img
                  src={PUBLIC_FOLDER + "work/" + work.descriptionImage}
                  alt=""
                />
              </p>
            )}
          </SubContent>
          <div className="homeSection">
            <WorkList />
          </div>
          <Contact />
        </Content>
      </main>
      <Footer />
    </>
  );
};
