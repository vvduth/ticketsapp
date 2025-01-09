import React from "react";
import { useEffect, useState } from "react";
const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const  timerId = setInterval(findTimeLeft, 1000);

    return () => {
        clearInterval(timerId)
    }
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  } 


  return <div>{timeLeft / 1000} second until the order expires</div>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
