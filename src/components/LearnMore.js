import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';

import { useTasks } from '../contexts/ToDoContext';

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

import { useZman } from "use-zman";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function CustomizedMenus({ taskInfo,handleClickOpenUpdateDialog, handleClickOpenDeleteDialog }) {
  const {tasks, dispatch}=useTasks()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { texts,currentZman } = useZman();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // //==== deleting logic ====//
  // const [openDelete, setOpenDelete] = React.useState(false);

  // const handleClickOpenDeleteDialog = () => {
  //   setOpenDelete(true);
  // };

  // const handleCloseDeleteDialog = () => {
  //   setOpenDelete(false);
  // };
  // const handleDeleteTask = () => {
  //   const updatingTasks=tasks.filter( task => task.id !== taskInfo.id)
  //   setTasks(updatingTasks);
  //   localStorage.setItem("tasks",JSON.stringify(updatingTasks))
  //   setOpenDelete(false);
  // };
  // //====/ deleting logic /====//

  // //==== updating logic ====//
  // const [openUpdate, setOpenUpdate] = React.useState(false);
  // const [updateData, setUpdateData] = React.useState({title:taskInfo.title,details:""});

  // const handleClickOpenUpdateDialog = () => {
  //   setOpenUpdate(true);
  // };

  // const handleCloseUpdateDialog = () => {
  //   setOpenUpdate(false);
  // };
  // const handleUpdateTask = () => {
  //   const updatingTasks=tasks.map( task => {
  //     if(task.id === taskInfo.id){
  //       task.title=updateData.title
  //       task.details=updateData.details
  //     }
  //     return task
  //   })
  //   setTasks(updatingTasks);
  //   localStorage.setItem("tasks",JSON.stringify(updatingTasks))
  // };
  // //====/ updating logic /====//
  return (
    <div>

      <IconButton aria-label="learn more" style={{color:"text.primary"}}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <MoreHorizIcon />
      </IconButton>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleClickOpenUpdateDialog(taskInfo)}} disableRipple>
          <EditIcon sx={{margin: "0 12px"}}/>
          {texts.learnMore.editTExt}
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={()=>{handleClickOpenDeleteDialog(taskInfo)}} disableRipple>
          <DeleteIcon sx={{margin: "0 12px"}}/>
          {texts.learnMore.deleteText}
        </MenuItem>

      </StyledMenu>




    </div>
  );
}





        
{/* <MenuItem onClick={handleClose} disableRipple>
    <FileCopyIcon />
    Duplicate
</MenuItem> */}
{/* <MenuItem onClick={handleClose} disableRipple>
    <ArchiveIcon />
    Archive
</MenuItem> */}
{/* <MenuItem onClick={handleClose} disableRipple>
    <MoreHorizIcon />
    More
</MenuItem> */}