import React from 'react';

interface testObj {
  a: number,
  b: string,
  c: number
}


function App() {
  const testObj: testObj = {
    a: 1,
    b: "2",
    c: 3
  }
  return (
    <div>
      Hello
      {testObj.a}
    </div>
  );
}

export default App;
