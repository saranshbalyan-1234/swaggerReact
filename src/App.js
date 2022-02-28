import React, { useState } from "react";
import Swagger from "./Components";
export default function App() {
  const [basePath, setBasePath] = useState(
    "https://petstore.swagger.io/v2/swagger.json"
  );
  return <Swagger basePath={basePath} />;
}
