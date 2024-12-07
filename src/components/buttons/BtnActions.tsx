import { PropsWithChildren } from "react";
import { cn } from "@/utils/classNames.ts";

type BtnActionsProps = {
  onClick: () => void;
  className?: string;
}

const BtnActions = (props: PropsWithChildren<BtnActionsProps>) => {
  return (
    <>
      <button
        className={cn('flex justify-center items-center py-1 px-2 rounded text-white', props.className)}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}

export default BtnActions;
