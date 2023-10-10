import axios from "axios";
import { memo, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import menu from "../../assets/images/menu.svg";
import useScreenSize from "../../hooks/screenSize";

import "./Layout.css";

const Header = () => {
  const [navShow, setNavShow] = useState(false);
  const [category, setCategory] = useState([]);
  const handleShow = () => {
    setNavShow(!navShow);
  };
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
      controller.abort();
    }
  }, []);

  const screenSize = useScreenSize();
  return (
    <header>
      <nav>
        <div className="container-lg nav-container">
          <Link to="/" className="nav-logo">Home</Link>
          <ul className="nav-menu">
            {category.map((item) => (
              <li key={item.id} className="nav-item">
                <NavLink
                  to={`/category/${item.id}/product`}
                  className="category-link"
                >
                  {item.name.split(" ")[0]}
                </NavLink>
              </li>
            ))}
          </ul>
          {screenSize <= 550 ? (
            <div className="hamburger">
              <button onClick={() => handleShow()} className="menu-open">
                <img src={menu} alt="Menu" />
              </button>
            </div>
          ) : null}
        </div>
        {navShow ? (
          <div className="container-lg nav-res">
            <ul className="nav-res-menu">
              {category.map((item) => (
                <li key={item.id} className="nav-res-item">
                  <NavLink
                    to={`/category/${item.id}/product`}
                    className="category-res-link"
                  >
                    {item.name.split(" ")[0]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

const MemoHeader = memo(Header);

export default MemoHeader;
