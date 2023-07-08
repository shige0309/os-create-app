import "./SectionTitle.css";

type TitleProps = {
  en: string;
  title: string | null;
};

export const SectionTitle = (props: TitleProps) => {
  return (
    <div className="c-sectionTitle">
      <h2 className="area-400">{props.en}</h2>
      {props.title ? <p>{props.title}</p> : ""}
    </div>
  );
};
