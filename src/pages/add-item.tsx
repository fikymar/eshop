import React, { useState } from "react";
import Loader from "../components/Loader";

const CreateItem = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [alertStatus, setAlertStatus] = useState("success");
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="w-7/8 md:w-1/2 m-auto min-h-screen flex flex-col gap-2  items-center">
      {fields && (
        <p
          className={`w-full p-4 rounded-lg text-center text-base font-bold ${
            alertStatus === "wrong" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {msg}
        </p>
      )}
      <div className="w-full py-2 rounded-lg">
        <input
          type="text"
          required
          value={title}
          placeholder="Item title"
          className="w-full text-lg placeholder:text-gray-600"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div className="w-full">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-2 border-gray-200 py-2 px-4 rounded-lg"
        >
          <option value="other" className="bg-slate-200 w-full ">
            Select category
          </option>
          <option value="men" className="bg-white">
            Men
          </option>
          <option value="women" className="bg-white capitalize">
            Women
          </option>
        </select>
      </div>
      <div className="group grid place-items-center border-2 border-gray-200 bg-slate-200 w-full h-60 md:h-80 cursor-pointer rounded-lg">
        {isLoading && <Loader />}
        {!image ? (
          <>
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer"></label>
            </label>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CreateItem;
