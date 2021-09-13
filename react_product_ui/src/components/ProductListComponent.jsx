import React, { Component } from 'react'
import ProductService from '../services/ProductService'


class ProductListComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }
    
    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({products: res.data});
        });
    }

    addProduct() {
        this.props.history.push('add-product/-1');
    }

    updateProduct(id){
        this.props.history.push(`/add-product/${id}`);
    }

    deleteProduct(id){
        ProductService.deleteProduct(id).then(res => {
            this.setState({
                products: this.state.products.filter(product => product.id != id)
            });
        });
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Product List</h1>  
                    
                    <br />
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Product Name</th>
                                    <th> Product Description </th>
                                    <th> Price </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product => 
                                        <tr key = {product.id}>
                                            <td> {product.productName} </td>
                                            <td> {product.description} </td>
                                            <td> {product.price} </td>
                                            <td className="text-center">
                                                <button onClick={() => this.updateProduct(product.id)} className="btn btn-info">Update</button>
                                                <button onClick={() => this.deleteProduct(product.id)} style={{marginLeft: "10px"}} class="btn btn-danger"><i class="far fa-eye"></i>Delete</button>
                                                
                                            </td>
                                            
                                            
                                        </tr>

                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    
                    <button type="button" className="btn btn-primary" onClick={this.addProduct}>Add Product</button>
                    
            </div>
        )
    }
}

export default ProductListComponent