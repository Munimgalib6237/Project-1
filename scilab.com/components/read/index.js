import Image from "next/image";
import { Text } from "../text";
import { Images } from "../../utils/images";
import { useWindowSize } from "../window";

export const Read = () => {
  const window = useWindowSize();

  const responsiveImage = () => {
    let width = 250;
    let height = 200;

    if (window.width >= 768) {
      width = 380;
      height = 280;
    }

    if (window.width >= 1480) {
      width = 550;
      height = 380;
    }

    return { width, height };
  };

  return (
    <div className="py-[60px] lg:py-[120px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-center lg:text-left">
            <Image
              src={Images.Book}
              alt="Reading book"
              width={responsiveImage().width}
              height={responsiveImage().height}
            />
          </div>
          <div className="text-center lg:text-left py-3">
            <Text className="mb-5 font-extrabold text-transparent text-3xl md:text-4xl bg-clip-text bg-gradient-to-r from-primary to-sky-100">
              Read papers
            </Text>

            <Text className="text-md text-gray-400 font-normal mb-4">
              Research papers are essential components of the scientific and
              academic world. They are written documents that communicate the
              findings, methodologies, and conclusions of research studies
              conducted by scholars, scientists, and experts in various fields.
              Reading research papers is a fundamental activity for those
              involved in academia, research, or anyone interested in staying
              informed about the latest advancements and discoveries.
            </Text>
            <Text className="text-md text-gray-400 font-normal">
              Research papers serve multiple purposes. Firstly, they contribute
              to the existing body of knowledge by sharing new insights, data,
              and interpretations. They often present novel ideas, theories, or
              experimental results, helping to expand our understanding of a
              particular subject. Reading research papers allows individuals to
              keep up with the latest developments and advancements in their
              fields, ensuring they remain informed and knowledgeable about the
              most recent research findings.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
