import React, { useState } from 'react';

const ProductCategoryRow = ({ category }) => {
    return (
        <tr>
            <th col-Span="2">
                {category}
            </th>
        </tr>
    );
}

const ProductRow = ({ product }) => {
    const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
        {product.name}
    </span>

    return(
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

const ProductsTable = ({ products, filterText, inStockOnly }) => {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
              filterText.toLowerCase()
            ) === -1
          ) {
            return;
          }
        if (inStockOnly && !product.stocked) {
            return;
          }
        if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow 
                category={product.category}
                key={product.category} />
        )
    }
    
    rows.push(
        <ProductRow 
          product={product}
          key={product.name} />
    );
    lastCategory = product.category;
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

const SearchBar = ({ filterText, inStockOnly, onFilterTextChange, onInStckOnlyChange}) => {
    return (
        <form>
            <input type="text" 
                placeholder="Search..." 
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}/>
            <label>
                <input type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStckOnlyChange(e.target.checked)}/>
                {' '}
                Only show products in stock.
            </label>
        </form>
    )
}

const FilterableProductTable = ({ products }) => {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar 
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={ setFilterText }
                onInStckOnlyChange={ setInStockOnly }
                />
            <ProductsTable 
                products={products} 
                filterText={filterText}
                inStockOnly={inStockOnly}
                />
        </div>
    )
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];

export default function App() {
    return <FilterableProductTable products={PRODUCTS} />
}