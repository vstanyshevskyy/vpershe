const React = require('react');
require('./elements.css');

export default class MessageSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // open: props.messageSuccessState,
      // fromClose: false,
      hiddenBefore: '',
      cases: {
        noty: {
          theme: 'orange'
        },
        welcome: {
          theme: 'darkred'
        },
        action: {
          theme: 'green',
          success: {
            theme: 'darkred'
          },
          reject: {
            theme: 'darkred'
          }
        }
      },
      case: props.message.type || 'action',
      value: props.message.value || 'Hi there!'
    };
    this.closeSnippet = this.closeSnippet.bind(this);
    this.updateSnippet = this.updateSnippet.bind(this);
  }
  componentDidUpdate(prevProps) {
    setTimeout(() => {
      this.updateSnippet(prevProps.open);
    }, 40);
  }
  updateSnippet(val) {
    this.setState(prev => {
      if (!prev.fromClose) {
        return {
          open: val
        };
      }

      return prev;
    });
  }
  closeSnippet() {
    setTimeout(() => {
      this.setState(() => ({
        fromClose: true,
        hiddenBefore: '',
        open: false
      }));
    }, 400);
  }
  render() {
    return (
      <div>{this.props.messageSuccessState}
        <div className={this.props.messageSuccessState ? `${this.state.cases[this.state.case].theme} message-snippet` :
          `${this.state.cases[this.state.case].theme} message-snippet d-none hidden ${this.state.hiddenBefore}`}
        >
          <p className="close" onClick={this.closeSnippet} role="presentation">
            <i className="material-icons">close</i>
          </p>
          <small>#!</small>
          <p>{this.state.value}</p>
          {this.props.messageSuccessState}
        </div>
      </div>
    );
  }
}
