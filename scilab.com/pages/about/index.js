import React from "react";
import { Navbar } from "../../components/navabr";
import { Footer } from "../../components/footer";
import { Text } from "../../components/text";

const Index = () => {
  return (
    <div className="pt-[81px]">
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 py-8">
          <Text className="text-xl font-bold mb-4">About SciLab</Text>
          <Text>
            A research lab, also known as a laboratory or research facility, is
            a specialized space where scientists, researchers, and scholars
            conduct experiments, investigations, and studies to advance
            knowledge and make discoveries in their respective fields. Research
            labs are vital hubs of scientific exploration, innovation, and
            collaboration, serving as the engines that drive scientific progress
            and breakthroughs. Here are some key aspects of a research lab:
          </Text>
          <br />
          <Text className="text-xl font-bold mb-4">Mission</Text>
          <Text>
            The mission of a research lab encompasses its overarching purpose,
            goals, and aspirations. While each research lab may have a unique
            mission based on its specific field of study and objectives, there
            are common elements that can be found in many lab missions. Here is
            an example of a research lab mission:
          </Text>
          <br />
          <Text>
            "The mission of our research lab is to advance scientific knowledge
            and make meaningful contributions to our field through rigorous
            research, innovation, and collaboration. Our overarching goal is to
            address critical challenges and improve the understanding of [field
            of study] for the betterment of society and the world.
          </Text>
          <br />
          <Text className="text-xl font-bold mb-4">Vision</Text>
          <Text>
            Our lab is dedicated to conducting cutting-edge research that pushes
            the boundaries of knowledge in [field of study]. We strive to tackle
            complex problems, develop innovative solutions, and drive scientific
            advancements that have real-world impact. Through our work, we aim
            to contribute to the broader scientific.
          </Text>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
