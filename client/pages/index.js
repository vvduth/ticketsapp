import React from "react";
import axios from "axios";
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <div>LandingPage</div>;
};

LandingPage.getInitialProps = async ({req}) => {
  if (typeof window === "undefined") {
    // we are on the server
    // requests should be made to http://ingress-nginx.ingress-nginx...laksdjf
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  return {};
};
export default LandingPage;
