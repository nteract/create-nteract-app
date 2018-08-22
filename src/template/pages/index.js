import * as React from "react";

import PresentationCell from "../components/presentation-cell";
import CodeState from "../components/code-state";

import { Kernel } from "@mybinder/host-cache";
const { WideLogo } = require("@nteract/logos");

const Index = () => {
  return (
    <div className="app">
      <header>
        <WideLogo height={40} theme="light" />

        <p>
          This <i>nteraction</i> brought to you in part by binder, jupyter, and
          nteract.
        </p>
        <p>
          A binder server is being launched in the background now. You'll see a
          cell below when its ready.
        </p>
        <p>
          To get started, edit <code>pages/index.js</code>.
        </p>
      </header>

      <Kernel repo="binder-examples/requirements" kernelName="python3">
        <Kernel.Consumer>
          {kernel =>
            kernel ? (
              <CodeState kernel={kernel}>
                <PresentationCell key={"the-cell"} />
              </CodeState>
            ) : (
              <PresentationCell key={"the-cell"} />
            )
          }
        </Kernel.Consumer>
      </Kernel>
      <style jsx>{`
        .app {
          padding: 30px;
          font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
            sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }

        header {
          font-size: 1em;
          padding-bottom: 20px;
        }
        code {
          font-size: 1.3em;
          background-color: hsl(10, 0%, 90%);
          padding: 2px;
        }
      `}</style>
    </div>
  );
};

export default Index;
