import { Link } from "react-router-dom";
import { FadeInComponent } from "components/FadeInComponent";
import { GetWorkType } from "Type";
import "./Card.css";

export const Card = ({ props }: { props: GetWorkType }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_S3_OBJ_URL;
  return (
    <div className="c-card">
      <FadeInComponent>
        <Link to={`/work/${props._id}`}>
          <figure>
            <p className="c-card-img">
              <img
                src={PUBLIC_FOLDER + "work/" + props.thumbnail}
                alt={props.title}
              />
            </p>
            <figcaption>
              <p className="c-card-tag">
                <span>{props.tag}</span>
              </p>
              <p className="c-card-name">{props.title}</p>
            </figcaption>
          </figure>
        </Link>
      </FadeInComponent>
    </div>
  );
};
