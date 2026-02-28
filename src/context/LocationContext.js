import { createContext, useState, useContext, useEffect } from "react";

const LocationContext = createContext();

export function LocationProvider(props) {
  const [origin, setOrigin] = useState(() => localStorage.getItem("origin") || "")
  const [destination, setDestination] = useState(() => localStorage.getItem("destination") || "")

  useEffect(function () {
    localStorage.setItem("origin", origin)
  }, [origin])

  useEffect(function () {
    localStorage.setItem("destination", destination)
  }, [destination])

  return (
    <LocationContext.Provider value={{ origin, setOrigin, destination, setDestination }}>
      {props.children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
