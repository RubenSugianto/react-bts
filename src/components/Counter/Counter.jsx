import { useState, memo, useCallback, useMemo, useEffect } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log('Calculating if is prime number', 2, 'other');

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

/*
Seperti yang kita ketahui, component akan reexecute kalo ada perubahan state
Misal di parent, ya bakal execute sampe childnya
Kayak di memo ini kalo kita taro, dia gabakal run childnya ulang kalo gaperlu gitu
Memo compares prop values (old sama new), kalo dia beda baru di reexecute
Don't Overuse Memo()
1. Use it as high up in the component tree as possible
2. Checking props with memo() costs performance!
3. Don't use it on components where props will change frequently
No 1 untuk menghindari karna dia sampe childnya gabakal di reexecute biar ga bug
No 2 dan 3 -> bakal lakuin pengecekan yang gaperlu
*/
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // memo itu buat component, useMemo buat function dalem component
  // useMemo bandingin initialCount sama apa beda, kalo beda baru dia execute, mirip useCallback
  // dia cek hasil isPrime(initialCount) sama ga kayak initialCount, kalo iya baru execute
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // Ini bisa dipakai, tapi sebaiknya jangan pake useEffect yang banyak

  // useEffect(() => {
  //   setCounterChanges([{ value: initialCount, id: Math.random()*1000}]);
  // }, [initialCount]);

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([
    {value: initialCount, id: Math.random() * 1000}, 
  ]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      {value: -1, id: Math.random() * 1000}, 
      ...prevCounterChanges,
    ]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [
      {value: 1, id: Math.random() * 1000}, 
      ...prevCounterChanges,
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges}/>
    </section>
  );
});

export default Counter;
