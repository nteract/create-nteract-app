import * as React from "react";

import PresentationCell from "../components/presentation-cell";
import CodeState from "../components/code-state";

import { Kernel } from "@mybinder/host-cache";
import { CodeArea } from "../components/code-area";
const { WideLogo } = require("@nteract/logos");

const Index = () => {
  return (
    <div className="app">
      <Kernel repo="binder-examples/requirements" kernelName="python3">
        <Kernel.Consumer>
          {kernel => (
            <CodeState kernel={kernel}>
              <PresentationCell key={"the-cell"} />
            </CodeState>
          )}
        </Kernel.Consumer>
      </Kernel>
      <style jsx>{`
        .app {
          padding: 30px;
        }
      `}</style>
    </div>
  );
};

export default Index;
