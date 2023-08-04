import "./image.css";

const Image = (props) => {
  return (
    <>
      <article className="img-articles">
        <img
          className="all-images"
          src={props.data.urls.full}
          alt={props.data.user.name}
        />

        <div className="profile">
          <img
            src={props.data.user.profile_image.large}
            alt={props.data.user.name}
          />
          <h4><a href={props.data.links.download}> Download</a></h4>
        </div>
        <div className="likes">
        <h4 className="user-name">{props.data.user.name}</h4>
        <h4>{props.data.likes} likes</h4>
        </div> <br/>
        <h5 className="desc">{props.data.alt_description}</h5>
      </article>
    </>
  );
};

export default Image;




