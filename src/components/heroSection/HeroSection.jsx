import Image from "next/image"
import Right from "../icons/Right.jsx"


function HeroSection() {
  return (
    <div className="flex mb-10 ">
        <div className="flex flex-1 flex-col gap-8 py-16 px-4 mb-10">
            <h1 className="text-5xl font-bold leading-[3.5rem] ">Everything <br /> is better <br /> with a <span className=" text-primary" >Pizza</span> </h1>
            <p className="font-semibold text-[18px] leading-5 text-slate-500 ">Pizza is the missing piece that makes every day complete,a simple yet deliciuos joy in life</p>
            <div className="flex gap-4 ">
                <button className="bg-primary text-white rounded-full px-10 py-2 text-lg uppercase flex gap-2 items-center " >Order Now
                <Right className="w-8 h-8" /></button>
                <button className=" font-bold text-lg px-4 py-2 flex items-center gap-2">Learn More<Right className="w-8 h-8"/></button>
            </div>
        </div>
        <div className=" relative md:block hidden " style={{flex :1.7}}>
            <Image src={'/pizza.png'} alt="HeroImage" objectFit="contain" fill/>
        </div>
    </div>
  )
}

export default HeroSection