import React from "react";
import "./App.css";
import Signup from "./Components/User Account Management/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/User Account Management/Login";
import Products from "./Components/Products";
import { Provider, useSelector } from "react-redux";
import { store } from "./Redux/store";
import Cart from "./Components/Donation System/Cart";
import EventCreation from "./Components/EventCreation";
import TicketsBooking from "./Components/TicketsBooking";
import Reports from "./Components/Reports";
import ProtectedRoute from "./ProtectedRoute";
import EventManagement from "./Components/EventManagement";
import EditEvent from "./Components/EventManagement/EditEvent";
import DeleteEvent from "./Components/EventManagement/DeleteEvent";
import PurchaseSuccess from "./Components/Donation System/purchaseSuccess";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchaseSuccess"
              element={
                <ProtectedRoute>
                  <PurchaseSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event-creation"
              element={
                <ProtectedRoute>
                  <EventCreation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-event"
              element={
                <ProtectedRoute>
                  <EditEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delete-event"
              element={
                <ProtectedRoute>
                  <EditEvent isDelete />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets-booking"
              element={
                <ProtectedRoute>
                  <TicketsBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event-management"
              element={<ProtectedRoute>{<EventManagement />}</ProtectedRoute>}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
