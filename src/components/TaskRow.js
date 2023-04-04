import React, { useState } from 'react'

function TaskRow({ props }) {

  const { active, task } = props
  const { taskId, taskData } = task

  console.log(props)

  return (
    <div className={`flex h-[40px] sm:h-[60px]  p-2 rounded-lg hover:bg-gray-500 ${active === taskId ? 'bg-gray-500' : 'bg-gray-600'}`}>
      {taskData.title}
    </div>
  )
}

export default TaskRow