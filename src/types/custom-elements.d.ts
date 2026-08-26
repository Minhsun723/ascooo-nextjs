declare namespace React.JSX {
  interface IntrinsicElements {
    "dotlottie-wc": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src: string;
      autoplay?: boolean;
      loop?: boolean;
      class?: string;
    };
  }
}
