import React from 'react';

const modalStyles = {
  position: 'absolute',
  zIndex: 1000,
  backgroundColor: 'whitesmoke',
  padding: '40px 90px'
};

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div id={this.props.modalConfig.id}>
        {this.state.visible ?
          <div className="modal-window" style={modalStyles}>
            <div className="close-modal">
              <button onClick={() => this.close()}>x</button>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-10">
                  <div>
                    <h4>{this.props.modalConfig.title}</h4>
                  </div>
                </div>
                <div className="col-md-2" />
              </div>
              <div className="row">
                <p>{this.props.modalConfig.additionals}</p>
              </div>
            </div>
          </div> :
          false
        }
      </div>
    );
  }
}
