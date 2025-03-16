import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {

  // REACT JS itu ada Old Snapshot dan New Snapshot
  // Dia bakal compare, kalo ada beda, itu doang yang digenerate awal
  // cth awal ya dia compare sama kosong, makanya semua kerender
  // misal ada perubahan B, dia bandingin sama A bedanya apa, yang beda dia render gitu 

  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    // State Scheduling
    // ini dia ga lgsg bs dipake newCountnya
    setChosenCount(newCount);
    // kalo ini lgsg berubah
    // setChosenCount((prevChosenCount) => prevChosenCount + 1);
    // // dua state ini execute app sekali karna ada state batching
    // // state batching-> 2 state dalam komponen sama gaakan buat 2 kali execute functionnya
    // console.log(chosenCount); // Wont Work
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount}/>
        {/* kalo kasusnya gini, setiap component punya statenya sendiri */}
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
