import React from 'react';
import { Users, Home, Award, ThumbsUp } from 'lucide-react';

function AboutPage() {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO', image: 'https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3BmLWljb240LWppcjIwNjQtcG9yLTAzLWxjb3B5LnBuZw.png' },
    { name: 'Jane Smith', role: 'Lead Agent', image: 'https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3BmLWljb240LWppcjIwNjQtcG9yLTAzLWxjb3B5LnBuZw.png' },
    { name: 'Mike Johnson', role: 'Marketing Director', image: 'https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3BmLWljb240LWppcjIwNjQtcG9yLTAzLWxjb3B5LnBuZw.png' },
    { name: 'Sarah Brown', role: 'Customer Relations', image: 'https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3BmLWljb240LWppcjIwNjQtcG9yLTAzLWxjb3B5LnBuZw.png' },
  ];

  return (
    <div className="bg-gray-100 overflow-y-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">About DreamHome</h1>
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            DreamHome was founded in 2005 with a simple mission: to help people find their perfect home. Over the years, we've grown from a small local agency to a nationwide leader in real estate services.
          </p>
          <p className="text-gray-700 mb-4">
            Our team of experienced professionals is dedicated to providing exceptional service and making the home buying and selling process as smooth as possible for our clients.
          </p>
          <p className="text-gray-700">
            With our extensive knowledge of local markets and commitment to innovation, we've helped thousands of families find their dream homes and investors make smart property decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { icon: Users, title: '10,000+', subtitle: 'Happy Clients' },
            { icon: Home, title: '15,000+', subtitle: 'Properties Sold' },
            { icon: Award, title: '50+', subtitle: 'Industry Awards' },
            { icon: ThumbsUp, title: '99%', subtitle: 'Customer Satisfaction' },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <item.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At DreamHome, our mission is to empower individuals and families to achieve their real estate goals. We strive to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Provide unparalleled customer service and support throughout the entire real estate process</li>
            <li>Offer expert guidance and market insights to help our clients make informed decisions</li>
            <li>Leverage cutting-edge technology to streamline and enhance the home buying and selling experience</li>
            <li>Maintain the highest standards of integrity, professionalism, and ethical conduct in all our dealings</li>
          </ul>
          <p className="text-gray-700">
            We're committed to not just meeting, but exceeding our clients' expectations, and to continually raising the bar in the real estate industry.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;