import { Button } from './components/ui/button';

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-10 prose">
      <div className="flex flex-col items-center gap-y-4" >
        <h3>How to use our life insurance calculator</h3>
        <p>
          To calculate your life insurance coverage level with our tool,
          you’ll fill in the required fields. These include your estimated burial expenses,
          the number of income-earning years you’ll want to replace for your beneficiary,
          the net income of your survivors, the values of your current investments and savings,
          the number of children your survivor will need to support and
          if you want to account for funding any one-time expenses for your survivors,
          like college expenses or a gift to charity.
        </p>
        <div className="flex space-x-5">
          <Button variant={"outline"}> Sign Up</Button>
          <Button variant={"default"}> Log In</Button>
        </div>
      </div>
    </main>
  );
}

export default App;
