import React, { useEffect } from 'react'
import { IItem } from '../../models/item.model';

const ItemCard = ({Item}:{Item: IItem}) => {

    return(
        <>
        
            <h1>{ Item.itemName}</h1>
            <span>{ Item.itemPrice}</span>
            <span>{ Item.itemDescription}</span>
        </>
    )
}

export default ItemCard;