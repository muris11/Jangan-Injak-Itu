export const CONTROL_EVENT = "jit-control";

export type MobileControlDetail = {
  action: "left" | "right" | "jump" | "pause" | "restart";
  pressed?: boolean;
};

export function dispatchControl(detail: MobileControlDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<MobileControlDetail>(CONTROL_EVENT, { detail }));
}
