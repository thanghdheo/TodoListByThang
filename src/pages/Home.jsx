import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup } from 'reactstrap';
import Body from '../Components/Body';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import InputAdd from '../Components/InputAdd';
import { setInput,addTodo, search, setTodoSearch } from '../TodoSlice';
import { v4 as uuidv4 } from 'uuid';
import './style.scss'
import InputSearch from '../Components/InputSearch';

function Home() {
  const dispatch = useDispatch()

  const todoState = useSelector(state => state.todos)

  const handleSubmit =  e => {
    e.preventDefault()

    dispatch(addTodo({
      id: uuidv4(),
      job: todoState.todoInput.trim(),
      isCompleted : false
    }))

    dispatch(setInput(''))
  }

  useEffect(() => {
    dispatch(setTodoSearch())
  },[todoState.todos])

  return(
    <div className='home'>
      <div className='home_phone'>
        <Header/>
        <Form className='home_form' onSubmit={ e => todoState.hideAdd? handleSubmit(e) : e.preventDefault()}>
          <FormGroup>
            {todoState.hideAdd && 
                <InputAdd
                value= {todoState.todoInput}
                placeholder='Add new job .....'
                onChange={ e => {dispatch(setInput(e.target.value))}}/>
            }
            {todoState.hideSearch && 
              <InputSearch 
                placeholder = 'Search....' 
                onChange = {e => {
                  dispatch(search(e.target.value))
                }}/>
            }            
              
          </FormGroup>
        </Form>
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
