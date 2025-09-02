import '../styles/ToDoListStyle.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useState,useEffect,useMemo } from "react"
// import Container from '@mui/material/Container';
import { Container, Divider, Typography, InputLabel, FormControl, NativeSelect, Box, InputBase,Fab,Button,TextField  } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import { alpha, styled } from '@mui/material/styles';

import Task from './Task';
import SelectMenu from './SelectMenu';

import { useTasks } from '../contexts/ToDoContext';
import { useToast } from '../contexts/ToastContext';
import { useZman } from "use-zman";
// import { v4 as uuidv4 } from 'uuid';
// import tasksReducer from '../reducers/tasksReducer'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue for primary color
    },
    background: {
      default: '#222', // Dark background color
      // paper: '#1e1e1e',   // Paper background color
    },
    text: {
      primary: '#fff',    // White text
      secondary: '#b0bec5', // Greyish text
    },
    typography: {
      fontFamily:{
        en:'Roboto, sans-serif',
        kr:'Alexandria',
        ar:'Alexandria',
      }, // Default font for English
    },
  },

});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#222',
    border: '1px solid',
    borderColor: '#222',
    fontSize: 16,
    width: '100% !important', // Force it to take full width
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#2a2a2a',
      borderColor: '#000',
    }),
  },
}));

export default function ToDoList(){
  const { texts, setZman, currentZman } = useZman();
  const [titleInput,setTitleInput]=useState('')

  const {tasks, dispatch}=useTasks()

  const { showHideToast }=useToast()
  const [changeTypesTaskWhenNewTask,setChangeTypesTaskWhenNewTask]=useState('All')

  
  //========== ON REFRESH ==========//
  useEffect(() => {dispatch({type:"OnRefresh"})}, []);
  //==========/ ON REFRESH /==========//


  //========== ON CLICK ADD BUTTON CREATE TASK ==========//
  function handleSetTitleInput(){
    const action ={
      type:"createNewTask",
      payload:{
        title:titleInput
      }
    }
    dispatch(action)
    setTitleInput('');
    setChangeTypesTaskWhenNewTask('All')
    showHideToast("createText")
  }
  //==========/ ON CLICK ADD BUTTON CREATE TASK /==========//


  //========== ON SELECTING TYPE FILTERING THE TASKS ==========//

  // COMPLETE TASK
  const completedTask =useMemo(()=>{
    return (tasks?.filter(t => t.isCompleted)) ?? [];
  },[tasks]);

  // NOT COMPLETE TASK
  const NotCompletedTask = useMemo(()=>{
    return (tasks?.filter(t => !t.isCompleted)) ?? [];
  },[tasks]);

  // ALL TASKS
  const [tasksToBeRender,setTasksToBeRender]=useState(tasks)
  useEffect(()=>{
    setTasksToBeRender(tasks)
  },[tasks])

  // FILTERING TASK
  function handleFilterTasks(typeItem){
    console.log(typeItem)
    if(typeItem==="Done"){
      setTasksToBeRender(completedTask)
    }else if(typeItem==="Not Done"){
      setTasksToBeRender(NotCompletedTask)
    }else{
      setTasksToBeRender(tasks)
    }
  }
  //==========/ ON SELECTING TYPE FILTERING THE TASKS /==========//

  
  //========== CHANGING FONT FAMILY ==========//
  let customFontFamily ;
  if(currentZman!=="en"){
    document.documentElement.lang= "ar";
    customFontFamily = "Alexandria, sans-serif";
  }else{
    document.documentElement.lang= "en";
    customFontFamily = "Roboto, sans-serif"; 
  }
  //==========/ CHANGING FONT FAMILY /==========//

  
  function handleLanguage(e){
    setZman(e.target.value)
  }

  // REISPOSIBLE
  let sizeView=9
  if(window.innerWidth>=800){
    sizeView=10
  }


  //========== DELETING LOGIC ==========//
  const [specificTaskDelete,setSpecificTaskDelete]=useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDeleteDialog = (taskInfo) => {
    console.log(taskInfo)
    setSpecificTaskDelete(taskInfo)
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };
  const handleDeleteTask = () => {
    const action ={
      type:"deletingTask",
      payload:{
        specificTask:specificTaskDelete
      }
    }
    dispatch(action)
    setOpenDelete(false);
    showHideToast("deleteText")
  };
  //==========/ DELETING LOGIC /==========//


  //========== UPDATING LOGIC ==========//
  const [specificTaskUpdate,setSpecificTaskUpdate]=useState(null);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updateData, setUpdateData] = React.useState({title: specificTaskUpdate,details:""});

  const handleClickOpenUpdateDialog = (taskInfo) => {
    setUpdateData(taskInfo)
    setSpecificTaskUpdate(taskInfo)
    setOpenUpdate(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false);
  };
  const handleUpdateTask = () => {
    const action ={
      type:"updatingTask",
      payload:{
        specificTask:specificTaskUpdate,
        updateData:updateData
      }
    }
    dispatch(action)
    showHideToast("updateText")

    // const updatingTasks=tasks.map( task => {
    //   if(task.id === specificTaskUpdate.id){
    //     task.title=updateData.title
    //     task.details=updateData.details
    //   }
    //   return task
    // })
    // setTasks(updatingTasks);
    // localStorage.setItem("tasks",JSON.stringify(updatingTasks));
  };
  //==========/ UPDATING LOGIC /==========//


  // THE TASKS THAT WILL DISPLAYED
  const tasksJSX=(tasksToBeRender?.map((t) => {
    return <Task key={t.id} task={t} handleClickOpenUpdateDialog={handleClickOpenUpdateDialog} handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}/>
  })) ?? [];

    return(
      <ThemeProvider theme={darkTheme}>
        <Container maxWidth="sm" >
          <Grid container spacing={0}>
            {/* ========== TITLE (TODAYS TASK) ========== */}
            <Grid item size={ sizeView} >
              <Typography variant="h5" sx={{marginTop:2,fontFamily:customFontFamily }}>
                {texts.Title}
              </Typography>
            </Grid>
            {/* ==========/ TITLE (TODAYS TASK) /========== */}

            {/* ========== SELECTING LANGUAGE ========== */}
            <Grid item size={2}>
              <Box>
                <FormControl 
                  sx={{
                    // m: 1,
                    // minWidth: "auto",
                    fontWeight:"600",
                    marginTop: "1rem",
                    backgroundColor: 'background.default',
                    borderRadius: 0,
                    border:"none !important",
                    '& .MuiInputBase-root': {
                      borderRadius: 0,
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      color: 'text.primary',
                      borderColor: 'text.primary',
                      borderBottom: 'none', // White bottom border
                      borderLeft: 'none', // No left border
                      borderRight: 'none', // No right border
                      borderTop: 'none', // No top border
                    },
                  }}
                  size="small"
                >
                  <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{fontWeight:"600"}}>
                    {texts.Language.Language}
                  </InputLabel>

                  <NativeSelect
                    value={currentZman}
                    onChange={(e) => handleLanguage(e)}
                    sx={{
                      fontWeight:"600",
                      width:"100px",
                      border:"none !important",
                      '&:before': {
                        borderBottom: "none !important", // Remove the default bottom border
                      },
                      '&:after': {
                        borderBottom: "none !important", // Also remove focus border
                      },
                      '.MuiNativeSelect-root': {
                        border: "none", // Make sure there's no border on the select itself
                      },
                      '& .MuiInput-underline:before': {
                        borderBottom: "none !important", // Target the underline before pseudo-element
                      },
                      '& .MuiInput-underline:after': {
                        borderBottom: "none !important", // Target the underline after pseudo-element
                      },
                    }}
                    defaultValue={30}
                    inputProps={{
                      name: 'language',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value="en" style={{fontWeight:"600"}}>{texts.Language.English}</option>
                    <option value="ku" style={{fontWeight:"600"}}>{texts.Language.Kurdish}</option>
                    <option value="ar" style={{fontWeight:"600"}}>{texts.Language.Arabic}</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </Grid>
            {/* ==========/ SELECTING LANGUAGE /========== */}
          </Grid>


          <Divider sx={{ my: 0.6 ,borderColor: "#a5a5a587 !important"}}/>
          
          {/* ========== SECTION OF CREATING NEW TASK ========== */}
          <Grid container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:"100%"
            }}
          >
            {/* ADD BUTTON */}
            <Grid size={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: '48px', // Make it square (set the width)
                height: '48px', // Ensure height equals width for square
              }}>
              <Fab
                size='small' 
                color="error" 
                aria-label="add" 
                sx={{borderRadius:"8% !important"}} 
                onClick={handleSetTitleInput}
                disabled={titleInput.length===0}
              >
                <AddIcon />
              </Fab>
            </Grid>

            {/* INPUT */}
            <Grid size={10} > 

              <BootstrapInput 
                fullWidth  
                placeholder={texts.newTaskText} 
                id="bootstrap-input" 
                value={titleInput} 
                onChange={(e)=>{setTitleInput(e.target.value)}}
              />
            {/* </FormControl> */}
            </Grid>
          </Grid>
          {/* ========== / SECTION OF CREATING NEW TASK  / ========== */}

          
          {/* ========== SELECTING TYPE OF TASKS ========== */}
          <SelectMenu handleFilterTasks={handleFilterTasks} newTaskType={changeTypesTaskWhenNewTask}/>
          {/* ==========/ SELECTING TYPE OF TASKS /========== */}


          {/* ========== TASKS ========== */}
          {tasksJSX}
          {/* ==========/ TASKS /========== */}

        </Container>

        {/* ===== DELETE DIALOG ===== */}
        <Dialog
          open={openDelete}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {texts.DeleteDialog.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {texts.DeleteDialog.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={handleCloseDeleteDialog}>
              {texts.DeleteDialog.disagree}
            </Button>
            <Button onClick={handleDeleteTask} autoFocus>
              {texts.DeleteDialog.agree}
            </Button>

          </DialogActions>
        </Dialog>
        {/* =====/ DELETE DIALOG /===== */}

        {/* ===== UPDATE DIALOG ===== */}
        <Dialog
          open={openUpdate}
          onClose={handleCloseUpdateDialog}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleCloseUpdateDialog();
            },
          }}
        >
          <DialogTitle>{texts.UpdateDialog.titleDialog}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              value={updateData.title}
              margin="dense"
              id="name"
              name="title"
              label={texts.UpdateDialog.titleLabel}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e)=> {setUpdateData({...updateData,title:e.target.value})}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="content"
              label={texts.UpdateDialog.detailsLabel}
              type="text"
              fullWidth
              variant="standard"
              value={updateData.details}
              onChange={(e)=> {setUpdateData({...updateData,details:e.target.value})}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog}>{texts.UpdateDialog.cancelButton}</Button>
            <Button type="submit" onClick={handleUpdateTask}>{texts.UpdateDialog.updateButton}</Button>
          </DialogActions>
        </Dialog>
        {/* =====/ UPDATE DIALOG /===== */}
    </ThemeProvider>
  )
}