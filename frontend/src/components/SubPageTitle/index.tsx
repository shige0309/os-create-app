import "./SubPageTitle.css";

type TitleProps = {
  title: string;
  sub: string;
};

export const SubPageTitle = (props: TitleProps) => {
  return (
    <div>
      <p className="c-subPage-title-en area-400">{props.title}</p>
      <p className="c-subPage-title-sub area-400">{props.sub}</p>
    </div>
  );
};
