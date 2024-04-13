import React, { useState, useEffect } from 'react';
import db from './firebase';
import { collection, onSnapshot, doc, updateDoc,addDoc } from 'firebase/firestore';
import './style.css';


const App = () => {
  const [randomData1, setRandomData1] = useState(null);
  const [randomData2, setRandomData2] = useState(null);
  const [data,setData]=useState(null);
    //data 

   
    //data

  useEffect(() => {
    const unsubscribe1 = onSnapshot(collection(db, 'names'), (snapshot) => {
      if (!snapshot.empty) {
        const randomIndex1 = Math.floor(Math.random() * snapshot.docs.length);
        const randomDoc1 = snapshot.docs[randomIndex1];
        setRandomData1({ id: randomDoc1.id, ...randomDoc1.data() });
      } else {
        setRandomData1(null);
      }
    });

    const unsubscribe2 = onSnapshot(collection(db, 'names'), (snapshot) => {
      if (!snapshot.empty) {
        const randomIndex2 = Math.floor(Math.random() * snapshot.docs.length);
        const randomDoc2 = snapshot.docs[randomIndex2];
        setRandomData2({ id: randomDoc2.id, ...randomDoc2.data() });
      } else {
        setRandomData2(null);
      }
    });
   
    return () => {
      unsubscribe1(); // Cleanup function to unsubscribe from Firestore for randomData1
      unsubscribe2(); // Cleanup function to unsubscribe from Firestore for randomData2
    };
  }, []);

  const [names, setNames] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'names'), (snapshot) => {
      setNames(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
  }, []);

  const onClick1 = async () => {
    if (randomData1) {
      const updatedRating = randomData1.rating + 1;
      await updateDoc(doc(db, 'names', randomData1.id), { rating: updatedRating });
    
     
    }

  };

  const onClick2 = async () => {
    if (randomData2) {
      const updatedRating = randomData2.rating + 1;
      await updateDoc(doc(db, 'names', randomData2.id), { rating: updatedRating });
      // Update state with new rating
    
    }
  };

  return (
    <div className='page'>
    <div className='main'>
      
        <p id="logo">ROAST OR GHOST</p>
      
        
            
           
            {randomData2 && (
              <div>
              <button className="btn1" onClick={onClick1}>{randomData1.name}</button>
              <button className="btn2" onClick={onClick2}>{randomData2.name}</button>  </div>
            )}
         
    
  
     
      <button id='lword'>LEADERBOARD</button>
      <div id="leaderboard">
      <ul >
  {names
    .sort((a, b) => b.rating - a.rating) // Sort the names array by rating in decreasing order'
    .slice(0,5)
    .map(item => (
      <button id="leaderboardlist"key={item.id}>{item.name}</button>
    ))}
</ul>
</div>
      

      
    </div>
    </div>
  );
};

export default App;
