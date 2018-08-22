import * as React from "react";
import {
  Cell,
  Input,
  Prompt,
  Source,
  Outputs
} from "@nteract/presentational-components";

import CodeMirrorEditor from "@nteract/editor";

export default class PresentationCell extends React.Component {
  constructor(props) {
    super(props);

    this.submit = () => {
      console.log(this.state.source);
    };

    this.state = {
      source: this.props.source,
      codeMirrorOptions: {
        extraKeys: {
          "Ctrl-Space": "autocomplete",
          "Shift-Enter": this.submit,
          "Ctrl-Enter": this.submit,
          "Cmd-Enter": this.submit
        },
        mode: "python"
      }
    };
  }

  render() {
    return (
      <div className="omg">
        <Cell isSelected>
          <Input>
            <Prompt counter={3} />
            <Source>
              <CodeMirrorEditor
                options={this.state.codeMirrorOptions}
                onChange={source =>
                  this.setState({
                    source
                  })
                }
                value={this.state.source}
              />
            </Source>
          </Input>
        </Cell>
        <style>{`
      .omg {
        text-align: left
      }
      `}</style>
      </div>
    );
  }
}
