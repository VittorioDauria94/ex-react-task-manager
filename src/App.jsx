import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<TaskList />} />
              <Route path="/newTasks" element={<AddTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
