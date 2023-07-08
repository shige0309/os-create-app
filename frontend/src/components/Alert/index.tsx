import "./Alert.css";

type AlertProps = {
  changeAlertVisible: () => void;
  text: string;
};

export const Alert = ({ changeAlertVisible, text }: AlertProps) => {
  return (
    <div className="c-alert__wrap c-success">
      <div className="c-alert">
        {text}
        <button
          className="c-alert__crosse"
          onClick={() => changeAlertVisible()}
        >
          <span></span>
        </button>
      </div>
    </div>
  );
};
