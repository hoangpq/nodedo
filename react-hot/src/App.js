import React, {Component} from 'react';
import axios from 'axios';
require('../styles/main.scss');

const host = 'localhost:8069/web/image';
class Product extends Component {

  constructor(props) {
    super(props);
    this.imageUrl = `http://localhost:8069/web/image?model=product.template&id=14&field=image`;
  }

  render() {
    const catStyle = {color: 'red',};
    return (
      <div className="item">
        <div className="avatar">
          <img src={this.imageUrl} alt={this.props.pname}/>
        </div>
        <div className="item-info">
          <span>{this.props.pname}</span>
          <span style={catStyle}>{this.props.cname}</span>
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  pname: React.PropTypes.string,
  cname: React.PropTypes.string,
};

Product.defaultProps = {
  pname: '',
  cname: '',
};


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentWillMount() {
    axios.get('/api').then((res) => {
      this.setState({
        products: res.data,
      })
    })
  }

  renderItem(item, index) {
    return <Product {...item} key={index}/>
  }

  render() {
    return (
      <div className="content-holder">'
        {this.state.products.map(this.renderItem)}
      </div>
    );
  }
}
