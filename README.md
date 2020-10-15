to run this locally first run 

npm install

then run 

node server.js

This application is running on port 4000

you can access this api at the following paths

'/add-task' -> allows you to add a new task to the collection

'/all-tasks' -> allows you to get a list of all the tasks

'/delete-task' -> allows you to delete a task with a given id

'/delete-completed' -> allows you to delete all tasks with the property active set to false

'/update-active' -> allows you to set a given tasks property from true to false or from false to true

'update-body' -> allows you to update the task property body with a new string