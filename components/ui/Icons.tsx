import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WarningIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M12 3 22 21H2L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M12 9v5M12 18v.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>;
}
export function PlayIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="m8 5 11 7-11 7V5Z" fill="currentColor"/></svg>;
}
export function TrophyIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M8 4h8v5a4 4 0 1 1-8 0V4ZM8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v4M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>;
}
export function SettingsIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" strokeWidth="2"/><path d="M19 12a7 7 0 0 0-.08-1l2-1.45-2-3.45-2.3 1a7 7 0 0 0-1.72-1L14.63 3h-4L10.3 6.1c-.6.25-1.16.58-1.68 1l-2.34-1-2 3.45 2.05 1.47a7 7 0 0 0 0 1.96L4.28 14.45l2 3.45 2.34-1c.52.42 1.08.75 1.68 1l.33 3.1h4l.27-3.1a7 7 0 0 0 1.72-1l2.3 1 2-3.45-2-1.45c.05-.33.08-.67.08-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
}
export function VolumeIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M4 9h4l5-4v14l-5-4H4V9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}
export function PauseIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" fill="currentColor"/></svg>;
}
export function RefreshIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M20 12a8 8 0 1 1-2.35-5.65L20 9M20 4v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function ShareIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M15 8 12 5 9 8M12 5v10M5 13v6h14v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
