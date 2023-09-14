import Image from "next/image";
import { Text } from "../text";
import { Images } from "../../utils/images";
import { useWindowSize } from "../window";

export const Publish = () => {
  const window = useWindowSize();

  const responsiveImage = () => {
    let width = 250;
    let height = 180;

    if (window.width >= 640) {
      width = 280;
      height = 220;
    }

    if (window.width >= 768) {
      width = 350;
      height = 260;
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
          <div className="text-center lg:text-left">
            <Image
              src={Images.Check}
              alt="Check"
              width={responsiveImage().width}
              height={responsiveImage().height}
            />
          </div>
          <div className="text-center lg:text-left py-3">
            <Text className="mb-5 font-extrabold text-transparent text-3xl md:text-4xl bg-clip-text bg-gradient-to-r from-primary to-sky-100">
              Publish to journal
            </Text>

            <Text className="text-md text-gray-400 font-normal mb-4">
              Publishing a research paper in a journal is a significant
              milestone for researchers and scholars. It is a crucial step in
              sharing their work with the scientific community, contributing to
              the existing body of knowledge, and gaining recognition for their
              findings. Publishing research papers allows researchers to
              communicate their research methods, results, and conclusions to a
              broader audience, fostering collaboration and advancing their
              field of study.
            </Text>
            <Text className="text-md text-gray-400 font-normal mb-4">
              Here is an overview of the process involved in publishing a
              research paper in a journal:
            </Text>
            <ol className="list-decimal text-md text-gray-400 font-normal">
              <li>
                <Text>
                  Selecting the appropriate journal: Researchers need to
                  identify the most suitable journal for their research paper.
                </Text>
              </li>
              <li>
                <Text>
                  Preparing the manuscript: Researchers must adhere to the
                  specific formatting and structure guidelines provided by the
                  journal.
                </Text>
              </li>
              <li>
                <Text>
                  Reviewing and revising: Many journals follow a peer-review
                  process, where the submitted paper is evaluated by experts in
                  the field.
                </Text>
              </li>
              <li>
                <Text>
                  Submission: Once the manuscript is prepared and revised, it
                  can be submitted to the chosen journal.
                </Text>
              </li>
              <li>
                <Text>
                  Peer review process: Upon submission, the journal's editorial
                  team initiates the peer review process.
                </Text>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
