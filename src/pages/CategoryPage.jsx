import { Link } from "react-router-dom";
import "./Category.css";
import { Fragment, memo, useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const getCategories = async () => {
      let { data } = await axios.get(
        "https://6524f72867cfb1e59ce6510f.mockapi.io/category"
      );
      setCategory(data);
    };
    getCategories();

    return () => {
      controller.abort()
    }
  }, []);
  return (
    <section id="category">
      <div className="container-lg">
        <h1 className="category-title text-center">What we offer</h1>
        <div className="categories-row">
          {category.map((info) => (
            <Fragment key={info.id}>
              <div className="category-card">
                <div className="category-info">
                  <h2 className="category-name">{info.name}</h2>
                  <p className="category-desc">{info.description}</p>
                  <Link
                    className="category-btn"
                    to={`/category/${info.id}/product/`}
                  >
                    See more
                  </Link>
                </div>
                <Link
                  to={`/category/${info.id}/product/`}
                  className="category-image"
                >
                  <LazyLoadImage
                    className="category-img"
                    src={info.image}
                    alt="Category Title"
                  />
                </Link>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const MemoProductPage = memo(CategoryPage);

export default MemoProductPage;
