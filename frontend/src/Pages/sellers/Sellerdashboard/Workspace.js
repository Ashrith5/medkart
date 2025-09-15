import React from "react";
import SellerProfile from "./SellerProfile";
import ProductManager from "./ProductManager";
import OrderTable from "./OrderTable";

function Workspace({ activeTab, seller, token }) {
  switch (activeTab) {
    case "profile":
      return <SellerProfile seller={seller} token={token} />;
    case "uploadProduct": 
      return <ProductManager seller={seller} token={token} />;
    case "orders":
      return <OrderTable seller={seller} token={token} />;
    default:
      return <p>Select an option from the left</p>;
  }
}

export default Workspace;
