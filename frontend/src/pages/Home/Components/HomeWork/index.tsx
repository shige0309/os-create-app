import { SectionTitle } from "components/SectionTitle";
import { Card } from "components/Card/WorkCard";
import { useEffect, useState } from "react";
import { GetWorkType } from "Type";
import { useWork } from "hooks/useWork";
import "./HomeWork.css";

export const HomeWork = () => {
  const [works, setWorks] = useState<GetWorkType[]>([]);
  const { getWorks } = useWork();
  
  useEffect(() => {
    const fetchWorks = async () => {
      const result = await getWorks();
      if(result) {
        setWorks(result.data);
      }
    }

    fetchWorks();
  }, []);
  return (
    <section>
      <SectionTitle en="WORK" title="直近の制作サイト"/>
      <div className="c-homeWork-card">
      {works ? works.map((work : GetWorkType) =>
        <Card props={work} key={work._id}/>) 
        : <p>WORKSがありません。</p>}
      </div>
    </section>
  )
}
