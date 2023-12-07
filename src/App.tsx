import { useNavigate } from 'react-router';
import { Button } from './components/ui/button';
import MainLayout from './layouts/main_layout';

function App() {
  const navigate = useNavigate();

  function signUp() {
    navigate("/signup");
  }

  function logIn() {
    navigate("/login");
  }

  return (
    <MainLayout>
      <h3>Insurance Calculator</h3>
      <div>
        <p>
          Welcome to our insurance calculator. Before anything we would like to create an account for you.
        </p>
        <p>
          Do you already have an account with us? Please log in.
        </p>
      </div>
      <div className="flex space-x-5">
        <Button variant={"outline"} onClick={signUp}> Sign Up</Button>
        <Button variant={"default"} onClick={logIn}> Log In</Button>
      </div>
    </MainLayout>
  );
}

export default App;
