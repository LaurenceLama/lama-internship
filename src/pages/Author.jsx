import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import Skeleton from "../UI/Skeleton";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

export default function Author() {
  const [skelLoad, setSkelLoad] = useState();
  const [author, setAuthor] = useState([]);
  const { authorId } = useParams();
  const [follow, setFollow] = useState(false);

  async function fetchData() {
    // setSkelLoad(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    // setSkelLoad(false);
    // console.log(data);
    setAuthor(data);
  }

  function addFollow() {
    if (follow) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {follow ? (
                        <>
                          <div className="profile_follower">
                            {author.followers + 1} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={addFollow}>
                            Unfollow
                          </Link>
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={addFollow}>
                            Follow
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
