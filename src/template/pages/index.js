import { Kernel } from "@mybinder/host-cache";
import { CodeArea } from "../components/code-area";
const { WideLogo } = require("@nteract/logos");

const myCode = `import pandas as pd
import numpy as np
df = pd.DataFrame(np.random.random((100,10)))
df.head()
`;

const Index = () => {
  return (
    <>
      <center>
        <WideLogo height={80} theme="light" />
        <br />
        Welcome to nteract!
        <br />
        To get started, edit <code>pages/index.js</code>.
      </center>
      <hr />
      <Kernel repo="binder-examples/requirements" kernelName="python3">
        <Kernel.Consumer>
          {kernel =>
            kernel ? (
              <CodeArea kernel={kernel}>{myCode}</CodeArea>
            ) : (
              <pre>Loading...</pre>
            )
          }
        </Kernel.Consumer>
      </Kernel>
    </>
  );
};

export default Index;
