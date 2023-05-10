import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { saveMessage } from '../utils/firebaseFunctions';
import Button from './button';
import { AnimatePresence, motion } from 'framer-motion';
import { IContactInput } from '../constants/models';

export const Input = ({ title, name, errorText, placeholder, textarea, onChange }: IContactInput) => {
	return (
		<div className="mb-5">
			<label htmlFor={name} className="mb-3 block text-base font-medium">
				{title}
			</label>
			{!textarea ? (
				<input
					type="text"
					id={name}
					name={name}
					className="w-full rounded border border-gray-300 py-1 px-3 text-base leading-8 outline-none transition-colors duration-200 ease-in-out focus:border-pink-500 dark:bg-zinc-600 dark:placeholder:text-slate-300"
					onChange={onChange}
					placeholder={placeholder}
				/>
			) : (
				<textarea
					rows={4}
					id={name}
					name={name}
					className="h-32 w-full resize-none rounded border border-gray-300  py-1 px-3 text-base leading-6  outline-none transition-colors duration-200 ease-in-out focus:border-pink-500 dark:bg-zinc-600 dark:placeholder:text-slate-300"
					onChange={onChange}
					placeholder={placeholder}
				></textarea>
			)}

			{errorText && <p className="mt-1 text-sm text-red-500">{errorText}</p>}
		</div>
	);
};

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		msg: '',
	});
	const [formErrors, setFormErrors] = useState({
		name: '',
		email: '',
		msg: '',
	});
	const [toggleModal, setToggleModal] = useState(false);
	const [submitBtnText, setSubmitBtnText] = useState('Send');

	const handleInputChange = (e: BaseSyntheticEvent) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setFormErrors({ ...formErrors, [name]: '' });
	};

	const clearForm = () => {
		setFormData({
			name: '',
			email: '',
			msg: '',
		});
		setFormErrors({
			name: '',
			email: '',
			msg: '',
		});
	};

	const toggleContactModal = () => {
		if (!toggleModal) {
			setToggleModal(true);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else setToggleModal(false);
	};

	const submit = React.useCallback(async () => {
		setSubmitBtnText('Sending...');
		try {
			if (!formData.name || !formData.email || !formData.msg) {
				if (!formData.name) {
					setFormErrors({ ...formErrors, name: 'Name is required' });
					setSubmitBtnText('Fill required fields');
				}
				if (!formData.email) {
					setFormErrors({ ...formErrors, email: 'Email is required' });
					setSubmitBtnText('Fill required fields');
				} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
					setFormErrors({ ...formErrors, email: 'Email is not valid' });
					setSubmitBtnText('Fill your email');
				}
				if (!formData.msg) {
					setFormErrors({ ...formErrors, msg: 'Message is required' });
					console.log(formData);
					setSubmitBtnText('Fill required fields');
				}
			} else {
				console.log(formData);
				const data = { ...formData, id: `${Date.now()}` };
				console.log(data);
				saveMessage(data);
				clearForm();
				setSubmitBtnText('Message sent succesfully!');
			}
		} catch (error) {
			console.error(error);
			setSubmitBtnText('Error occured');
		}
	}, [formData, formErrors]);

	return (
		<>
			<div className="z-30">
				{toggleModal ? (
					<div className="absolute top-20 w-full max-w-lg rounded-lg border bg-white shadow-xl  dark:bg-zinc-500 md:right-4">
						<div className="flex items-center justify-between rounded-t-lg bg-pink-500 py-4 px-9 dark:bg-yellow-500">
							<h3 className="text-xl font-bold text-white">Contact us</h3>
							<button onClick={() => toggleContactModal()} className="text-white dark:bg-yellow-500">
								<svg width="17" height="17" viewBox="0 0 17 17" className="fill-current">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z"
									/>
								</svg>
							</button>
						</div>
						<form className="py-6 px-9">
							<Input
								placeholder="John Smith"
								title="Name"
								errorText={formErrors.name}
								name="name"
								onChange={handleInputChange}
							/>
							<Input
								placeholder="example@domain.com"
								title="Email"
								name="email"
								errorText={formErrors.email}
								onChange={handleInputChange}
							/>
							<Input
								placeholder="What do you want to tell us..."
								title="Message"
								name="msg"
								errorText={formErrors.msg}
								textarea
								onChange={handleInputChange}
							/>

							<div className="flex w-full flex-col items-center p-2">
								<Button
									bgColor="bg-pink-500 dark:bg-yellow-500"
									value={submitBtnText}
									onClick={submit}
								></Button>
							</div>
						</form>
						<div className=" w-full border-t border-gray-200 p-2 pt-2 text-center">
							<a className="text-sky-500">shopiik@email.com</a>
							<p className="my-5 leading-normal">
								111 Pretty St.
								<br />
								Code Town, MN 10100
							</p>
							<span className="inline-flex gap-2">
								<a className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:scale-110">
									<svg
										fill="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="h-5 w-5"
										viewBox="0 0 24 24"
									>
										<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
									</svg>
								</a>
								<a className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:scale-110">
									<svg
										fill="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="h-5 w-5"
										viewBox="0 0 24 24"
									>
										<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
									</svg>
								</a>
								<a className=" cursor-pointer rounded-full bg-sky-500 p-2 transition hover:scale-110">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="h-5 w-5"
										viewBox="0 0 24 24"
									>
										<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
										<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
									</svg>
								</a>
							</span>
						</div>
					</div>
				) : null}

				{/* Toggle Contact Form  Button */}
				<div className="fixed right-4 bottom-4 flex items-center justify-end space-x-5 ">
					<button
						className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-pink-500 text-white shadow-xl dark:bg-yellow-500 md:h-[64px] md:w-[64px]"
						onClick={() => toggleContactModal()}
					>
						<AnimatePresence>
							{toggleModal ? (
								<motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
									<svg
										width="17"
										height="17"
										viewBox="0 0 17 17"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z"
											fill="white"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z"
											fill="white"
										/>
									</svg>
								</motion.span>
							) : (
								<motion.span className="">
									<svg
										width="28"
										height="28"
										viewBox="0 0 28 28"
										fill="none"
										className="h-5 w-5 md:h-7 md:w-7"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M19.8333 14.0002V3.50016C19.8333 3.19074 19.7103 2.894 19.4915 2.6752C19.2728 2.45641 18.976 2.3335 18.6666 2.3335H3.49992C3.1905 2.3335 2.89375 2.45641 2.67496 2.6752C2.45617 2.894 2.33325 3.19074 2.33325 3.50016V19.8335L6.99992 15.1668H18.6666C18.976 15.1668 19.2728 15.0439 19.4915 14.8251C19.7103 14.6063 19.8333 14.3096 19.8333 14.0002ZM24.4999 7.00016H22.1666V17.5002H6.99992V19.8335C6.99992 20.1429 7.12284 20.4397 7.34163 20.6585C7.56042 20.8772 7.85717 21.0002 8.16659 21.0002H20.9999L25.6666 25.6668V8.16683C25.6666 7.85741 25.5437 7.56066 25.3249 7.34187C25.1061 7.12308 24.8093 7.00016 24.4999 7.00016Z"
											fill="white"
										/>
									</svg>
								</motion.span>
							)}
						</AnimatePresence>
					</button>
				</div>
			</div>
		</>
	);
};

export default ContactForm;
