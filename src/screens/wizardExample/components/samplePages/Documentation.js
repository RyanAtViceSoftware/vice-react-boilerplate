import React from "react";
import Markdown from "./Markdown";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

export default class Documetation extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const docs = `
### Documentation
${this.props.markdown}
`;

    return (
      <div className="card">
        <div className="container">
          <Markdown
            source={docs}
            escapeHtml={false}
            renders={{ code: Markdown }}
            skipHtml={false}
          />
        </div>
      </div>
    );
  }
}
