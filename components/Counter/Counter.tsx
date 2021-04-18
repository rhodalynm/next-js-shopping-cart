import React from "react";

type Props = {
  productQuantity: number;
  updateQuantity: (qty: number) => void;
};

const Counter = ({ productQuantity, updateQuantity }: Props) => {
  const increment = () => {
    updateQuantity(productQuantity + 1);
  };

  const decrement = () => {
    if (productQuantity > 1) {
      updateQuantity(productQuantity - 1);
    }
  };

  const feed = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuantity(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <input
        type="text"
        style={{ textAlign: "center" }}
        value={productQuantity}
        onChange={feed}
      />
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
