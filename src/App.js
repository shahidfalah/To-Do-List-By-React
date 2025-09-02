import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList';


import { TasksProvider } from './contexts/ToDoContext';
import { ToastProvider } from './contexts/ToastContext';

import { ZmanProvider } from 'use-zman';

const translations = {
  en: {
    Title: "Today Tasks",
    Language:{
      Language:"Language",
      Kurdish:"Kurdish",
      English:"English",
      Arabic:"Arabic",
    },
    SelectMenu:{
      All:"All",
      Completed:"Completed",
      NotCompleted:"Not Completed"
    },
    newTaskText:"Add your new task",
    learnMore:{
      editTExt:'Edit',
      deleteText:"Delete"
    },
    DeleteDialog:{
      title:"Are you sure you want to delete the task?",
      content:"You can't undo the delete after completing it",
      disagree:"disagree",
      agree:"yes, delete it"
    },
    UpdateDialog:{
      titleDialog:"Update Task",
      titleLabel:"task title",
      detailsLabel:"task details",
      updateButton:"Update",
      cancelButton:"Cancel"
    },
    toastMessage:{
      updateText:"It has been successfully updated.",
      deleteText:"It has been successfully deleted.",
      createText:"It has been successfully created.",
      checkText:"It has been successfully changed."
    }
  },
  ku: {
    Title: "ئەرکەکانی ئەمڕۆ",
    Language:{
      Language:"زمان",
      Kurdish:"کوردی",
      English:"ئینگلیزی",
      Arabic:"عەرەبی",
    },
    SelectMenu:{
      All:"هەموو",
      Completed:"تەواوبوو",
      NotCompleted:"تەواو نەبوو"
    },
    newTaskText:"ئەرکە نوێیەکەت زیاد بکە",
    learnMore:{
      editTExt:'دەستکاری',
      deleteText:"سڕینەوە"
    },
    DeleteDialog:{
      title:"ئایا دڵنیایت لەوەی دەتەوێت ئەرکەکە بسڕیتەوە؟",
      content:"ناتوانیت پاش تەواوکردنی سڕینەوەکە بگەڕێنیتەوە!",
      disagree:"ناڕازیم",
      agree:"بەڵێ، بیسڕەوە"
    },
    UpdateDialog:{
      titleDialog:"نوێکردنەوەی ئەرک",
      titleLabel:"ناونیشانی ئەرک",
      detailsLabel:"وردەکاریەکانی ئەرک",
      updateButton:"نوێکردنەوە",
      cancelButton:"پاشگەزبوونەوە"
    },
    toastMessage:{
      updateText:"بەسەرکەوتوویی نوێکرایەوە.",
      deleteText:"بە سەرکەوتوویی سڕاوەتەوە.",
      createText:"بە سەرکەوتوویی پێکهێنرا.",
      checkText:"بە سەرکەوتوویی گۆڕا."
    }
  },
  ar:{
    Title:"مهام اليوم",
    Language:{
      Language:"اللغة",
      Kurdish:"الكردية",
      English:"الإنجليزية",
      Arabic:"العربية",
    },
    SelectMenu:{
      All:"الكل",
      Completed:"مكتمل",
      NotCompleted:"غير مكتمل"
    },
    newTaskText:"أضف مهمتك الجديدة",
    learnMore:{
      editTExt:'تعديل',
      deleteText:"حذف"
    },
    DeleteDialog:{
      title:"هل أنت متأكد من أنك تريد حذف المهمة؟",
      content:"لا يمكنك التراجع عن الحذف بعد إكماله",
      disagree:"لا أوافق",
      agree:"نعم، احذفه"
    },
    UpdateDialog:{
      titleDialog:"تحديث المهمة",
      titleLabel:"عنوان المهمة",
      detailsLabel:"تفاصيل المهمة",
      updateButton:"تحديث",
      cancelButton:"إلغاء"
    },
    toastMessage:{
      updateText:"تم تحديثه بنجاح.",
      deleteText:"تم حذفه بنجاح.",
      createText:"لقد تم إنشاؤه بنجاح." ,
      checkText:"لقد تم تغييره بنجاح."
    }
  }
};

function App() {
  return (
    <TasksProvider>
      <ZmanProvider translations={translations}>
        <ToastProvider>
          <ToDoList/>
        </ToastProvider>
      </ZmanProvider>
    </TasksProvider>
  );
}

export default App;
