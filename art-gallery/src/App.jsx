import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <header>
          <div className="container">
            <nav class="navbar">
            <div class="container-fluid">
                <a class="navbar-brand">DA</a>
                <form class="d-flex" role="search">
                  <input
                    class="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
                <button type="button" class="btn btn-success">Success</button>
              </div>
              <li>
                <a href="">hoa</a>
              </li>
              <li>
                <a href="">hoa</a>
              </li>
              <li>
                <a href="">hoa</a>
              </li>
              <li>
                <a href="">hoa</a>
              </li>

            </nav>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
