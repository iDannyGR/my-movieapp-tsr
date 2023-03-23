import Image from 'next/image';
import React,{FC, ReactElement, useRef, useEffect, useState, ImgHTMLAttributes} from 'react';

interface imageFox extends ImgHTMLAttributes<HTMLImageElement> {
  image:string
  onLazyLoad?: (img:HTMLImageElement) => void
}

// type Props = {image:string}
// const RandomFox:FC<imageFox> = ({image}:Props):ReactElement => {
//can use with types of TS and destructuring in props 

const LazyImage:FC<imageFox> = ({image, onLazyLoad, ...imgProps}):ReactElement => {

  const node = useRef<HTMLImageElement>(null); //gold rule write work element for nodes 
  const [src, setSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  useEffect(() => {
      //new observer 
    if (isLazyLoaded) {
      return;
    }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || !node.current) {
              return;
            }

            setSrc(image);
            observer.disconnect();
            setIsLazyLoaded(true);

            if (typeof onLazyLoad === "function") {
              onLazyLoad(node.current);
            }
          });
        });

        if (node.current) {
          observer.observe(node.current);
        }

        return () => {
          observer.disconnect();
        };
  }, [image, onLazyLoad, isLazyLoaded])

  return (
    <div {...imgProps}>
      <Image
            src={src}
            ref={node}
            alt='image'
            width={500}
            height={500}
          />
    </div>
   
)}

export default  LazyImage;