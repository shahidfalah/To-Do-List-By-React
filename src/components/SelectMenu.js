import React,{ useEffect} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useTasks } from '../contexts/ToDoContext';

import { useZman } from "use-zman";

export default function SelectMenu({ handleFilterTasks,newTaskType }){
    const [typeItem, setTypeItem] = React.useState('All');
    const {tasks, dispatch}=useTasks()
    
    const { texts } = useZman();
    useEffect(()=>{
      if(newTaskType){
        const event={
          target:{
            value:newTaskType
          }
        }
        handleChange(event)
      }
    },[tasks])
    
    const handleChange = (event) => {
      const selectedType = event.target.value;
      setTypeItem(selectedType);
      handleFilterTasks(selectedType);
    };
    
    
    return(
        <FormControl
        sx={{
          m: 1,
          // minWidth: 100,
          backgroundColor: 'background.default',
          borderRadius: 0,
          '& .MuiInputBase-root': {
            borderRadius: 0,
            fontSize: '0.75rem',
            padding: '2px 8px',
            color: 'text.primary',
            borderColor: 'text.primary',
            borderBottom: '1px solid #6c6c6c', // White bottom border
            borderLeft: 'none', // No left border
            borderRight: 'none', // No right border
            borderTop: 'none', // No top border
          },
        }}
        size="small"
      >
        <Select
          value={typeItem} // This will determine the selected item
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            color: 'text.primary',
            backgroundColor: 'background.default', // Dark background for the Select input
            fontWeight:"600",
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.primary', // White border
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none', // No border on hover
            },
            '& .MuiSelect-icon': {
              backgroundColor: 'background.default',
              color: 'text.primary', // White dropdown arrow
              border: 'none',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#222', // Dark background for the entire menu list
                borderRadius: '0px 0px 8px 8px', // Remove top border radius, keep bottom rounded
                padding: '0px',
                margin: '0px',
                '& .MuiList-root': {
                  padding: '0px', // Remove padding from the list
                },
              },
            },
          }}
        >
          <MenuItem
            value="All" // Ensure this value matches the default state value
            sx={{ fontSize: "0.7rem",fontWeight:"600", color: 'text.primary', backgroundColor: 'background.default', '&:hover': { backgroundColor: 'primary.main' } }}
          >
            {texts.SelectMenu.All}
          </MenuItem>

          <MenuItem
            value='Done'
            sx={{ fontSize: "0.7rem",fontWeight:"600", color: 'text.primary', backgroundColor: 'background.default', '&:hover': { backgroundColor: 'primary.main' } }}
          >
            {texts.SelectMenu.Completed}
          </MenuItem>
          
          <MenuItem
            value='Not Done'
            sx={{ fontSize: "0.7rem",fontWeight:"600", color: 'text.primary', backgroundColor: 'background.default', '&:hover': { backgroundColor: 'primary.main' } }}
          >
            {texts.SelectMenu.NotCompleted}
          </MenuItem>
        </Select>
      </FormControl>
    );
}
// const handleFilterTasks=()=>{
    //   if(typeItem==="Done"){
    //     setTasksJSX(tasks.map((t) => {
    //       if(t.isCompleted===true){
    //         return <Task key={t.id} task={t}/>
    //       }
    //     }))
    //   }else if(typeItem==="Not Done"){
    //     setTasksJSX(tasks.map((t) => {
    //       if(t.isCompleted===false){
    //         return <Task key={t.id} task={t}/>
    //       }
    //     }))
    //   }else{
    //     setTasksJSX(tasks.map((t) => {
    //       return <Task key={t.id} task={t}/>
    //     }))
    //   }
    // }