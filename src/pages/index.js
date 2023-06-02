import api from "@/data/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  // get shoes data after page loaded
  useEffect(() => {
    const products = api.getAllShoes();
    setProducts(products);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="logo">
          <img src="/assets/nike.png" alt="logo" />
        </div>
        <div className="title">Our Products</div>
        <div className="content">
          {products.map((product) => (
            <div className="item" key={product.id}>
              <div className="item-image" style={{backgroundColor: product.color}}>
                <img src={product.image} alt="shoes" />
              </div>
              <div className="item-name">{product.name}</div>
              <div className="item-description">{product.description}</div>
              <div className="item-bottom">
                <div className="price">${product.price}</div>
                <div className="add-cart">Add to card</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="logo">
          <img src="/assets/nike.png" alt="logo" />
        </div>
        <div className="title">
          <div className="title-product">Our Products</div>
          <div className="title-price">$552.91</div>
        </div>
        <div className="content">
          <div className="item-2">
            <div className="left">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-mens-running-shoe-wide-D24Mcz-removebg-preview.png"
                alt="shoes"
              />
            </div>
            <div className="right">
              <div className="name">Nike CruzrOne</div>
              <div className="price">$100.97</div>
              <div className="bottom">
                <div className="quantity">
                  <div className="down">-</div>
                  <div className="value">1</div>
                  <div className="up">+</div>
                </div>
                <div className="delete">
                  <img src="/assets/trash.png" alt="trash" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
