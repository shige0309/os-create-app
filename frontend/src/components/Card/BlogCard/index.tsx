import { FadeInComponent } from "components/FadeInComponent";
import { GetBlogType } from "Type";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export const BlogCard = ({ props }: { props: GetBlogType }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_S3_OBJ_URL;
  const date = new Date(props.updatedAt);
  const formattedDate = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;

  return (
    <div className="c-blogCard">
      <FadeInComponent>
        <Link to={`/blog/${props._id}`}>
          <figure>
            <div className="c-blogCard-img">
              <p>
                <img src={PUBLIC_FOLDER + "blog/" + props.thumbnail} alt="" />
              </p>
            </div>
            <figcaption>
              <time dateTime={formattedDate}>{formattedDate}</time>
              <h2 className="c-blogCard-title">{props.title}</h2>
              <p className="c-blogCard-text">
                {props.content.replace(/\s+/g, "")}
              </p>
            </figcaption>
          </figure>
        </Link>
      </FadeInComponent>
    </div>
  );
};
