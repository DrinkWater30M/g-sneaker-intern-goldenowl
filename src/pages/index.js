import api from "@/data/api";
import { Check } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [pickList, setPickList] = useState([]);
  const [quantity, setQuantity] = useState([]);

  // get shoes data after page loaded
  useEffect(() => {
    const products = api.getAllShoes();
    setProducts(products);
  }, []);

  // handle pick list when pick one shoes
  const handleAddShoes = (product) => {
    // add to pick list
    const newPickList = [...pickList, product];
    setPickList(newPickList);

    // add quantity
    const newQuantity = [...quantity, { id: product.id, quantity: 1 }];
    setQuantity(newQuantity);
  };

  // handle pick list when remove one shoes
  const handleRemoveShoes = (product) => {
    let newPickList = [...pickList];
    newPickList = newPickList.filter((p) => p.id != product.id);
    setPickList(newPickList);

    let newQuantity = [...quantity];
    newQuantity = newQuantity.filter((q) => q.id != product.id);
    setQuantity(newQuantity);
  };

  // handle down quantity
  const handleDownQuantity = (product) => {
    let newQuantity = [...quantity];
    const index = newQuantity.findIndex((q) => q.id == product.id);

    if (newQuantity[index].quantity == 1) {
      handleRemoveShoes(product);
      return;
    }

    newQuantity[index].quantity -= 1;
    setQuantity(newQuantity);
  };

  // handle up quantity
  const handleUpQuantity = (product) => {
    let newQuantity = [...quantity];
    const index = quantity.findIndex((q) => q.id == product.id);

    newQuantity[index].quantity += 1;
    setQuantity(newQuantity);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="logo">
          <img src="/assets/nike.png" alt="logo" />
        </div>
        <div className="title">Our Products</div>
        <div className="content">
          {products.map((product, index) => (
            <div className="item" key={product.id}>
              <div className="item-image" style={{ backgroundColor: product.color }}>
                <img src={product.image} alt="shoes" />
              </div>
              <div className="item-name">{product.name}</div>
              <div className="item-description">{product.description}</div>
              <div className="item-bottom">
                <div className="price">${product.price}</div>
                {pickList.find((item) => item.id == product.id) ? (
                  <div className="added-cart">
                    <Check />
                  </div>
                ) : (
                  <div className="add-cart" onClick={() => handleAddShoes(product)}>
                    Add to card
                  </div>
                )}
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
          <div className="title-price">
            $
            {pickList
              .reduce((prev, cur) => {
                const curQuantity = quantity.find((q) => q.id == cur.id);
                return prev + cur.price * curQuantity.quantity;
              }, 0)
              .toFixed(2)}
          </div>
        </div>
        <div className="content">
          {pickList.length == 0 ? (
            <span className="content-empty">Your card is empty</span>
          ) : (
            pickList.map((product) => (
              <div className="item-2" key={product.id}>
                <div className="left" style={{ backgroundColor: product.color }}>
                  <img src={product.image} alt="shoes" />
                </div>
                <div className="right">
                  <div className="name">{product.name}</div>
                  <div className="price">${product.price}</div>
                  <div className="bottom">
                    <div className="quantity">
                      <div className="down" onClick={() => handleDownQuantity(product)}>
                        -
                      </div>
                      <div className="value">{quantity.find((q) => q.id == product.id).quantity}</div>
                      <div className="up" onClick={() => handleUpQuantity(product)}>
                        +
                      </div>
                    </div>
                    <div className="delete" onClick={() => handleRemoveShoes(product)}>
                      <img src="/assets/trash.png" alt="trash" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
