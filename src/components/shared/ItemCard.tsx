import React from 'react'
import { IItem } from '../../models/item.model';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { starDeleteItem } from '../../store/actions/items.actions';
import noPicture from '../../assets/noImageAvailable.jpg';
import { CircularProgress, IconButton } from '@mui/material';

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
                    (ui.deleteLoading === item.id ) 
                    ?
                        <CircularProgress color="primary" size={30}/>
                    :
                        <IconButton aria-label="delete" size="large" onClick={ handleDelete}>
                            <DeleteIcon color='error'/>
                        </IconButton>
                }
            </div>
        </div> 
    )
}

export default ItemCard;