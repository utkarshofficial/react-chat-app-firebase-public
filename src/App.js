import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import SetProfile from "./components/SetProfile";

import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, collection, query } from "firebase/firestore";
import Message from "./components/Message";

const style = {
  appContainer: `max-w-[728px] mx-auto text-center`,
  sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
};

function App() {
  const [user] = useAuthState(auth);
  // * check user registered first time or not
  const [registration, setRegistration] = React.useState(1);
  const firstTime = async () => {
    // query(collection(db,`users/${user.email}/number`))
    const docRef = doc(db, `users/${user.email}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRegistration(0);
    }
  };

  useEffect(() => {
    firstTime();
  }, [user]);

  return (
    <div className={style.appContainer}>
      <section className="{style.sectionContainer}">
        {/* Navbar */}
        <Navbar />
        {user ? registration ? <SetProfile /> : <Chat /> : null}
      </section>
    </div>
  );
}

export default App;
