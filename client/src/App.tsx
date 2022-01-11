import './App.css';
import { UserProvider } from './providers/user/UserProvider';
import AllRoutes from './routes/routes';
import EventEquip from '../src/features/forum/event_equipment/EventEquip';

function App() {
  return (
    <div className="App font-inter overflow-scroll sm:overflow-auto">
      {/* <UserProvider> */}
      {/* <AllRoutes />
      </UserProvider> */}
      <EventEquip/>
    </div>
  );
}

export default App;
