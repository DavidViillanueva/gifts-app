import React from 'react'
import { IItem } from '../../models/item.model'
import ItemCard from '../shared/ItemCard'
const ItemsCollection = ({ items = []}: { items: IItem[]}) => {
    return(
        <div className='item__collection'>
            {items.map( (item: IItem) => 
                <ItemCard
                    Item={ item }
                ></ItemCard>
            )}
        </div>
    )
}

export default ItemsCollection;