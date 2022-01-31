import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setHideAdd, setHideSearch } from '../../TodoSlice';

function Footer() {
  const state = useSelector(state => state.todos)

  const dispatch = useDispatch()

  const handleHide = () => {
    dispatch(setHideAdd(!state.hideAdd))
    dispatch(setHideSearch(!state.hideSearch))
  }

  return (
    <div className='footer'>
    <div className='footer_left'>
      <div className='footer_icon'>
        <span className={'footer_icon' + (state.hideAdd ? ' footer_icon_default' : '')} onClick={() => handleHide()}><AddIcon /></span>
        <span className={'footer_icon' + (state.hideSearch ? ' footer_icon_default' : '')} onClick={() => handleHide()}><ManageSearchIcon/></span>
      </div>
      <span className='footer_break'>|</span>
      <div className="footer_show">
        <span>{state.todos.length} items</span>
      </div>
    </div>
    <div className='footer_end'>
      <span className={(state.filter.includes('all')?'footer_end_default' : '')} onClick={() => dispatch(setFilter('all'))}>All</span>
      <span className={(state.filter.includes('active')?'footer_end_default' : '')} onClick={() => dispatch(setFilter('active'))}>Active</span>
      <span className={(state.filter.includes('completed')?'footer_end_default' : '')} onClick={() => dispatch(setFilter('completed'))}>Completed</span>
    </div>
  </div>
  );
}

export default Footer;
