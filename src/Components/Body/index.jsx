import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editCompleted, setTodo } from '../../TodoSlice';
import Checkbox from '../CheckBox';
import NotFound from '../NotFound';
import './style.scss'

function Body() {

  const state = useSelector(state => state.todos)

  const dispatch = useDispatch()

  const [list,setList] = useState([])

  useEffect(() => {
    if(localStorage.getItem('todos')){
      dispatch(setTodo(JSON.parse(localStorage.getItem('todos'))))
    }
  },[dispatch])

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify([...list]));
  },[list])

  useEffect(() => {
    if(state.hideAdd){
      if(state.filter.includes('all')){
          console.log('State',state.todos)
          setList(state.todos)
      }else if(state.filter.includes('active')){
          setList(state.todos.filter(item => item.isCompleted === false))
      }else if(state.filter.includes('completed')){
          setList(state.todos.filter(item => item.isCompleted === true))
      }
  }else{
      if(state.filter.includes('all')){
          setList(state.todosSearch)
      }else if(state.filter.includes('active')){
          setList(state.todosSearch.filter(item => item.isCompleted === false))
      }else if(state.filter.includes('completed')){
          setList(state.todosSearch.filter(item => item.isCompleted === true))
      }
  }
  
  },[state.hideAdd,state.todos,state.todosSearch,state.filter])
  return (
    <ul className='list'>
    {list.map(item => (
        <li key={item.id} className={!item.isCompleted? 'list_item' : 'list_item  list_item-done'}>
            <Checkbox checked={item.isCompleted} onChange={()=> dispatch(editCompleted(item.id))}/> <span> {item.job}</span>
        </li>
       
    ))}
    {state.hideSearch && list.length === 0 && <NotFound />}
</ul>
  );
}

export default Body;
