import React, {useEffect, useState} from 'react';
import Task from '../Task/Task';
import {useStateValue} from '../../StateProvider';
import axios from 'axios';
import {v4} from 'uuid';
import Logout from '../Logout/Logut';
const Tasks = () => {
	const {state, dispatch} = useStateValue();
	const [taskContent, setTaskContent] = useState('');

	const addTask = async () => {
		try {
			const taskMinified = taskContent.trim().replace(/\s+/g, ' ');

			if (taskMinified === '') {
				alert('Task cannot be empty!!');
				return;
			}
			const id = v4();
			const response = await axios.patch(
				'http://localhost:8080/update/add',
				{
					newtask: {
						id: id,
						content: taskMinified,
						pending: true,
					},
				},
				{
					withCredentials: true,
					credentials: 'include',
				}
			);
			if (response.status === 200) {
				dispatch({
					type: 'ADD_TASK',
					id: id,
					content: taskMinified,
				});
			}
			setTaskContent('');
		} catch (error) {
			console.error('Error adding task:', error);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
		  addTask();
		}
	  };

	const renderTasks = (pending) =>
		state.tasks
			.filter((task) => task.pending === pending)
			.map((item) => (
				<div
					key={item.id}
					className='task-container'>
					<Task it={item} />
				</div>
			));

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='max-w-xl rounded-lg border p-6 shadow-sm'>
				<div className='mb-8 flex flex-col'>
					<h1 className='text-2xl font-semibold tracking-tight'> {state.email} To-do's</h1>
				</div>
				<div>
					<h2 className='mb-3'>Pending: {state.tasks.filter((task) => task.pending === true).length}</h2>
					{renderTasks(true)}
				</div>
				<div>
					<h2 className='mb-3 mt-8'>Completed: {state.tasks.filter((task) => task.pending === false).length}</h2>
					{renderTasks(false)}
				</div>
				<div>
					<input
						className='w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none'
						id='add'
						required=''
						type='text'
						value={taskContent}
						onChange={(e) => setTaskContent(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder='Add a new task...'
						autoComplete='off'
					/>
				</div>
				<div className='mt-4 flex justify-between gap-x-4'>
					<button
						type='button'
						onClick={addTask}
						className='h-9 w-36 rounded-md bg-black text-sm font-medium text-white'>
						Add Task
					</button>
					<Logout />
				</div>
			</div>
		</div>
	);
};

export default Tasks;
