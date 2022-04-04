import React, { useEffect } from 'react'
import { IItem } from '../../models/item.model';

const ItemCard = ({Item}:{Item: IItem}) => {

    return(
        <div className='item__card'>
            <h1>{ Item.itemName}</h1>
            <span>{ Item.itemPrice}</span>
            <span>{ Item.itemDescription}</span>
        </div>
    )
}

export default ItemCard;