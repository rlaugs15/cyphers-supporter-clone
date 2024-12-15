import spinner from "../../assets/images/video-spinner.gif";

function Spinner() {
  return (
    <img src={spinner} alt="loading" className="absolute inset-0 m-auto" />
  );
}

export default Spinner;
