import "./card.css";
import Tag from "../Tag/tag.js";

function Card(props) {
  return (
    <div className="card-wrapper">
      <div className="company-wrapper">
        <img
          className="logo"
          src={props.card.logo}
          alt={props.card.company + " logo"}
        />
        <div className="company-info-wrapper">
          <div className="company-info">
            <div className="company-name">{props.card.company}</div>
            <div className="location">{props.card.location}</div>
          </div>
        </div>
      </div>
      <div className="info-wrapper">
        <div className="title">{props.card.title}</div>
        <div className="date">Applied on {props.card.date}</div>
      </div>
      <Tag type={props.card.type} />
    </div>
  );
}

export default Card;
