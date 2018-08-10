const _ = require("lodash");
import { first, map } from "rxjs/operators";
import { Outputs } from "@nteract/presentational-components";

const transforms = require("@nteract/transforms");
const messaging = require("@nteract/messaging");

export class CodeArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: `${this.props.children}`,
      messageCollections: {}
    };
  }

  getKernelInfo() {
    // Set up a receiver for kernel info
    let kernelInfo = null;
    this.props.kernel.channels
      .pipe(
        messaging.ofMessageType("kernel_info_reply"),
        first(),
        map(msg => msg.content)
      )
      .subscribe(content => {
        kernelInfo = content;
      });

    var intervalId;
    intervalId = setInterval(() => {
      if (kernelInfo) {
        clearInterval(intervalId);
        return;
      }
      this.props.kernel.channels.next(messaging.kernelInfoRequest());
    }, 300);
  }

  componentDidMount() {
    this.subscription = this.props.kernel.channels.subscribe(
      msg => {
        if (msg.parent_header && typeof msg.parent_header.msg_id === "string") {
          const parent_id = msg.parent_header.msg_id;

          // Collect all messages
          const messages = _.get(this.state.messageCollections, parent_id, []);
          messages.push(msg);
          this.setState({
            messageCollections: {
              ...this.state.messageCollections,
              [parent_id]: messages
            }
          });
        }
      },
      err => console.error(err)
    );

    this.getKernelInfo();
  }

  render() {
    return (
      <>
        <div style={{ width: "80%", margin: "auto" }}>
          <textarea
            style={{
              border: "solid 1px",
              width: "100%",
              height: "140px",
              fontSize: ".8em",
              fontFamily: `SFMono-Regular, Menlo, Consolas, "Liberation Mono", "Courier New", monospace`,
              display: "block"
            }}
            onChange={event => {
              this.setState({ source: event.target.value });
            }}
            value={this.state.source}
          />
          <button
            onClick={() => {
              this.props.kernel.channels.next(
                messaging.executeRequest(this.state.source)
              );
            }}
          >
            ▶ Run
          </button>
          <button
            onClick={() => {
              this.setState({ messageCollections: {} });
            }}
          >
            Clear
          </button>
          {_.map(this.state.messageCollections, (collection, parent_id) => {
            return _.map(collection, msg => {
              switch (msg.msg_type) {
                case "execute_result":
                case "display_data":
                  if (msg.content.data) {
                    const mimetype = transforms.richestMimetype(
                      msg.content.data
                    );
                    if (!mimetype) {
                      return null;
                    }
                    const Transform = transforms.transforms[mimetype];

                    return (
                      <Outputs>
                        <Transform
                          key={msg.header.msg_id}
                          data={msg.content.data[mimetype]}
                        />
                      </Outputs>
                    );
                  }
                case "stream":
                  return <pre key={msg.header.msg_id}>{msg.content.text}</pre>;
                default:
                  return null;
              }
            });
          })}
        </div>
      </>
    );
  }
}
