import { useEffect } from "react";
import Button from "./Button";
import Icon from "./Icon";

export interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;

  title: string;
  subtitle?: string;
}

export default function Modal(props: Props) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (props.open) window.document.body.style.overflow = "hidden";
      else window.document.body.style.overflow = "auto";
    }
  }, [props.open]);

  return (
    <dialog
      open={props.open}
      style={{
        opacity: props.open ? 1 : 0,
        visibility: props.open ? "visible" : "hidden",
        top: props.open ? 0 : "20px",
      }}
      className="w-screen h-screen bg-[transparent] flex items-center justify-center z-[1] transition-all duration-300 fixed left-0 p-6"
    >
      <div
        className="bg-black/30 backdrop-blur-[1px] w-screen h-screen fixed top-0 left-0 z-0"
        onClick={props.onClose}
      />

      <div className="z-[10] bg-white p-6 rounded-lg border border-gray-light w-full max-w-[500px]">
        <div className="flex justify-between items-center pb-6 border-b border-b-gray mb-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{props.title}</h3>
            {props.subtitle && (
              <p className="text-xs text-gray-medium-dark">{props.subtitle}</p>
            )}
          </div>
          <Button onClick={props.onClose} className="!p-2 ">
            <Icon id="close" className="h-5 w-5" />
          </Button>
        </div>

        <div className="w-[calc(100% + 5px)] -mr-[5px] h-full max-h-[475px] overflow-y-scroll flex flex-col gap-4">
          {props.children}
        </div>
      </div>
    </dialog>
  );
}
