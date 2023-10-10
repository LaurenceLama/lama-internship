import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";
import LoadMore from "../UI/LoadMore";

export default function ExploreItems() {
  const [item, setItem] = useState([]);
  const [skelLoad, setSkelLoad] = useState();

  const loadCount = 4;

  const { numberItemsPagination, loadMoreItems, loadMoreReset } =
    LoadMore(loadCount);

  const itemsDisplayed = numberItemsPagination + 4;

  async function fetchData() {
    setSkelLoad(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setSkelLoad(false);
    setItem(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {item.slice(0, itemsDisplayed).map((col, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={col.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {col.expiryDate && (
              <Countdown key={col.id} expiryDate={col.expiryDate} />
            )}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
                <img
                  src={col.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{col.title}</h4>
              </Link>
              <div className="nft__item_price">{col.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{col.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={AuthorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">5h 30m 32s</div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
                <img src={nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>Pinky Ocean</h4>
              </Link>
              <div className="nft__item_price">1.74 ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>69</span>
              </div>
            </div>
          </div>
        </div>
      ))} */}
      <div className="col-md-12 text-center">
        {item.length > itemsDisplayed ? (
          <Link
            to=""
            onClick={() => loadMoreItems(item.length)}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        ) : (
          <h1 style={{ display: "none" }}>rawr</h1>
        )}
      </div>
    </>
  );
}
