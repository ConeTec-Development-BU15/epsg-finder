import { createElement, ReactNode, useEffect, useState } from "react";
import createContextUtil from "../utils/createContextUtil";
import fetchData, { TData } from "../utils/fetchData";

interface AppContextType {
  lat: number
  setLat: (v: number) => void;
  lon: number
  setLon: (v: number) => void;
  x: number
  setX: (v: number) => void;
  y: number
  setY: (v: number) => void;
  data: TData | null;
}

const [ContextProvider, useContext] = createContextUtil<AppContextType>("SurveyMapContext");

export function AppContextProvider({children}: {children: ReactNode}) {
  const [lat, setLat] = useState(NaN);
  const [lon, setLon] = useState(NaN);
  const [x, setX] = useState(NaN);
  const [y, setY] = useState(NaN);
  const [data, setData] = useState<TData | null>(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  const value: AppContextType = {
    lat, setLat,
    lon, setLon,
    x, setX,
    y, setY,
    data,
  };
  
  return createElement(ContextProvider, {value}, children);
}

export function useAppContext() {
  return useContext();
}