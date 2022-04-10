import React from 'react'
import { IItem } from '../../models/item.model'
import ItemCard from '../shared/ItemCard'
const ItemsCollection = ({ items = [], editPermission}: { items: IItem[], editPermission: boolean}) => {
    return(
        <div className='item__collection'>
            {items.map( (item: IItem) => 
                <ItemCard
                    item={ item }
                    key={ `${item.id}`}
                    editPermission={ editPermission }
                ></ItemCard>
            )}
        </div>
    )
}

export default ItemsCollection;