import * as React from "react";
const _ = require("lodash");
import { first, map } from "rxjs/operators";

const transforms = require("@nteract/transforms");
const messaging = require("@nteract/messaging");

// Container (?) component for passing through

export default class CodeState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        messageCollections: this.state.messageCollections,
        kernel: this.props.kernel
      });
    });
  }
}
