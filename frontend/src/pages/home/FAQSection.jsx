import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const faqs = [
    {
      q: "What is PharmaNest?",
      a: "PharmaNest is India’s trusted online pharmacy and healthcare platform. It allows you to order prescribed medicines, over-the-counter (OTC) drugs, wellness items, and baby care essentials from your home. We have a strong network of 5800+ partner stores across India, ensuring fast delivery and authentic medicines. You can also store your medical history digitally and consult doctors directly through our platform, making healthcare simpler and more accessible for everyone.",
    },
    {
      q: "Is PharmaNest available across India?",
      a: "Yes, PharmaNest is available in almost every corner of India, from metro cities to tier-2 and tier-3 towns. Our huge partner network ensures even semi-urban and rural customers can receive timely deliveries. While big cities often get express delivery within hours, even smaller towns usually receive medicines within 24–48 hours. This wide reach helps us provide affordable and accessible healthcare across the country.",
    },
    {
      q: "Are the medicines on PharmaNest genuine?",
      a: "Absolutely. PharmaNest takes medicine authenticity very seriously. All products are sourced directly from licensed distributors and verified pharmaceutical companies. Every batch of medicine goes through strict quality checks as per CDSCO (Central Drugs Standard Control Organization) guidelines. We never sell expired or tampered products. When you order with us, you can be 100% confident that you are getting genuine, safe, and approved medicines.",
    },
    {
      q: "How fast is the delivery of medicines?",
      a: "PharmaNest focuses on speed and reliability. In metro cities, we offer express delivery in less than 2 hours for urgent needs. In most cities and towns, medicines are delivered within 24 hours. In remote or rural areas, deliveries are generally made within 2–3 days. We also provide priority delivery options during checkout for faster service, ensuring that critical medicines reach you exactly when you need them.",
    },
    {
      q: "Can I consult a doctor on PharmaNest?",
      a: "Yes, PharmaNest provides a secure telemedicine service. You can connect with certified general physicians and specialists through video or chat consultations. Doctors can diagnose your problem, give medical advice, and issue valid digital prescriptions. This is especially helpful for follow-up checkups, minor illnesses, or patients who cannot easily travel to clinics. Our doctor consultation service saves you both time and money while ensuring quality care.",
    },
    {
      q: "Does PharmaNest provide discounts and offers?",
      a: "Yes, PharmaNest regularly runs attractive discounts and seasonal offers on medicines, wellness products, and healthcare items. You can apply coupons during checkout and also earn Health Credits on every purchase. These credits can be redeemed later, making your medicines even more affordable. Our goal is to make essential healthcare affordable without compromising on quality.",
    },
    {
      q: "Can I order medicines without a prescription?",
      a: "Yes and no. For OTC medicines, health supplements, and personal care items, you don’t need a prescription. But for prescription drugs (like antibiotics, BP medicines, diabetes medicines, or Schedule H/X drugs), you must upload a valid prescription from a registered doctor. Our pharmacists carefully verify it before dispatch. This is done to comply with Indian medical laws and to ensure your safety.",
    },
    {
      q: "How do I track my order?",
      a: "Tracking your order is simple. Once your order is placed, you’ll receive a tracking link via SMS, email, and in the PharmaNest app. The tracker shows every step – order confirmation, packaging, dispatch, and estimated delivery time. You will also get live updates through push notifications so that you always know where your order is. For express orders, you can even see the delivery partner’s live location.",
    },
    {
      q: "Does PharmaNest allow digital health record storage?",
      a: "Yes, PharmaNest includes a secure digital locker where you can upload prescriptions, diagnostic test reports, vaccination details, and complete medical history. This makes your healthcare records accessible anytime, anywhere. During doctor consultations, your physician can also review your past records to provide better treatment. All records are encrypted for your privacy and security.",
    },
    {
      q: "What payment methods are supported on PharmaNest?",
      a: "PharmaNest offers flexible payment options – UPI (Google Pay, PhonePe, Paytm), debit/credit cards, net banking, and popular wallets. Cash on Delivery (COD) is also available in select regions. For frequent users, you can save your preferred payment method for quicker checkout. All online payments are processed through secure, PCI-DSS compliant gateways to ensure safety.",
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full lg:px-8 py-8 text-sm p-2">
      <h2 className="text-lg lg:text-xl font-medium text-center underline text-teal-600 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 ">
        {visibleFaqs.map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition bg-gray-100"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <h3 className="font-normal text-sm lg:text-[16px] text-black">
                {item.q}
              </h3>
              {activeIndex === index ? (
                <FaChevronUp className="text-teal-600" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            {/* Answer */}
            {activeIndex === index && (
              <p className="text-gray-600 mt-3 leading-relaxed">{item.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* Show More / Less Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition"
        >
          {showAll ? "Show Less Questions" : "Show More Questions"}
          {showAll ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
