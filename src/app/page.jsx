import HomeMenu from "@/components/HomeMenu/HomeMenu"
import SectionHeading from "@/components/Sectionheading/SectionHeading"
import HeroSection from "@/components/heroSection/HeroSection"


function HomePage() {
  return (
    <div>
      <HeroSection/>
      <HomeMenu/> 
      <sec className="my-6 max-w-xl flex flex-col text-center m-auto gap-6 text-gray-500" id="about">
        <SectionHeading heading={'our story'} subheading={'About'} />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores eos natus deserunt numquam sunt illum ad quos nihil, voluptatum harum recusandae incidunt ab tempora. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus ipsum rerum </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores eos natus deserunt numquam sunt illum ad quos nihil,Lorem ipsum dolor sit amet consectetur..</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores eos natus deserunt numquam sunt illum ad quos nihil, </p>
      </sec>
      <section className="my-10" id="contact">
        <SectionHeading heading={'Don\'t Hesitate'} subheading={'Contact us'}/> 
        <p className="text-4xl text-slate-500 underline text-center py-6">+89372038092</p>
      </section>

    </div>
  )
}

export default HomePage