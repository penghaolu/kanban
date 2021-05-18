import "./tag.css";

function Tag(props) {
  const tag = props.type;
  return <span className="tag">{tag}</span>;
}

export default Tag;
