import { useLocation } from "react-router-dom";

function Billing() {

  const location = useLocation();
  const cart = location.state?.cart || [];

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bill Summary</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {item.title} - ₹{item.price}
          </p>
        </div>
      ))}

      <hr />

      <h3>Total : ₹{total.toFixed(2)}</h3>
    </div>
  );
}

export default Billing;