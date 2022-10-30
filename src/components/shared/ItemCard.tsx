import React from 'react'
import { IItem } from '../../models/item.model';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { starDeleteItem, startToggleMark } from '../../store/actions/items.actions';
import noPicture from '../../assets/noImageAvailable.jpg';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditItem from './EditItem';

const ItemCard = ({item, editPermission}:{item: IItem, editPermission: boolean}) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    let {auth, ui}  = useSelector((state: RootState) => {
        return state
    })

    const handleDelete = () => {
        dispatch( starDeleteItem(item,auth.uid));
    }

    const handleMark = () => {
        dispatch( startToggleMark(item,auth.uid) );
    }

    return(
        <div className={item.itemMark ? 'item__card item__cardMark' : 'item__card'} >
            <div className='item__body'>
                <h1 className='item__name'>{ item.itemName}</h1>
                <span className='item__price'>
                    {item.itemMark ?
                        t('labels.productMark')
                        :
                        `$ ${item.itemPrice}`
                    }
                </span>
                <img 
                    src={item.picture || noPicture}
                    className={item.picture ? '' : 'image-filter'}
                    alt="item"
                ></img>
                <p>{ item.itemDescription}</p>
            </div>
                <div className='item__actions'>
                    {editPermission &&
                        <>
                            {(ui.deleteLoading === item.id ) 
                                ?
                                    <CircularProgress color="primary" size={30}/>
                                :
                                <> 
                                    <Tooltip title={t('labels.delete') || ''}>
                                        <IconButton aria-label="delete" size="large" onClick={ handleDelete }>
                                            <DeleteIcon color='error'/>
                                        </IconButton>
                                    </Tooltip>
                                    {(!item.itemMark) && 
                                        <EditItem item={item} />
                                    }
                                    <Tooltip 
                                        title={
                                            (!item.itemMark) ?
                                                t('labels.productMark') || ''
                                            :
                                                t('labels.productNoMark') || ''
                                        }
                                    >
                                        <IconButton aria-label="checked" size="large" onClick={ handleMark }>
                                            {(!item.itemMark) ?
                                                <CheckIcon color='success'/>
                                            :
                                                <CloseIcon color='error'/>
                                            }
                                        </IconButton>
                                    </Tooltip>
                                    
                                </>
                            }
                        </>
                    }
                    {item?.itemStore &&
                        <Tooltip title={t('labels.store') || ''}>
                            <a href={item?.itemStore} target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="store" size="large">
                                    <PublicIcon color='success'/>
                                </IconButton>
                            </a>
                        </Tooltip>
                    }
                </div>
        </div> 
    )
}

export default ItemCard;