import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import AppLayout from "./AppLayOut";

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
export default App;