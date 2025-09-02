import * as React from 'react';
import Card from '@mui/material/Card';

import { useTasks } from '../contexts/ToDoContext';
import { useToast } from '../contexts/ToastContext';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import LearnMore from "./LearnMore"
import Typography from '@mui/material/Typography';
import "../styles/ToDoListStyle.css"

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Task({ task ,handleClickOpenUpdateDialog, handleClickOpenDeleteDialog }){
    const {tasks, dispatch}=useTasks()
    const [isChecked,setIsChecked]=React.useState(task.isCompleted)
    const { showHideToast }=useToast()

    function handleOnClickCheckButton(){
        // let updateTask=tasks.map((t)=>{
        //   if(t.id==task.id){
        //     t.isCompleted=!t.isCompleted
        //     setIsChecked(t.isCompleted)
        //   }
        //   return t
        // })
        // // setTasks(updateTask)
        // localStorage.setItem("tasks",JSON.stringify(updateTask))
        const action ={
            type:"isChecked",
            payload:{
                task:task
            }
        }

        dispatch(action)
        showHideToast("checkText")

        tasks.map((t)=>{
            if(t.id === task.id){
                setIsChecked(t.isCompleted)
            }
            return t
        })
    }

    return (
        <>
            <Card elevation={0} sx={{ minWidth: 275 }} className='Card-style' style={{}}>
                <CardContent sx={{display:"flex"}}>
                    <Checkbox {...label} checked={isChecked} style={{color:"red"}} onClick={handleOnClickCheckButton}/>
                    <div>
                        <Typography variant="h6">
                            {task.title}
                        </Typography>
                        <Typography variant="p">
                            {task.details}
                        </Typography>
                    </div>
                    
                </CardContent>
                <CardActions>
                    <LearnMore taskInfo={task} handleClickOpenUpdateDialog={handleClickOpenUpdateDialog} handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}/>
                </CardActions>
            </Card>
        </>
        
    );
}
