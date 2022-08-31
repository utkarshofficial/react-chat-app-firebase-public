import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";

const style = {
  input: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`,
  error: `border-red-500`,
};

const SetProfile = () => {
  const [imgSrc, setImgSrc] = React.useState(
    "https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
  );

  const [step, setStep] = React.useState(1);
  const [phNumber, setPhNumber] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const handleInputImage = (e) => {
    setImgSrc(window.URL.createObjectURL(e.target.files[0]));
  };
  const errorClass =
    phNumber.length !== 10 && phNumber !== "" ? `${style.error}` : ``;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phNumber.length !== 10) return;
    // ! Firebase set documnet
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, `${auth.currentUser.email}`), {
      number: phNumber,
      name: fullName,
    });
  };

  const Form = (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 mt-4"
    >
      <div className="items-center flex flex-col mb-2 aling-center">
        <img
          className="text-cetner mb-4 h-[100px] w-[100px] border rounded-[50%] overflow-hidden"
          src={imgSrc}
          alt=""
        />
        <label
          className="bloc text-center text-gray-700 text-sm font-bold mb-2"
          htmlFor="fileInput"
        >
          Profile
        </label>
        <input
          className={style.input}
          id="fileInput"
          type="file"
          required
          accept="image/*"
          onInput={handleInputImage}
        />
      </div>
      <div className="mb-1">
        <label
          className="block text-gray-700 text-start text-sm font-bold mb-2"
          htmlFor="fullName"
        >
          Full Name
        </label>
        <input
          className={style.input}
          id="fullName"
          required
          type="text"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          placeholder="Ram Chandra"
        />
      </div>
      <div className="mb-3">
        <label
          className="block text-start text-gray-700 text-sm font-bold mb-2"
          htmlFor="num"
        >
          Number
        </label>
        <input
          className={`${style.input} ${errorClass}`}
          required
          id="num"
          value={phNumber}
          onChange={(e) => {
            setPhNumber(e.target.value);
          }}
          inputMode="numeric"
          placeholder="9669xxxx01"
        />
      </div>
      <p className="text-start text-pink-500 mb-2 text-xs">
        <span className="text-gray-500">Logged in: </span>
        {auth.currentUser.email}
      </p>
      <div className="flex items-center justify-between">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enjoy
        </button>
      </div>
    </form>
  );

  const StepOne = (
    <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 mt-4">
      <div>
        <p className="text-6xl font-bold">Welcome</p>
        <p className="text-4xl font-semibold">
          to your <span className="font-bold text-teal-800">Chat</span>
        </p>
        <p className="text-start text-pink-500 mt-2 text-xs">
          <span className="text-gray-500">Logged in: </span>
          {auth.currentUser.email}
        </p>
        <img
          src="https://img.freepik.com/free-vector/messages-concept-illustration_114360-583.jpg?w=500"
          alt=""
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            setStep(0);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="flex flex-col m-[auto] w-full max-w-xs">
        {step ? StepOne : Form}
        <p className="text-center text-gray-500 text-xs">
          Developed by{" "}
          <a
            className="text-teal-400"
            href="https://instagram.com/utkarshencoder"
          >
            Utkarsh Sharma
          </a>
        </p>
      </div>
    </React.Fragment>
  );
};

export default SetProfile;
