import React from 'react'
import { IItem } from '../../models/item.model';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { starDeleteItem } from '../../store/actions/items.actions';

const ItemCard = ({item, editPermission}:{item: IItem, editPermission: boolean}) => {

    const dispatch = useDispatch();

    let auth  = useSelector((state: RootState) => {
        return state.auth
    })

    const handleDelete = () => {
        dispatch( starDeleteItem(item,auth.uid));
    }

    return(
        <div className='item__card'>
            <div className='item__body'>
                <h1>{ item.itemName}</h1> <br />
                <span>{ item.itemPrice}</span><br />
                <span>{ item.itemDescription}</span>
            </div>

            <div className='item__actions'>
                {editPermission &&
                    <Button 
                        colorScheme='pink'
                        onClick={ handleDelete }
                    >
                        <DeleteIcon />
                    </Button>
                }
            </div>
        </div>
    )
}

export default ItemCard;