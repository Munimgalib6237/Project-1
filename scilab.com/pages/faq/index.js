
import { Text } from "../../components/text"
import { Navbar } from "../../components/navabr"
import { Footer } from "../../components/footer"
import { CustomDisclouser } from "../../components/disclosure"
import { faq_data } from "../../utils/data"

const Index = () => {
    return (
        <div className="pt-[81px]">
            <Navbar />

            <div className="container mx-auto">
                <div className="grid grid-cols-1 py-6">
                    <Text className="text-xl font-bold mb-3">FAQ's</Text>
                    <CustomDisclouser items={faq_data} />
                </div>

                <div className="grid grid-cols-1 py-6">
                    <Text className="text-xl font-bold mb-3">Privacy & Policies</Text>
                    <CustomDisclouser items={faq_data} />
                </div>

                <div className="grid grid-cols-1 py-6">
                    <Text className="text-xl font-bold mb-3">Term & Conditions</Text>
                    <CustomDisclouser items={faq_data} />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Index;

