
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'
import { GEMINI_API_KEY } from '$env/static/private';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "I want to study Mechanical Technology in the US, How can you help"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, that's great! Studying Mechanical Technology in the US can open up a lot of exciting opportunities. Let's break down how I can help you achieve this goal. I can help you with:\n\n**1. Understanding Mechanical Technology:**\n\n* **What is Mechanical Technology?** I can explain the difference between Mechanical Engineering and Mechanical Technology, which is a more hands-on, application-focused field. We can discuss the core concepts and areas of focus within the discipline.\n* **Career Paths:** I can provide information on various career options available after graduating with a degree in Mechanical Technology. This includes roles in manufacturing, design, maintenance, testing, and more.\n* **Skills You'll Develop:** I can outline the practical skills you'll gain during your studies, such as CAD/CAM, machining, fabrication, robotics, and quality control.\n\n**2. Finding the Right Program:**\n\n* **University/College Research:** I can help you research suitable universities and colleges in the US that offer reputable Mechanical Technology programs (Associate's, Bachelor's, and sometimes Master's).\n* **Program Comparisons:** We can compare different programs based on factors like curriculum, faculty, facilities, location, cost, and student-to-faculty ratio.\n* **Accreditation:** I can help you verify if a program is accredited by organizations like ABET, which is important for quality assurance and career prospects.\n* **Specializations:** Some programs offer specializations within Mechanical Technology. I can help you explore options like automation, manufacturing, or design.\n\n**3. Navigating the Application Process:**\n\n* **Admissions Requirements:** I can outline typical admission requirements for US universities, including GPA, standardized tests (like TOEFL/IELTS if you're an international student), and application essays.\n* **Application Timeline:** I can help you create a timeline for your application process, including deadlines for testing, applications, and visa processing.\n* **Application Materials:** I can guide you on preparing strong application materials, such as personal statements and letters of recommendation.\n* **Financial Aid & Scholarships:** I can provide resources and information on available scholarships and financial aid options for international students.\n\n**4. Preparing for Your Studies:**\n\n* **Pre-Departure Preparation:** I can offer advice on what to expect when moving to the US, including cultural differences, housing options, and visa requirements.\n* **Academic Skills:** I can suggest resources for improving academic skills, especially in areas like math and science.\n* **Networking:** I can help you find resources for connecting with other students and professionals in the field.\n\n**5. General Resources:**\n\n* **Links to University Websites:** I can provide links to the websites of relevant universities so you can gather detailed information directly from the source.\n* **Industry Associations:** I can point you to relevant industry associations and organizations that offer resources for students.\n* **Study Abroad Guides:** I can recommend reputable study abroad guides and resources for international students.\n\n**To help me better assist you, tell me more about:**\n\n* **Your Educational Background:** Do you have a high school diploma? Any previous college experience?\n* **Your Current Location:** Are you a domestic US student or an international student?\n* **Your Desired Degree Level:** Are you looking for an Associate's, Bachelor's, or Master's degree?\n* **Your Budget:** What is your estimated budget for tuition, living expenses, and other costs?\n* **Specific Areas of Interest:** Are there any particular areas of Mechanical Technology that you're most interested in?\n* **Any Preferences:** Do you have any preferences regarding location, university size, or other factors?\n\n**Let's work together to make your dream of studying Mechanical Technology in the US a reality! Tell me more about your situation and we can start planning your next steps.**\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();