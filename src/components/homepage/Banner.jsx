"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import { useState } from "react";
import Image from "next/image";
import { GrPrevious, GrNext } from "react-icons/gr";
import Link from "next/link";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <GrNext color="white" size={30} />,
    prevArrow: <GrPrevious color="white" size={30} />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
    ],
  };

  const data = [
    {
      name: `We Can Help You Get Better &<br />Regain Your Health`,
      img: "/Banner/family.jpg",
      url: "/knowDoctor",
    },
  ];

  return (
    <div className="overflow-x-hidden relative mt-[200px] bg-gradient-to-r from-[#07a496] to-[#04686e]">
      <Slider {...settings} className="p-10">
        {data.map((d, index) => (
          <div key={d.name} className="relative w-full">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <Image
              width={1920}
              height={800}
              src={d.img}
              alt="slider-image"
              className="w-full h-[80vh] object-cover"
            />
            {index === currentSlide && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 text-white">
                <h1
                  className={`text-5xl md:text-4xl font-bold mb-4 animate__animated ${
                    index === currentSlide ? "animate__fadeInDown" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: d.name }}
                ></h1>
                <p
                  className={`text-lg md:text-2xl mb-6 animate__animated ${
                    index === currentSlide ? "animate__fadeInUp" : ""
                  }`}
                >
                  {d.subheading}
                </p>
                <div
                  className={`flex space-x-4 animate__animated ${
                    index === currentSlide ? "animate__fadeInUp" : ""
                  }`}
                >
                  <Link href={d.url}>
                    <button className="px-6 py-3 bg-[#07a496] text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition">
                      Learn More
                    </button>
                  </Link>
                    <Link href="/contactus">
                      <button className="px-6 py-3 bg-[#07a496] text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition">
                        Contact Us
                      </button>
                    </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
