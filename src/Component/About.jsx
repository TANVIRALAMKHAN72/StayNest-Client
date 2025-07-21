import React from "react";
import { MdDesignServices, MdSecurity } from "react-icons/md";
import { FaLeaf } from "react-icons/fa";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { Fade, Slide } from "react-awesome-reveal";

const About = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <Slide direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <PiBuildingApartmentDuotone className="text-blue-500 text-4xl" />
            About the Building
          </h2>
        </Slide>

        <Fade delay={300} triggerOnce>
          <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
            Nestled in the heart of the city, our state-of-the-art building
            combines elegance with modern architecture. Designed for comfort and
            sustainability, it provides residents with a perfect blend of
            luxury, safety, and community.
          </p>
        </Fade>

        <div className="grid md:grid-cols-3 gap-8 mt-10 text-left">
          {/* Card 1 */}
          <Fade direction="left" triggerOnce>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center gap-3 mb-2 text-gray-800">
                <MdDesignServices className="text-3xl text-blue-600" />
                <h3 className="text-xl font-semibold">Modern Design</h3>
              </div>
              <p className="text-gray-600">
                Featuring sleek lines, open spaces, and high-end finishes for a
                sophisticated living experience.
              </p>
            </div>
          </Fade>

          {/* Card 2 */}
          <Fade direction="up" delay={200} triggerOnce>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center gap-3 mb-2 text-gray-800">
                <MdSecurity className="text-3xl text-green-600" />
                <h3 className="text-xl font-semibold">Safety First</h3>
              </div>
              <p className="text-gray-600">
                24/7 security, CCTV monitoring, and earthquake-resistant
                structure ensure peace of mind.
              </p>
            </div>
          </Fade>

          {/* Card 3 */}
          <Fade direction="right" delay={400} triggerOnce>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center gap-3 mb-2 text-gray-800">
                <FaLeaf className="text-3xl text-emerald-600" />
                <h3 className="text-xl font-semibold">Eco-Friendly</h3>
              </div>
              <p className="text-gray-600">
                Solar power, rainwater harvesting, and energy-efficient features
                make this a green community.
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default About;
