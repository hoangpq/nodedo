import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

require('../styles/main.scss');

export class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.params = props.match.params;
    this.imageUrl = `http://localhost:8069/web/image?model=product.template&id=${this.params.id}&field=image`;
    this.state = {};
  }

  componentWillMount() {
  }

  render() {
    return (<div>
      <div className="detail-image">
        Product detail
      </div>
      <Link to="/shop">Back to shop</Link>
    </div>);
  }
}


class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    }
  }

  componentWillMount() {
    axios.get(`/api/images/${this.props.product_id}`).then(res => {
      this.setState({ avatar: res.data });
    })
  }

  render() {
    const catStyle = {color: 'red',};

    return (
      <div className="item">
        <div className="avatar">
          <Link to={`/detail/${this.props.product_id}`}>
            <img src={this.state.avatar} alt={this.props.pname}/>
          </Link>
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
