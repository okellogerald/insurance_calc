import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";

export const NavigateHookWrapper: React.FC<{ renderFn: (nv: NavigateFunction) => ReactNode }> = ({ renderFn }) => {
    return renderFn(useNavigate())
};
