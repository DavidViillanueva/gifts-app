import { createContext } from "react";
import { colors } from "../../configs/colors";

const ColorContext = createContext(colors.blue);

export default ColorContext;