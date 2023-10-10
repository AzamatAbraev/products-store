import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import usePathname from "../hooks/usePathname";

const CartPage = () => {
  const [product, setProduct] = useState([]);
  let { productId } = useParams();
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getProductInfo = async () => {
      let { data } = await axios.get(
        `https://6524f72867cfb1e59ce6510f.mockapi.io/category/${categoryId}/product/${productId}`
      );
      setProduct(data);
    };
    getProductInfo();
    return () => {
      controller.abort();
    };
  }, [productId, categoryId]);
  return (
    <section id="cart">
      <div className="container-lg">
        <h1 className="cart-title text-center py-5">Cart</h1>
        <div className="cart-row">
          {product.map((detail) => (
            <div key={detail.id} className="cart-card">
              <div className="cart-image">
                <img src={detail.image} alt={detail.name} />
              </div>
              <div className="cart-info">
                <h3 className="cart-name">{detail.name}</h3>
                <p className="cart-desc">{detail.description}</p>
                <p className="cart-price">{detail.price}</p>
                <p className="cart-stock">{detail.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
