import { setPersistence } from '@firebase/auth';
import Image from 'next/image';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import { storage } from '../firebase.config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Tooltip } from '@nextui-org/react';
import { saveItem } from '../utils/firebaseFunctions';
import { ImageIcon } from '../constants/icons';
import Button from '../components/button';

const CreateItem = () => {
	const [img, setImg] = useState<any>(null);
	const [category, setCategory] = useState('');
	const [alertStatus, setAlertStatus] = useState('success');
	const [msg, setMsg] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState<string | number>(0);
	const [fields, setFields] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const uploadImg = (e: any) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		console.log(imageFile);
		const storageRef = ref(storage, `imgs/${Date.now()}-${imageFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				console.error(error);
				setFields(true);
				setMsg('⚠️ Something went wrong while uploading your image, please try again!');
				setAlertStatus('danger');
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImg(downloadURL);
					setIsLoading(false);
					setFields(true);
					setMsg('Image uploaded to database 👍');
					setAlertStatus('success');
					setTimeout(() => {
						setFields(false);
					}, 4000);
				});
			},
		);
	};

	const deleteImg = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, img);
		deleteObject(deleteRef).then(() => {
			setImg(null);
			setIsLoading(false);
			setFields(true);
			setMsg('Image deleted from the database 👍');
			setAlertStatus('warning');
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};

	const clearData = () => {
		setTitle('');
		setImg(null);
		setDescription('');
		setPrice(0);
		setCategory('Select Category');
	};

	const submit = () => {
		setIsLoading(true);
		try {
			if (!title || !description || !price || !img) {
				setFields(true);
				setMsg('All required fields must be fullfilled');
				setAlertStatus('danger');
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			} else {
				const data = {
					id: `${Date.now()}`,
					title: title,
					imgURL: img,
					category: category,
					description: description,
					price: price,
				};
				saveItem(data);
				setIsLoading(false);
				setFields(true);
				setMsg('Data uploaded succesfully to database 👍');
				clearData();
				setAlertStatus('success');
				setTimeout(() => {
					setFields(false);
				}, 4000);
			}
		} catch (error) {
			console.error(error);
			setFields(true);
			setMsg('⚠️ Something went wrong while uploading your data, please try again!');
			setAlertStatus('danger');
			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000);
		}
	};

	return (
		<form className="m-auto flex min-h-screen w-full flex-col items-center gap-2 px-4 xl:w-1/2">
			{fields && (
				<p
					className={`w-full rounded-lg bg-slate-200 p-4 text-center text-base  ${
						alertStatus === 'danger' ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{msg}
				</p>
			)}
			<input
				type="text"
				className="mb-4 flex h-full w-full items-center gap-2 border-b-2 border-zinc-800 bg-transparent py-2 px-4 text-lg outline-none placeholder:text-stone-500 focus:border-pink-500 dark:border-slate-200 dark:placeholder:text-zinc-100 "
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Item title"
			/>

			<div className="group grid h-60 w-full cursor-pointer place-items-center rounded-lg border-2 border-gray-200 bg-slate-100 dark:bg-slate-300 md:h-80">
				{isLoading ? (
					<Loader />
				) : (
					<>
						{!img ? (
							<>
								<label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
									<div className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-500 hover:text-gray-700">
										{ImageIcon}
										<p className="">Upload image</p>
									</div>
									<input
										type="file"
										name="uploading"
										accept="image/*"
										onChange={uploadImg}
										className="h-0 w-0"
									/>
								</label>
							</>
						) : (
							<>
								<div className="relative flex h-full w-full ">
									<Image src={img} alt="upload image" className="h-full w-full object-cover" fill />

									<Tooltip
										className="absolute left-1/2 right-1/2 bottom-5 -translate-x-1/2"
										content={'Delete this image'}
										rounded
										color="error"
										placement="bottom"
									>
										<button className="" onClick={deleteImg}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="mx-auto flex h-8 w-8 items-center text-red-500"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>
									</Tooltip>
								</div>
							</>
						)}
					</>
				)}
			</div>

			<div className="flex w-full flex-col items-center gap-3 md:flex-row">
				<input
					value={description}
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description"
					className="mb-4 flex h-full w-full items-center gap-2 border-b-2 border-zinc-800 bg-transparent py-2 px-4 text-lg outline-none placeholder:text-stone-500 focus:border-pink-500 dark:border-slate-200 dark:placeholder:text-zinc-100"
				/>

				<input
					type="text"
					placeholder="Price"
					onChange={(e) => setPrice(e.target.value)}
					className="mb-4 flex h-full w-full items-center gap-2 border-b-2 border-zinc-800  bg-transparent py-2 px-4 text-lg outline-none placeholder:text-stone-500 focus:border-pink-500 dark:border-slate-200 dark:placeholder:text-zinc-100"
				/>
			</div>
			<div className="my-4 w-full">
				<select
					onChange={(e) => setCategory(e.target.value)}
					className=" w-full appearance-none border-0 border-b-2 border-zinc-800 bg-transparent py-2.5 px-4 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-slate-200 "
					id="category"
				>
					<option value="other" className="dark:text-zinc-500">
						Select category
					</option>

					<option value="men" className="font-bold capitalize dark:text-zinc-500">
						Men ♂️
					</option>
					<option value="women" className="font-bold capitalize dark:text-zinc-500">
						Women ♀️
					</option>
					<option value="women" className="font-bold capitalize dark:text-zinc-500">
						Kids 👶
					</option>
				</select>
			</div>

			<Button bgColor="bg-pink-500" onClick={submit} value="Submit"></Button>
		</form>
	);
};

export default CreateItem;
