declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.mp4' {
  const src: string;
  export default src;
}