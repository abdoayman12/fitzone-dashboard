import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import AddMemberProvider from "./context/AddMemberContext/AddMemberContext";
import AddClassProvider from "./context/AddClassContext/AddClassContext";
import EnrollmentProvider from "./context/EnrollmentContext/EnrollmentContext";
import TrainerProvider from "./context/TrainerContext/TrainerContext";
import PlanProvider from "./context/PlanContext/PlanContext";

function App() {
  return (
    <BrowserRouter>
      <AddMemberProvider>
        <AddClassProvider>
          <TrainerProvider>
            <EnrollmentProvider>
              <PlanProvider>
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: "#10131A",
                      color: "#fff",
                      border: "1px solid #1A1E2E",
                    },
                  }}
                />
                <AppRoutes />
              </PlanProvider>
            </EnrollmentProvider>
          </TrainerProvider>
        </AddClassProvider>
      </AddMemberProvider>
    </BrowserRouter>
  );
}

export default App;
