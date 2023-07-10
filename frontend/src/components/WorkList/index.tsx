import "./WorkList.css";

import CircularProgress from "@mui/joy/CircularProgress";
import { Card } from "components/Card/WorkCard";
import { SectionTitle } from "components/SectionTitle";
import { useWork } from "hooks/useWork";
import { useEffect, useState } from "react";
import { GetWorkType } from "Type";

export const WorkList = () => {
  const [works, setWorks] = useState<GetWorkType[]>([]);
  const { getWorks } = useWork();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      const result = await getWorks();
      if (result) {
        setWorks(result.data);
      }
      setLoading(false);
    };

    fetchWorks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      <SectionTitle en="WORK" title="直近の制作サイト" />
      {loading && (
        <div className="c-homeWork-progress">
          <CircularProgress size="lg" />
          <p>ローディング中</p>
        </div>
      )}
      <div className="c-homeWork-card">
        {works ? (
          works.map((work: GetWorkType) => <Card props={work} key={work._id} />)
        ) : (
          <p>WORKSがありません。</p>
        )}
      </div>
    </section>
  );
};
