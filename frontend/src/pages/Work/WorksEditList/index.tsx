import "./WorksEditList.css";

import CircularProgress from "@mui/joy/CircularProgress";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { Head } from "components/Head";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Admin";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { useWork } from "hooks/useWork";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetWorkType } from "Type";

export const WorksEditList = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_S3_OBJ_URL;
  const [works, setWorks] = useState<GetWorkType[]>([]);
  const [loading, setLoading] = useState(false);
  const { getWorks } = useWork();

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      const result = await getWorks();
      setWorks(result.data);
      setLoading(false);
    };

    fetchWorks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head title={"WORKS編集"} description={"WORKS編集"} />
      <Sidebar />
      <main>
        <MainVisual image={"contact/mv.jpg"} />
        <Content>
          <div className="c-works-edit-list">
            <SubPageTitle title={"WORKS編集"} sub={""} />
          </div>
          <SubContent>
            {loading && (
              <div className="c-homeWork-progress">
                <CircularProgress size="lg" />
                <p>ローディング中</p>
              </div>
            )}
            <div className="works-edit-list">
              {works.length > 0 ? (
                works.map((work) => (
                  <Link
                    className="works-edit-list-item"
                    key={work._id}
                    to={`/works/update/${work._id}`}
                  >
                    <p className="works-edit-list-image">
                      <img
                        src={PUBLIC_FOLDER + "work/" + work.thumbnail}
                        alt={work.title}
                      />
                    </p>
                    <div>
                      <p className="works-edit-list-tag">{work.tag}</p>
                      <p className="works-edit-list-title">{work.title}</p>
                    </div>
                    <span className="works-edit-list-link">編集する</span>
                  </Link>
                ))
              ) : (
                <p>WORKSがありません。</p>
              )}
            </div>
          </SubContent>
        </Content>
      </main>
      <Footer />
    </>
  );
};
