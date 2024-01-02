import React, {useState} from 'react';
import axios from 'axios';
import {useStateValue} from '../../StateProvider';
import logo from '../../assets/logo.png';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {state, dispatch} = useStateValue();

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				'http://localhost:8080/auth/login',
				{
					email: email,
					password: password,
				},
				{
					withCredentials: true,
					credentials: 'include',
				}
			);
			dispatch({
				type: 'SIGN_IN',
				email: email,
				tasks: response.data,
			});
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	const handleRegister = async () => {
		try {
			const response = await axios.post(
				'http://localhost:8080/auth/register',
				{
					email: email,
					password: password,
				},
				{
					withCredentials: true,
					credentials: 'include',
				}
			);
			dispatch({
				type: 'SET_EMAIL',
				email: email,
			});
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	return (
		<>
			<div className='flex min-h-screen items-center justify-center'>
				<div className='rounded-lg border p-6 shadow-sm'>
					<h1>
						<img
							src={logo}
							className='mb-4'
							alt=''
							width='40px'
						/>
					</h1>
					<div className='mb-4 flex flex-col'>
						<h2 className='text-2xl font-semibold tracking-tight'>Login Or Register</h2>
					</div>
					<form className='flex flex-col gap-y-4'>
						<div className='space-y-2'>
							{' '}
							<label
								className='text-sm font-medium leading-none'
								htmlFor='email'>
								Email:
							</label>
							<input
								className='w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none'
								id='email'
								placeholder='Email'
								required=''
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>{' '}
						</div>
						<label>Password</label>
						<div>
							<input
								className='w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none'
								id='password'
								placeholder='Password'
								required=''
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className='mt-4 flex flex-row gap-x-4'>
							<button
								className='rounded-md bg-black px-9 py-2 text-sm font-medium text-white'
								type='button'
								onClick={handleLogin}>
								Login
							</button>
							<button
								className='rounded-md bg-black px-9 py-2 text-sm font-medium text-white'
								type='button'
								onClick={handleRegister}>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Signin;
