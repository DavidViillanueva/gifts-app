import React from 'react'
import { IItem } from '../../models/item.model'
import ItemCard from '../shared/ItemCard'
const ItemsCollection = ({ items = []}: { items: IItem[]}) => {
    return(
        <>
        {items.map( (item: IItem) => 
            <ItemCard
                Item={ item }
            ></ItemCard>
        )}
        </>
    )
}

export default ItemsCollection;