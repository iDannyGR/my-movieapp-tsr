import Image from 'next/image';
import React,{FC, ReactElement, useRef, useEffect, useState, ImgHTMLAttributes} from 'react';

interface imageFox extends ImgHTMLAttributes<HTMLImageElement> {
  image:string
  onLazyLoad?: (img:HTMLImageElement) => void
}

// type Props = {image:string}
// const RandomFox:FC<imageFox> = ({image}:Props):ReactElement => {
//can use with types of TS and destructuring in props 

const LazyImage:FC<imageFox> = ({image, ...imgProps}):ReactElement => {

  const node = useRef<HTMLImageElement>(null); //gold rule write work element for nodes 
  const [src, setSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");
  
  useEffect(() => {
      //new observer 
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry =>{
        entry.isIntersecting ? setSrc(image) : console.log('nothing');
      })
    })
    //the observer it observe
    node.current ? observer.observe(node.current): console.log('not found'); 
    // observer.observe(node.current!) <-- this one option with !

//unmount the observer
      return ()=>{
        observer.disconnect()
      }
  }, [image])

  return (
    <div {...imgProps}>
      <Image
            src={src}
            ref={node}
            alt='image'
            width={400}
            height={400}
          />
    </div>
   
)}

export default  LazyImage;