import Image from 'next/image';
import React,{ReactElement} from 'react';

const random = (): number => Math.floor(Math.random() * 123) + 1;
console.log(random);

const RandomFox = ():ReactElement => {
    const image:string = `https://randomfox.ca/images/${random()}.jpg`;
  return <Image
  src={image}
  alt='image'
  className="rounded-xl"
  width={400}
  height={400}
  />
}

export default RandomFox;