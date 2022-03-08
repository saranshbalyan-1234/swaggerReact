import React, { useState } from "react";
import Swagger from "./Components";
export default function App() {
  const [basePath, setBasePath] = useState(
    "http://184.68.122.34:9085/v2/api-docs"
  );
  return <Swagger basePath={basePath} setBasePath={setBasePath} />;
}
