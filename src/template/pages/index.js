import { Kernel } from "@mybinder/host-cache";
import { CodeArea } from "../components/code-area";

const Index = () => {
  return (
    <Kernel repo="binder-examples/requirements" kernelName="python3">
      <Kernel.Consumer>
        {kernel =>
          kernel ? (
            <CodeArea kernel={kernel}>import this</CodeArea>
          ) : (
            <pre>Loading...</pre>
          )
        }
      </Kernel.Consumer>
    </Kernel>
  );
};

export default Index;
