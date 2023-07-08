import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

type buttonProps = {
  buttonType: "button" | "link";
  text: string;
  link: string | null;
  handleClick: React.MouseEventHandler<HTMLButtonElement> | null;
};

export const Button = (props: buttonProps) => {
  if (props.buttonType === "button") {
    if (props.handleClick) {
      return (
        <button
          type="submit"
          className="c-form-button"
          onClick={props.handleClick}
        >
          {props.text}
        </button>
      );
    } else {
      return (
        <button type="submit" className="c-form-button">
          {props.text}
        </button>
      );
    }
  } else {
    let link: string = "/";

    if (props.link) {
      link = props.link;
    }

    return (
      <Link to={link} className="c-form-button">
        {props.text}
      </Link>
    );
  }
};
