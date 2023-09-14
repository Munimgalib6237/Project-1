import Image from "next/image";
import { Text } from "../text";
import { Images } from "../../utils/images";
import { useWindowSize } from "../window";

export const Discover = () => {
  const window = useWindowSize();

  const responsiveImage = () => {
    let width = 250;
    let height = 170;

    if (window.width >= 640) {
      width = 280;
      height = 200;
    }

    if (window.width >= 768) {
      width = 400;
      height = 250;
    }

    if (window.width >= 1480) {
      width = 550;
      height = 380;
    }

    return { width, height };
  };

  return (
    <div className="pb-[60px] lg:pb-[120px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:hidden text-center">
            <Image
              src={Images.Discover}
              alt="Discover"
              width={responsiveImage().width}
              height={responsiveImage().height}
            />
          </div>

          <div className="text-center lg:text-left py-3">
            <Text className="mb-5 font-extrabold text-transparent text-3xl md:text-4xl bg-clip-text bg-gradient-to-r from-primary to-sky-100">
              Discover something new
            </Text>

            <Text className="text-md text-gray-400 font-normal mb-4">
              Discovering something new is a remarkable and exhilarating
              experience that has shaped the course of human history. It is
              through discoveries that we expand our understanding of the world,
              unveil hidden truths, and push the boundaries of knowledge.
              Whether it is a groundbreaking scientific finding, a new artistic
              expression, or an innovative technological advancement,
              discoveries have the power to transform societies and inspire
              future generations.
            </Text>
            <Text className="text-md text-gray-400 font-normal">
              The process of discovery often begins with curiosity and a desire
              to explore the unknown. It involves a combination of observation,
              experimentation, critical thinking, and creative problem-solving.
              Discoveries can emerge from rigorous scientific research, artistic
              exploration, technological innovations, or even serendipitous
              occurrences that lead to unexpected insights.
            </Text>
          </div>

          <div className="hidden lg:block text-right">
            <Image
              src={Images.Discover}
              alt="Discover"
              width={responsiveImage().width}
              height={responsiveImage().height}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
