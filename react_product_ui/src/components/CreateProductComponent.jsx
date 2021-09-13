import React, { Component } from 'react'
import ProductService from '../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: this.props.match.params.id,
             productName: '',
             description: '',
             price: '',
        }
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        if(this.state.id == -1){
            return
        }
        else{
            ProductService.getProductById(this.state.id).then((res) => {
                let product = res.data;
                this.setState({
                    productName: product.productName,
                    description: product.description,
                    price: product.price
                });
    
            });
        }
        
    }

    changeProductNameHandler = (event) => {
        this.setState({productName: event.target.value});
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    saveProduct = (event) => {
        event.preventDefault();
        let product = {productName: this.state.productName, description: this.state.description, price: this.state.price};
        console.log('product => ' + JSON.stringify(product));
    
        if(this.state.id == -1){
            ProductService.createProduct(product).then(res => {
                this.props.history.push('/products')
            });
        }
        else{
            ProductService.updateProduct(product, this.state.id).then(res => {
                this.props.history.push('/products');
            });
        }
        
    }

    cancel(){
        this.props.history.push('/products');
    }

    getTitle(){
        if(this.state.id == -1){
            return <h3 className="text-center">Add Product</h3>
        }
        else{
            return <h3 className="text-center">Update Product</h3>
        }
    }

    
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-6 offset-md-3 offset-md-3" style={{width: "18rem"}}></div>
                            {/* <h3 className="text-center">Add Product</h3> */}
                            { this.getTitle()}
                            <div className="card-header">
                                <form>
                                    <div className="form-group">
                                        <label> Product Name: </label>
                                        <input className="form-control" name="productName" placeholder="Product Name" 
                                            value={this.state.productName} onChange={this.changeProductNameHandler}/>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Product Description: </label>
                                        <input className="form-control" name="description" placeholder="Description" 
                                            value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Price: </label>
                                        <input className="form-control" name="price" placeholder="0.0" 
                                            value={this.state.price} onChange={this.changePriceHandler}/>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-success" onClick={this.saveProduct}>Save</button>
                                    <button type="submit" className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateProductComponent
