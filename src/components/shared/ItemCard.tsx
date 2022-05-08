import React from 'react'
import { IItem } from '../../models/item.model';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { starDeleteItem } from '../../store/actions/items.actions';
import noPicture from '../../assets/noImageAvailable.jpg';

const ItemCard = ({item, editPermission}:{item: IItem, editPermission: boolean}) => {

    const dispatch = useDispatch();

    let {auth, ui}  = useSelector((state: RootState) => {
        return state
    })

    const handleDelete = () => {
        dispatch( starDeleteItem(item,auth.uid));
    }

    return(
        <div className='item__card'>
            <div className='item__body'>
                <h1 className='item__name'>{ item.itemName}</h1>
                <span className='item__price'>$ { item.itemPrice}</span>
                <img 
                    src={item.picture || noPicture}
                    className={item.picture ? '' : 'image-filter'}
                ></img>
                <p>{ item.itemDescription}</p>
            </div>

            <div className='item__actions'>
                {editPermission &&
                    <Button 
                        colorScheme='pink'
                        onClick={ handleDelete }
                        isLoading={ ui.deleteLoading == item.id }
                    >
                        <DeleteIcon />
                    </Button>
                }
            </div>
        </div>
    )
}

export default ItemCard;