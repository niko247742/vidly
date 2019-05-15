import React from 'react';

const ListGroup = ( { valueProperty, textProperty, onItemSelect, selectedItem, items } ) => {
    return (
        <ul className="list-group">        
        {items.map((item) => 
        <li onClick = {() => onItemSelect(item) } 
            key ={item[valueProperty]} 
            className= {item === selectedItem 
                ? "list-group-item active"
                : "list-group-item" } 
            style = {{cursor: 'pointer'}}

            >{item[textProperty]}
        </li>) }          
      
      </ul>
    )
}
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;