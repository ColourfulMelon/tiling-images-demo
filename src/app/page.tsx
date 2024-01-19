import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*//display an array of n images in a grid*/}
        <div className="grid grid-cols-12 gap-0">
            {[...Array(10000)].map((_, i) => (
                <Image
                    key={i}
                    src={`https://picsum.photos/200/300?random=${i}`}
                    width={180}
                    height={30}
                    loading="lazy"
                    alt={''}/>

            ))}
            {/*<iframe src="iframe" loading="lazy"></iframe>*/}
        </div>
    </main>
  );
}
