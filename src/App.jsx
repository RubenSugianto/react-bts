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
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount}/>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
