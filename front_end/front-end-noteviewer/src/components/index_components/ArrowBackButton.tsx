import ArrowIcon from "../../static/images/arrow_back.png";

function ArrowBackButton(props){
  return (
    <div id="arrow-back-button">
      <img src={ArrowIcon} onClick={props.callbackReturn} />
    </div>
  )
}

export default ArrowBackButton;
