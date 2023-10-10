import { memo, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";

import { LIMIT } from "../constants/paginationDetails";

import "./ProductsPage.css";

const ProductPage = () => {
  let { categoryId } = useParams();
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const searchProducts = async () => {
      let { data } = await axios.get(
        `https://6524f72867cfb1e59ce6510f.mockapi.io/category/${categoryId}/product?sortBy=price&order=${sort}&search=${search}&page=${activePage}&limit=${LIMIT}`
      );
      setSortedProducts(data);
    };
    searchProducts();

    const getProducts = async () => {
      let { data } = await axios.get(
        `https://6524f72867cfb1e59ce6510f.mockapi.io/category/${categoryId}/product?search=${search}`
      );
      setTotal(data);
    };
    getProducts();

    return () => {
      controller.abort();
    };
  }, [categoryId, sort, search, activePage]);

  let pages = Math.ceil(total.length / LIMIT);
  let arr = [];
  for (let i = 1; i <= pages; i++) {
    arr.push(i);
  }

  return (
    <section id="products">
      <div className="container-lg">
        <h1 className="product-title">Products</h1>
        <p className="alert alert-info">
          {sortedProducts.length !== 0
            ? `Total Products: ${sortedProducts.length}`
            : "No Products Available"}
        </p>
        <InputGroup className="mb-4">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products"
          />
          <InputGroup.Text id="basic-addon2">
            <Form.Select
              onChange={(e) => setSort(e.target.value)}
              aria-label="Default select example"
            >
              <option value="sort">Sort</option>
              <option value="asc">1-10</option>
              <option value="desc">10-1</option>
            </Form.Select>
          </InputGroup.Text>
        </InputGroup>
        <div className="products-row">
          {sortedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <LazyLoadImage
                  className="product-img"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="product-info">
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price badge bg-danger">
                    $ {product.price + "0"}
                  </p>
                </div>
                <p className="product-desc">{product.description}</p>
                {/* <Link
                  to={`/${categoryId}/${product.id}/cart`}
                  className="cart-btn btn btn-warning"
                >
                  Add to cart
                </Link> */}
                <Link className="cart-btn btn btn-warning">Add to cart</Link>
              </div>
            </div>
          ))}
        </div>
        {sortedProducts.length > 0 && total.length > 6 ? (
          <ul className="pagination d-flex align-items-center justify-content-center my-3 text-center">
            <li className="page-item">
              <Link
                onClick={() => setActivePage(activePage - 1)}
                value="prev"
                className={`page-link ${activePage == 1 ? "disabled" : ""}`}
              >
                Previous
              </Link>
            </li>
            {arr.map((page) => (
              <li key={page} className="page-item">
                <Link
                  value={page}
                  onClick={() => setActivePage(page)}
                  className={`page-link ${page === activePage ? "active" : ""}`}
                >
                  {page}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                value="next"
                onClick={() => setActivePage(activePage + 1)}
                className={`page-link ${
                  activePage === pages ? "disabled" : ""
                }`}
              >
                Next
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </section>
  );
};

const MemoProductPage = memo(ProductPage);

export default MemoProductPage;
