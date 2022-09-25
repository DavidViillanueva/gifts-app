import React, { createContext } from "react";

const ColorContext = createContext<{
    color: any,
    dispatchColor: React.Dispatch<any>
}>({} as any);

export default ColorContext;