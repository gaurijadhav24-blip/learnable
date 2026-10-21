/**
 * LearnAble - Comprehensive Internationalization (i18n) Engine
 * ==============================================================
 * Supports:
 * - English (en)
 * - Hindi (hi)
 * - Marathi (mr)
 *
 * Features:
 * - Full website translation: headings, leads, buttons, cards, quiz, feedback, footer.
 * - [data-i18n] key-based translation.
 * - Deep text-node / content-map translation for all pages.
 * - Dynamic Google Font 'Noto Sans Devanagari' loading.
 * - Persistent choice in localStorage.
 * - Preserves original English text for 100% clean 2-way toggle.
 */

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.learningAreas': 'Learning Areas',
    'nav.assessment': 'Assessment Guide',
    'nav.support': 'Support Pathways',
    'nav.learner': 'Learner Support',
    'nav.parent': 'Parent Support',
    'nav.educator': 'Educator Support',
    'nav.activities': 'Activities',
    'nav.resources': 'Resources',
    'nav.faq': 'FAQ',
    'nav.feedback': 'Feedback',
    'nav.admin': 'Admin Portal',
    'nav.logout': 'Logout',

    // Buttons
    'btn.learnMore': 'Learn More',
    'btn.exploreAreas': 'Explore Learning Areas',
    'btn.startActivity': 'Start Activity',
    'btn.viewResources': 'View Resources',
    'btn.submitFeedback': 'Submit Feedback',
    'btn.submitting': 'Submitting...',
    'btn.next': 'Next',
    'btn.previous': 'Previous',
    'btn.finish': 'Finish',
    'btn.restart': 'Restart Activity',
    'btn.reviewAnswers': 'Review Answers',
    'btn.visitResource': 'Visit Resource',
    'btn.login': 'Sign In',
    'btn.addResource': 'Add Resource',
    'btn.delete': 'Delete',
    'btn.cancel': 'Cancel',
    'btn.exportCsv': 'Export to CSV',
    'btn.backHome': 'Back to Home',
    'btn.takeQuiz': 'Take Practice Quiz →',

    // Brand
    'brand.title': 'LearnAble',
    'brand.subtitle': 'Learning Disability Awareness & Support',

    // Disclaimer & Footer
    'disclaimer.title': 'Important Educational Disclaimer:',
    'disclaimer.body': 'This portal is for educational awareness and guidance only. It does NOT provide clinical diagnosis, medical evaluation, or treatment. For formal diagnosis, always consult a qualified clinical psychologist, special educator, or developmental pediatrician.',
    'footer.mission': 'LearnAble is a Community Engagement Project (B.Sc. IT) dedicated to building inclusive understanding, practical strategies, and verified support resources for learning differences.',
    'footer.quickLinks': 'Quick Links',
    'footer.project': 'Academic Project',
    'footer.projectSub': 'Community Engagement Project | B.Sc. IT',
    'footer.rights': 'Educational Open Source Project.',

    // Feedback
    'feedback.heading': 'Community Feedback',
    'feedback.subheading': 'Help us improve by sharing your thoughts, experiences, and suggestions.',
    'feedback.nameLabel': 'Your Name (Optional)',
    'feedback.namePlaceholder': 'e.g., Rohit Sharma (Leave blank for Anonymous)',
    'feedback.roleLabel': 'Who are you? *',
    'feedback.roleSelect': '-- Select your role --',
    'feedback.roleLearner': 'I am a Learner / Student',
    'feedback.roleParent': 'I am a Parent / Caregiver',
    'feedback.roleEducator': 'I am an Educator / Teacher',
    'feedback.roleOther': 'Other Community Member',
    'feedback.ratingLabel': 'How helpful was this portal? *',
    'feedback.rating1': '1 - Not helpful',
    'feedback.rating2': '2 - Somewhat helpful',
    'feedback.rating3': '3 - Helpful',
    'feedback.rating4': '4 - Very helpful',
    'feedback.rating5': '5 - Extremely helpful',
    'feedback.textLabel': 'Your Feedback *',
    'feedback.textPlaceholder': 'Please share your thoughts on the portal content and usability...',
    'feedback.charLimit1000': 'Maximum 1000 characters',
    'feedback.suggestLabel': 'What topics or resources should we add?',
    'feedback.suggestPlaceholder': 'Suggest new learning strategies, local organizations, or features...',
    'feedback.charLimit500': 'Maximum 500 characters',
    'feedback.privacyNote': '🔒 Privacy Notice: We do not collect sensitive child information or sell your data. Your input directly helps improve accessibility for everyone.',
    'feedback.successTitle': 'Thank You for Your Feedback!',
    'feedback.successBody': 'Your response has been securely recorded. Together, we are creating a more inclusive learning environment for every student.',

    // Quiz
    'quiz.heading': 'Learning Differences Awareness Activity',
    'quiz.subheading': 'An interactive, non-diagnostic quiz to check and build your understanding of learning disabilities.',
    'quiz.questionOf': 'Question',
    'quiz.of': 'of',
    'quiz.resultTitle': 'Your Activity Results',
    'quiz.scoreSummary': 'Your Awareness Score',
    'quiz.whatMeans': 'What Your Result Means',
    'quiz.suggestedResources': 'Recommended Learning Resources',
    'quiz.reviewTitle': 'Review Your Responses',
    'quiz.correctBadge': 'Correct',
    'quiz.incorrectBadge': 'Incorrect',
    'quiz.yourAnswer': 'Your response:',
    'quiz.correctAnswer': 'Correct answer:',

    // Resources
    'res.heading': 'Verified Support Directory',
    'res.subheading': 'Explore verified organizations, screening frameworks, and inclusive teaching resources.',
    'res.searchPlaceholder': 'Search by resource name or description...',
    'res.allCategories': 'All Categories',
    'res.emptyTitle': 'No resources found matching your search.',
    'res.emptyText': 'Try adjusting your search terms or selecting "All Categories".'
  },

  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'परिचय',
    'nav.learningAreas': 'सीखने के क्षेत्र',
    'nav.assessment': 'मार्गदर्शिका',
    'nav.support': 'सहायता मार्ग',
    'nav.learner': 'विद्यार्थी सहायता',
    'nav.parent': 'अभिभावक सहायता',
    'nav.educator': 'शिक्षक सहायता',
    'nav.activities': 'गतिविधियां',
    'nav.resources': 'संसाधन',
    'nav.faq': 'अक्सर पूछे जाने वाले सवाल',
    'nav.feedback': 'प्रतिक्रिया',
    'nav.admin': 'प्रशासक पोर्टल',
    'nav.logout': 'लॉगआउट',

    // Buttons
    'btn.learnMore': 'और जानें',
    'btn.exploreAreas': 'सीखने के क्षेत्र देखें',
    'btn.startActivity': 'गतिविधि शुरू करें',
    'btn.viewResources': 'संसाधन देखें',
    'btn.submitFeedback': 'प्रतिक्रिया भेजें',
    'btn.submitting': 'भेजा जा रहा है...',
    'btn.next': 'आगे बढ़ें',
    'btn.previous': 'पिछला',
    'btn.finish': 'पूर्ण करें',
    'btn.restart': 'गतिविधि पुनः शुरू करें',
    'btn.reviewAnswers': 'उत्तरों की समीक्षा करें',
    'btn.visitResource': 'संसाधन पर जाएं',
    'btn.login': 'लॉग इन करें',
    'btn.addResource': 'नया संसाधन जोड़ें',
    'btn.delete': 'हटाएं',
    'btn.cancel': 'रद्द करें',
    'btn.exportCsv': 'CSV डाउनलोड करें',
    'btn.backHome': 'होम पेज पर जाएं',
    'btn.takeQuiz': 'प्रश्नोत्तरी में अभ्यास करें →',

    // Brand
    'brand.title': 'LearnAble',
    'brand.subtitle': 'अधिगम अक्षमता जागरूकता एवं सहायता',

    // Disclaimer & Footer
    'disclaimer.title': 'महत्वपूर्ण शैक्षणिक अस्वीकरण:',
    'disclaimer.body': 'यह पोर्टल केवल शैक्षणिक जागरूकता और मार्गदर्शन के लिए है। यह कोई मेडिकल जांच या क्लिनिकल निदान प्रदान नहीं करता है। औपचारिक निदान के लिए हमेशा योग्य मनोवैज्ञानिक, विशेष शिक्षक या बाल रोग विशेषज्ञ से परामर्श लें।',
    'footer.mission': 'LearnAble एक कम्युनिटी एंगेजमेंट प्रोजेक्ट (B.Sc. IT) है, जिसका उद्देश्य सीखने की विविधताओं के प्रति जागरूकता और प्रामाणिक संसाधन प्रदान करना है।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.project': 'शैक्षणिक परियोजना',
    'footer.projectSub': 'कम्युनिटी एंगेजमेंट प्रोजेक्ट | B.Sc. IT',
    'footer.rights': 'शैक्षणिक ओपन-सोर्स प्रोजेक्ट।',

    // Feedback
    'feedback.heading': 'आपकी प्रतिक्रिया',
    'feedback.subheading': 'अपने विचार और सुझाव साझा करके इस पोर्टल को बेहतर बनाने में हमारी सहायता करें।',
    'feedback.nameLabel': 'आपका नाम (वैकल्पिक)',
    'feedback.namePlaceholder': 'उदा. रोहित शर्मा (गुमनाम रहने के लिए खाली छोड़ें)',
    'feedback.roleLabel': 'आपकी भूमिका क्या है? *',
    'feedback.roleSelect': '-- अपनी भूमिका चुनें --',
    'feedback.roleLearner': 'मैं एक छात्र / शिक्षार्थी हूँ',
    'feedback.roleParent': 'मैं एक माता-पिता / अभिभावक हूँ',
    'feedback.roleEducator': 'मैं एक शिक्षक / शिक्षिका हूँ',
    'feedback.roleOther': 'अन्य समुदाय सदस्य',
    'feedback.ratingLabel': 'यह पोर्टल आपके लिए कितना उपयोगी रहा? *',
    'feedback.rating1': '1 - उपयोगी नहीं',
    'feedback.rating2': '2 - थोड़ा उपयोगी',
    'feedback.rating3': '3 - उपयोगी',
    'feedback.rating4': '4 - बहुत उपयोगी',
    'feedback.rating5': '5 - अत्यंत उपयोगी',
    'feedback.textLabel': 'आपकी प्रतिक्रिया *',
    'feedback.textPlaceholder': 'कृपया पोर्टल की सामग्री और उपयोगिता पर अपने विचार साझा करें...',
    'feedback.charLimit1000': 'अधिकतम 1000 अक्षर',
    'feedback.suggestLabel': 'हमें क्या नई जानकारी या संसाधन जोड़ने चाहिए?',
    'feedback.suggestPlaceholder': 'सीखने की नई तकनीकें या उपयोगी संस्थाएं सुझाएं...',
    'feedback.charLimit500': 'अधिकतम 500 अक्षर',
    'feedback.privacyNote': '🔒 गोपनीयता सूचना: हम कोई भी संवेदनशील डेटा या बच्चों की निजी जानकारी एकत्र नहीं करते हैं।',
    'feedback.successTitle': 'प्रतिक्रिया के लिए धन्यवाद!',
    'feedback.successBody': 'आपकी प्रतिक्रिया सफलतापूर्वक दर्ज कर ली गई है। आपका सहयोग समावेशी शिक्षा को बढ़ावा देने में अत्यंत मूल्यवान है।',

    // Quiz
    'quiz.heading': 'जागरूकता गतिविधि एवं प्रश्नोत्तरी',
    'quiz.subheading': 'अधिगम अक्षमताओं को समझने के लिए एक गैर-नैदानिक संवादात्मक गतिविधि।',
    'quiz.questionOf': 'प्रश्न',
    'quiz.of': 'का',
    'quiz.resultTitle': 'गतिविधि का परिणाम',
    'quiz.scoreSummary': 'आपका जागरूकता स्कोर',
    'quiz.whatMeans': 'इस परिणाम का क्या अर्थ है',
    'quiz.suggestedResources': 'सुझाए गए शिक्षण संसाधन',
    'quiz.reviewTitle': 'अपने उत्तरों की समीक्षा करें',
    'quiz.correctBadge': 'सही',
    'quiz.incorrectBadge': 'गलत',
    'quiz.yourAnswer': 'आपका उत्तर:',
    'quiz.correctAnswer': 'सही उत्तर:',

    // Resources
    'res.heading': 'सत्यापित सहायता निर्देशिका',
    'res.subheading': 'प्रमाणित शैक्षणिक संस्थाएं, जांच दिशानिर्देश और समावेशी शिक्षण संसाधन खोजें।',
    'res.searchPlaceholder': 'संसाधन के नाम या विवरण से खोजें...',
    'res.allCategories': 'सभी श्रेणियां',
    'res.emptyTitle': 'कोई संसाधन नहीं मिला।',
    'res.emptyText': 'कृपया अन्य शब्द खोजें या "सभी श्रेणियां" चुनें।'
  },

  mr: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'माहिती',
    'nav.learningAreas': 'शिकण्याचे कार्यक्षेत्र',
    'nav.assessment': 'मार्गदर्शक',
    'nav.support': 'मदत पर्याय',
    'nav.learner': 'विद्यार्थी मदत',
    'nav.parent': 'पालक मदत',
    'nav.educator': 'शिक्षक मदत',
    'nav.activities': 'उपक्रम',
    'nav.resources': 'साधने व स्त्रोत',
    'nav.faq': 'नेहमी विचारले जाणारे प्रश्न',
    'nav.feedback': 'अभिप्राय',
    'nav.admin': 'प्रशासक पोर्टल',
    'nav.logout': 'लॉगआउट',

    // Buttons
    'btn.learnMore': 'अधिक जाणून घ्या',
    'btn.exploreAreas': 'शिकण्याची क्षेत्रे पहा',
    'btn.startActivity': 'उपक्रम सुरू करा',
    'btn.viewResources': 'साधने पहा',
    'btn.submitFeedback': 'अभिप्राय पाठवा',
    'btn.submitting': 'पाठवत आहे...',
    'btn.next': 'पुढे',
    'btn.previous': 'मागे',
    'btn.finish': 'पूर्ण करा',
    'btn.restart': 'उपक्रम पुन्हा सुरू करा',
    'btn.reviewAnswers': 'उत्तरांचे पुनरावलोकन करा',
    'btn.visitResource': 'स्त्रोत पहा',
    'btn.login': 'साइन इन',
    'btn.addResource': 'नवीन साधन जोडा',
    'btn.delete': 'हटवा',
    'btn.cancel': 'रद्द करा',
    'btn.exportCsv': 'CSV डाऊनलोड करा',
    'btn.backHome': 'मुख्य पानावर जा',
    'btn.takeQuiz': 'सराव प्रश्नमंजुषा सोडवा →',

    // Brand
    'brand.title': 'LearnAble',
    'brand.subtitle': 'शिकण्यातील अडचणी - जनजागृती व मार्गदर्शन',

    // Disclaimer & Footer
    'disclaimer.title': 'महत्त्वाचा शैक्षणिक अस्वीकरण:',
    'disclaimer.body': 'हे पोर्टल केवळ शैक्षणिक जागरूकता आणि मार्गदर्शनासाठी आहे. हे कोणत्याही वैद्यकीय तपासणीचा पर्याय नाही. औपचारिक निदानासाठी नेहमी पात्र मानसशास्त्रज्ञ, विशेष शिक्षक किंवा बालरोगतज्ज्ञांचा सल्ला घ्यावा.',
    'footer.mission': 'LearnAble हा B.Sc. IT अंतर्गत एक कम्युनिटी एंगेजमेंट प्रकल्प आहे, ज्याचा उद्देश शिकण्यातील विविधतेबद्दल आदर आणि शास्त्रीय मदत उपलब्ध करून देणे हा आहे.',
    'footer.quickLinks': 'महत्त्वाचे दुवे',
    'footer.project': 'शैक्षणिक प्रकल्प',
    'footer.projectSub': 'कम्युनिटी एंगेजमेंट प्रकल्प | B.Sc. IT',
    'footer.rights': 'शैक्षणिक मुक्त स्त्रोत प्रकल्प.',

    // Feedback
    'feedback.heading': 'आपला अभिप्राय',
    'feedback.subheading': 'आपले विचार आणि सूचना मांडून हे पोर्टल अधिक उपयुक्त बनवण्यासाठी मदत करा.',
    'feedback.nameLabel': 'आपले नाव (ऐच्छिक)',
    'feedback.namePlaceholder': 'उदा. रोहित शर्मा (अनामिक राहण्यासाठी रिकामे ठेवा)',
    'feedback.roleLabel': 'आपली भूमिका काय आहे? *',
    'feedback.roleSelect': '-- आपली भूमिका निवडा --',
    'feedback.roleLearner': 'मी एक विद्यार्थी / शिकणारा आहे',
    'feedback.roleParent': 'मी पालक / काळजीवाहक आहे',
    'feedback.roleEducator': 'मी एक शिक्षक / शिक्षिका आहे',
    'feedback.roleOther': 'इतर समुदाय सदस्य',
    'feedback.ratingLabel': 'हे पोर्टल आपल्यासाठी किती उपयुक्त ठरले? *',
    'feedback.rating1': '1 - उपयुक्त नाही',
    'feedback.rating2': '2 - थोडे उपयुक्त',
    'feedback.rating3': '3 - उपयुक्त',
    'feedback.rating4': '4 - खूप उपयुक्त',
    'feedback.rating5': '5 - अत्यंत उपयुक्त',
    'feedback.textLabel': 'आपला अभिप्राय *',
    'feedback.textPlaceholder': 'पोर्टलमधील माहिती व सुलभतेबद्दल आपले मत नोंदवा...',
    'feedback.charLimit1000': 'जास्तीत जास्त 1000 अक्षरे',
    'feedback.suggestLabel': 'आम्ही कोणती नवीन माहिती किंवा साधने समाविष्ट करावीत?',
    'feedback.suggestPlaceholder': 'शिकण्याच्या पद्धती किंवा उपयुक्त संस्था सुचवा...',
    'feedback.charLimit500': 'जास्तीत जास्त 500 अक्षरे',
    'feedback.privacyNote': '🔒 गोपनीयता सूचना: आम्ही कोणतीही खाजगी किंवा मुलांची संवेदनशील माहिती गोळा करत नाही.',
    'feedback.successTitle': 'अभिप्रायाबद्दल धन्यवाद!',
    'feedback.successBody': 'आपला अभिप्राय सुरक्षितपणे नोंदवला गेला आहे. सर्वसमावेशक शिक्षणासाठी आपले योगदान मोलाचे आहे.',

    // Quiz
    'quiz.heading': 'जागरूकता उपक्रम व प्रश्नमंजुषा',
    'quiz.subheading': 'शिकण्यातील अडचणी समजून घेण्यासाठी एक परस्परसंवादी, अनौपचारिक उपक्रम.',
    'quiz.questionOf': 'प्रश्न',
    'quiz.of': 'पैकी',
    'quiz.resultTitle': 'आपला निकाल',
    'quiz.scoreSummary': 'आपला जागरूकता गुण',
    'quiz.whatMeans': 'या निकालाचा अर्थ काय?',
    'quiz.suggestedResources': 'शिफारस केलेली शैक्षणिक साधने',
    'quiz.reviewTitle': 'आपल्या प्रतिसादांचे पुनरावलोकन',
    'quiz.correctBadge': 'बरोबर',
    'quiz.incorrectBadge': 'चूक',
    'quiz.yourAnswer': 'आपले उत्तर:',
    'quiz.correctAnswer': 'योग्य उत्तर:',

    // Resources
    'res.heading': 'सत्यापित मदत स्त्रोत व संस्था',
    'res.subheading': 'प्रमाणित शैक्षणिक संस्था, चाचणी मार्गदर्शक आणि सर्वसमावेशक अध्यापन साधने शोधा.',
    'res.searchPlaceholder': 'नाव किंवा वर्णनानुसार शोधा...',
    'res.allCategories': 'सर्व वर्गवारी',
    'res.emptyTitle': 'कोणतेही साधन आढळले नाही.',
    'res.emptyText': 'कृपया वेगळा शब्द शोधा किंवा "सर्व वर्गवारी" निवडा.'
  }
};

/**
 * Comprehensive Content Map for Deep Page Translation (Index, About, FAQs, Learning Areas, Pathways)
 * Maps common text phrases to Hindi and Marathi translations.
 */
const contentMap = {
  // Common Hero Texts
  'Community Engagement Project | B.Sc. IT': {
    hi: 'कम्युनिटी एंगेजमेंट प्रोजेक्ट | B.Sc. IT',
    mr: 'कम्युनिटी एंगेजमेंट प्रकल्प | B.Sc. IT'
  },
  'Understanding Learning Differences Starts With Awareness': {
    hi: 'सीखने की विभिन्नताओं को समझना, जागरूकता से शुरू होता है',
    mr: 'शिकण्यातील भिन्नता समजून घेणे, जागरूकतेपासून सुरू होते'
  },
  'Learn about learning disabilities, explore evidence-based educational strategies, understand the assessment pathway, and connect with verified support resources.': {
    hi: 'अधिगम अक्षमताओं के बारे में जानें, प्रामाणिक शिक्षण रणनीतियां अपनाएं, मूल्यांकन प्रक्रिया को समझें और सत्यापित सहायता संसाधनों से जुड़ें।',
    mr: 'शिकण्यातील अडचणींबद्दल जाणून घ्या, पुराव्यांवर आधारित अध्यापन पद्धती शोधा, तपासणी प्रक्रिया समजून घ्या आणि सत्यापित सहाय्यक साधनांशी जोडा.'
  },
  "I'm a Learner": {
    hi: 'मैं एक छात्र हूँ',
    mr: 'मी एक विद्यार्थी आहे'
  },
  "I'm a Parent / Caregiver": {
    hi: 'मैं माता-पिता / अभिभावक हूँ',
    mr: 'मी पालक / काळजीवाहक आहे'
  },
  "I'm an Educator": {
    hi: 'मैं एक शिक्षक हूँ',
    mr: 'मी एक शिक्षक आहे'
  },
  'Explore Resources': {
    hi: 'संसाधन देखें',
    mr: 'साधने पहा'
  },
  'Personalized Guidance': {
    hi: 'व्यक्तिगत मार्गदर्शन',
    mr: 'वैयक्तिक मार्गदर्शन'
  },
  'Choose Your Support Pathway': {
    hi: 'अपना सहायता मार्ग चुनें',
    mr: 'आपला मदत पर्याय निवडा'
  },
  'I am a Learner': {
    hi: 'मैं एक विद्यार्थी हूँ',
    mr: 'मी एक विद्यार्थी आहे'
  },
  'Study strategies, reading and writing accommodations, memory techniques, and exam confidence-building tips.': {
    hi: 'अध्ययन रणनीतियां, पढ़ने और लिखने में सहायता, स्मरण तकनीकें और परीक्षा आत्मविश्वास बढ़ाने के उपाय।',
    mr: 'अभ्यासाच्या पद्धती, वाचन आणि लेखनातील सोयी, स्मरणशक्तीच्या युक्त्या आणि परीक्षेसाठी आत्मविश्वास वाढवण्याच्या टिप्स.'
  },
  'I am a Parent / Caregiver': {
    hi: 'मैं माता-पिता / अभिभावक हूँ',
    mr: 'मी पालक / काळजीवाहक आहे'
  },
  'Practical guidance on positive communication, supportive homework routines, and navigating professional assessment.': {
    hi: 'सकारात्मक संवाद, होमवर्क में सहयोग और पेशेवर जांच प्रक्रिया के लिए व्यावहारिक मार्गदर्शन।',
    mr: 'सकारात्मक संवाद, गृहपाठात मदत आणि व्यावसायिक तपासणी प्रक्रियेसाठी उपयुक्त मार्गदर्शन.'
  },
  'I am an Educator': {
    hi: 'मैं एक शिक्षक हूँ',
    mr: 'मी एक शिक्षक आहे'
  },
  'Inclusive classroom methods, differentiated instruction techniques, and collaborative parent-teacher strategies.': {
    hi: 'समावेशी कक्षा पद्धतियां, विभेदित शिक्षण तकनीकें और शिक्षक-अभिभावक सहयोग रणनीतियां।',
    mr: 'सर्वसमावेशक वर्ग पद्धती, वैविध्यपूर्ण अध्यापन तंत्रे आणि पालक-शिक्षक सहकार्याच्या पद्धती.'
  },

  // What Are Learning Disabilities
  'Core Understanding': {
    hi: 'मूलभूत समझ',
    mr: 'मूलभूत संकल्पना'
  },
  'What Are Learning Disabilities?': {
    hi: 'अधिगम अक्षमता (Learning Disabilities) क्या हैं?',
    mr: 'शिकण्यातील अडचणी (Learning Disabilities) म्हणजे काय?'
  },
  "A learning disability is a neurological difference in how an individual's brain receives, processes, and communicates information. It may affect reading (dyslexia), writing (dysgraphia), or mathematical calculations (dyscalculia).": {
    hi: 'अधिगम अक्षमता मस्तिष्क द्वारा जानकारी प्राप्त करने, संसाधित करने और संवाद करने में एक तंत्रिका संबंधी (न्यूरोलॉजिकल) अंतर है। यह पढ़ने (डिस्लेक्सिया), लिखने (डिस्ग्राफिया), या गणितीय गणना (डिस्कैल्क्युलिया) को प्रभावित कर सकता है।',
    mr: 'शिकण्यातील अडचण हा मेंदूद्वारे माहिती ग्रहण करणे, प्रक्रिया करणे आणि संवाद साधण्यातील एक न्यूरोलॉजिकल फरक आहे. याचा परिणाम वाचन (डिस्लेक्सिया), लेखन (डिस्ग्राफिया), किंवा गणितीय आकडेमोड (डिस्कॅल्क्युलिया) यावर होऊ शकतो.'
  },
  "These difficulties are persistent and may impact academic performance, but they do NOT indicate low intelligence or lack of motivation. With early identification and structured accommodations, students thrive.": {
    hi: 'ये चुनौतियां निरंतर रह सकती हैं और शैक्षणिक प्रदर्शन को प्रभावित कर सकती हैं, लेकिन ये कम बुद्धिमत्ता या प्रेरणा की कमी का संकेत बिल्कुल नहीं हैं। समय पर पहचान और सही सहायता से विद्यार्थी उत्कृष्ट प्रदर्शन करते हैं।',
    mr: 'या अडचणी सतत राहू शकतात आणि शालेय प्रगतीवर परिणाम करू शकतात, परंतु याचा अर्थ कमी बुद्धिमत्ता किंवा प्रयत्नांची कमतरता असा अजिबात नाही. वेळेवर ओळख आणि योग्य मदतीने विद्यार्थी उत्तम प्रगती करतात.'
  },
  'Key Takeaway': {
    hi: 'प्रमुख निष्कर्ष',
    mr: 'महत्त्वाचा मुद्दा'
  },
  'Intelligence and learning speed are independent. A student facing challenges in one specific academic area can have exceptional capabilities in creative thinking, visual problem solving, or leadership.': {
    hi: 'बुद्धिमत्ता और सीखने की गति एक दूसरे से स्वतंत्र हैं। किसी विशिष्ट क्षेत्र में कठिनाई का सामना करने वाला छात्र रचनात्मक सोच, दृश्य समस्या समाधान या नेतृत्व में असाधारण हो सकता है।',
    mr: 'बुद्धिमत्ता आणि शिकण्याचा वेग स्वतंत्र असतात. एखाद्या विशिष्ट विषयात अडचण असणारा विद्यार्थी सर्जनशील विचार, दृश्य समस्या निराकरण किंवा नेतृत्वात अत्यंत कुशल असू शकतो.'
  },

  // Common Learning Areas
  'Academic Impact': {
    hi: 'शैक्षणिक प्रभाव',
    mr: 'शैक्षणिक परिणाम'
  },
  'Common Learning Areas': {
    hi: 'सीखने के प्रमुख क्षेत्र',
    mr: 'शिकण्याचे प्रमुख क्षेत्र'
  },
  'Reading': {
    hi: 'वाचन (Reading)',
    mr: 'वाचन (Reading)'
  },
  'Possible difficulty decoding phonics, reading fluency, and text comprehension.': {
    hi: 'ध्वनि पहचान (फोनिक्स), पढ़ने की धाराप्रवाह गति और पाठ को समझने में संभावित कठिनाई।',
    mr: 'ध्वनी ओळख (फोनिक्स), वाचनाचा वेग आणि मजकूर समजून घेण्यात संभाव्य अडचण.'
  },
  'Writing': {
    hi: 'लेखन (Writing)',
    mr: 'लेखन (Writing)'
  },
  'Possible difficulty with letter formation, spatial spacing, or written expression.': {
    hi: 'अक्षरों की बनावट, उचित स्थान छोड़ने और लिखित अभिव्यक्ति में संभावित कठिनाई।',
    mr: 'अक्षरांचे वळण, योग्य अंतर ठेवणे आणि लिखित अभिव्यक्तीमध्ये संभाव्य अडचण.'
  },
  'Spelling': {
    hi: 'वर्तनी (Spelling)',
    mr: 'शुद्धलेखन (Spelling)'
  },
  'Possible difficulty recalling phoneme patterns and visual word memory.': {
    hi: 'शब्दों के पैटर्न याद रखने और दृष्टि आधारित शब्द स्मृति में संभावित कठिनाई।',
    mr: 'शब्दांचे नमुने लक्षात ठेवणे आणि दृश्य शब्द स्मरणात संभाव्य अडचण.'
  },
  'Comprehension': {
    hi: 'समझ / अर्थग्रहण (Comprehension)',
    mr: 'आकलन / अर्थग्रहण (Comprehension)'
  },
  'Possible difficulty retaining multi-step verbal or written instructions.': {
    hi: 'बहु-चरणीय मौखिक या लिखित निर्देशों को याद रखने में संभावित कठिनाई।',
    mr: 'एकाहून अधिक टप्प्यांच्या तोंडी किंवा लेखी सूचना लक्षात ठेवण्यात संभाव्य अडचण.'
  },
  'Mathematics': {
    hi: 'गणित (Mathematics)',
    mr: 'गणित (Mathematics)'
  },
  'Possible difficulty with number sense, arithmetic facts, or time concepts.': {
    hi: 'संख्या बोध, बुनियादी गणितीय तथ्य या समय की अवधारणाओं में संभावित कठिनाई।',
    mr: 'संख्या ज्ञान, मूलभूत गणिती सूत्रे किंवा वेळेच्या संकल्पनांमध्ये संभाव्य अडचण.'
  },

  // Our Mission
  'Our Mission': {
    hi: 'हमारा उद्देश्य',
    mr: 'आमचे ध्येय'
  },
  'Support That Is Clear, Respectful, and Practical': {
    hi: 'स्पष्ट, सम्मानजनक और व्यावहारिक सहयोग',
    mr: 'स्पष्ट, आदरयुक्त आणि व्यावहारिक सहकार्य'
  },
  'Awareness': {
    hi: 'जागरूकता (Awareness)',
    mr: 'जनजागृती (Awareness)'
  },
  'Accessible information demystifying learning differences and breaking stigma.': {
    hi: 'सीखने की विभिन्नताओं को सरल भाषा में समझाना और सामाजिक भ्रांतियों को दूर करना।',
    mr: 'शिकण्यातील फरकांबद्दल सोप्या भाषेत माहिती देणे आणि गैरसमज दूर करणे.'
  },
  'Empathy': {
    hi: 'संवेदनशीलता (Empathy)',
    mr: 'संवेदनशीलता (Empathy)'
  },
  'Validating each student’s unique learning journey without deficit-based labeling.': {
    hi: 'प्रत्येक छात्र की अनूठी सीखने की यात्रा का सम्मान करना बिना किसी नकारात्मक लेबल के।',
    mr: 'कोणतेही नकारात्मक लेबल न लावता प्रत्येक विद्यार्थ्याच्या शिकण्याच्या प्रवासाचा आदर करणे.'
  },
  'Action': {
    hi: 'व्यावहारिक कदम (Action)',
    mr: 'कृती (Action)'
  },
  'Concrete, evidence-based accommodations for homes, classrooms, and study spaces.': {
    hi: 'घर, कक्षा और अध्ययन कक्ष के लिए प्रामाणिक और लागू करने योग्य सहायता उपाय।',
    mr: 'घर, वर्ग आणि अभ्यासाच्या जागेसाठी ठोस आणि उपयुक्त मदत उपाय.'
  },
  'Growth': {
    hi: 'सतत विकास (Growth)',
    mr: 'सर्वांगीण विकास (Growth)'
  },
  'Fostering self-advocacy, confidence, and lifelong learning success for every child.': {
    hi: 'प्रत्येक बच्चे में आत्मविश्वास, आत्म-वकालत और आजीवन सीखने की प्रेरणा जगाना।',
    mr: 'प्रत्येक मुलामध्ये आत्मविश्वास, स्वतःचे हक्क मांडण्याची क्षमता आणि शिकण्याची आवड निर्माण करणे.'
  },

  // Why Awareness Matters
  'Why Awareness Matters': {
    hi: 'जागरूकता क्यों महत्वपूर्ण है?',
    mr: 'जनजागृती का महत्त्वाची आहे?'
  },
  'Early Understanding Changes Everything': {
    hi: 'प्रारंभिक समझ सब कुछ बदल देती है',
    mr: 'सुरुवातीचे योग्य आकलन सर्वकाही बदलू शकते'
  },
  'Early Identification': {
    hi: 'समय पर पहचान',
    mr: 'वेळेवर ओळख'
  },
  'Recognizing learning patterns early prevents years of academic frustration and emotional distress.': {
    hi: 'सीखने के पैटर्न को जल्दी पहचानने से कई वर्षों की शैक्षणिक निराशा और तनाव से बचा जा सकता है।',
    mr: 'शिकण्याच्या पद्धती लवकर ओळखल्यास वर्षानुवर्षे होणारी शैक्षणिक निराशा आणि भावनिक ताण टाळता येतो.'
  },
  'Stigma Reduction': {
    hi: 'सामाजिक भ्रांतियों का निवारण',
    mr: 'गैरसमज दूर करणे'
  },
  'Open conversations help families and peers recognize that differences are not deficits.': {
    hi: 'सकारात्मक चर्चा परिवारों और साथियों को यह समझने में मदद करती है कि अंतर का मतलब कमी नहीं है।',
    mr: 'मोकळा संवाद कुटुंब आणि मित्रांना हे समजून देतो की भिन्नता म्हणजे कमतरता नाही.'
  },
  'Right-Fit Strategies': {
    hi: 'सटीक शिक्षण रणनीतियां',
    mr: 'योग्य पद्धतींचा अवलंब'
  },
  'Targeted accommodations empower students to learn in ways aligned with their cognitive strengths.': {
    hi: 'लक्षित सहायता उपाय छात्रों को उनकी बौद्धिक क्षमताओं के अनुसार सीखने में सक्षम बनाते हैं।',
    mr: 'योग्य मदत पद्धती विद्यार्थ्यांना त्यांच्या बौद्धिक क्षमतेनुसार शिकण्यासाठी सक्षम करतात.'
  },

  // Interactive Quiz CTA
  'Interactive Learning Activity': {
    hi: 'संवादात्मक शिक्षण गतिविधि',
    mr: 'परस्परसंवादी शैक्षणिक उपक्रम'
  },
  'Check Your Understanding with Our Interactive Activity': {
    hi: 'हमारी संवादात्मक गतिविधि से अपनी समझ परखें',
    mr: 'आमच्या परस्परसंवादी उपक्रमाद्वारे आपले आकलन तपासा'
  },
  'Test your knowledge about learning disabilities through 10 scenario-based questions designed for learners, parents, and educators.': {
    hi: 'छात्रों, अभिभावकों और शिक्षकों के लिए तैयार किए गए 10 व्यावहारिक परिदृश्य आधारित प्रश्नों से अपना ज्ञान परखें।',
    mr: 'विद्यार्थी, पालक आणि शिक्षकांसाठी तयार केलेल्या 10 परिस्थिती-आधारित प्रश्नांद्वारे आपले ज्ञान तपासा.'
  },
  'Start Awareness Activity →': {
    hi: 'जागरूकता गतिविधि शुरू करें →',
    mr: 'जागरूकता उपक्रम सुरू करा →'
  },

  // Learning Areas Page Specifics
  'Academic Support Guide': {
    hi: 'शैक्षणिक सहायता मार्गदर्शिका',
    mr: 'शैक्षणिक मदत मार्गदर्शक'
  },
  'Practical exploration of core academic domains, observable classroom indicators, and evidence-based supportive strategies.': {
    hi: 'प्रमुख शैक्षणिक क्षेत्रों, कक्षा में दिखाई देने वाले संकेतों और व्यावहारिक शिक्षण रणनीतियों का अन्वेषण।',
    mr: 'प्रमुख शैक्षणिक विषय, वर्गात दिसणारी लक्षणे आणि उपयुक्त अध्यापन पद्धतींचा अभ्यास.'
  },
  'All Areas': {
    hi: 'सभी क्षेत्र',
    mr: 'सर्व क्षेत्र'
  },
  'Observable Indicators (Home & School)': {
    hi: '🔍 देखने योग्य संकेत (घर एवं विद्यालय)',
    mr: '🔍 दिसणारी लक्षणे (घर व शाळा)'
  },
  'Evidence-Based Supportive Strategies': {
    hi: '💡 व्यावहारिक एवं प्रामाणिक सहयोग रणनीतियां',
    mr: '💡 उपयुक्त व शास्त्रीय मदत पद्धती'
  },
  'When to Seek Consultation': {
    hi: '🩺 विशेषज्ञ से कब परामर्श लें?',
    mr: '🩺 तज्ज्ञांचा सल्ला कधी घ्यावा?'
  },
  'Important Contextual Guidance': {
    hi: 'महत्वपूर्ण संदर्भ मार्गदर्शन',
    mr: 'महत्त्वाचे संदर्भ मार्गदर्शन'
  },
  'These academic areas represent common manifestations of learning differences. A student experiencing difficulty in one of these areas does NOT automatically have a clinical disability. Difficulties can stem from instruction pace, linguistic transitions, or stress.': {
    hi: 'ये शैक्षणिक क्षेत्र सीखने की विभिन्नताओं की सामान्य अभिव्यक्तियां हैं। किसी क्षेत्र में कठिनाई का अनुभव करने वाले छात्र को स्वतः कोई क्लिनिकल अक्षमता नहीं होती। कठिनाई शिक्षण की गति, भाषाई बदलाव या तनाव से भी हो सकती है।',
    mr: 'ही शैक्षणिक क्षेत्रे शिकण्यातील भिन्नतेची सामान्य रूपे आहेत. एखाद्या विषयात अडचण येणाऱ्या विद्यार्थ्याला आपोआपच कोणतीही अक्षमता नसते. या अडचणी शिकवण्याचा वेग, भाषेतील बदल किंवा तणावामुळेही असू शकतात.'
  },
  'Learner Pathway →': {
    hi: 'विद्यार्थी मार्गदर्शन →',
    mr: 'विद्यार्थी मार्गदर्शन →'
  },
  'Parent Pathway →': {
    hi: 'पालक मार्गदर्शन →',
    mr: 'पालक मार्गदर्शन →'
  },
  'Educator Pathway →': {
    hi: 'शिक्षक मार्गदर्शन →',
    mr: 'शिक्षक मार्गदर्शन →'
  }
};

/**
 * Dynamically loads Google Font 'Noto Sans Devanagari' when Hindi or Marathi is selected
 */
function ensureDevanagariFont() {
  if (document.getElementById('noto-devanagari-font')) return;
  const link = document.createElement('link');
  link.id = 'noto-devanagari-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}

/**
 * Returns translated string for a given key in current or specified language
 */
function t(key, lang) {
  const currentLang = lang || getCurrentLanguage();
  const langDict = translations[currentLang] || translations.en;
  return langDict[key] || translations.en[key] || key;
}

/**
 * Gets currently active language from localStorage (defaults to 'en')
 */
function getCurrentLanguage() {
  return localStorage.getItem('learnable_language') || 'en';
}

/**
 * Translates content across all elements using both [data-i18n] attributes
 * and deep text content mapping.
 */
function applyLanguage(lang) {
  const targetLang = ['en', 'hi', 'mr'].includes(lang) ? lang : 'en';
  localStorage.setItem('learnable_language', targetLang);
  document.documentElement.lang = targetLang;

  // Toggle font support for Devanagari
  if (targetLang === 'hi' || targetLang === 'mr') {
    ensureDevanagariFont();
    document.body.classList.add('lang-devanagari');
  } else {
    document.body.classList.remove('lang-devanagari');
  }

  // 1. Translate all [data-i18n] elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key, targetLang);

    if (el.hasAttribute('data-i18n-attr')) {
      const attr = el.getAttribute('data-i18n-attr');
      el.setAttribute(attr, translated);
    } else {
      el.textContent = translated;
    }
  });

  // 2. Translate text nodes using contentMap for comprehensive full-page coverage
  translatePageContent(targetLang);

  // 3. Sync any language selector dropdown on the page
  const selectors = document.querySelectorAll('#languageSelector, .language-selector select');
  selectors.forEach((sel) => {
    if (sel.value !== targetLang) {
      sel.value = targetLang;
    }
  });
}

/**
 * Deep text translation engine using contentMap
 */
function translatePageContent(targetLang) {
  const candidates = document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main .eyebrow, main .btn, main a.info-card h3, main .learning-card-tag, main .learning-block-title, main .disclaimer-box span');

  candidates.forEach((el) => {
    // Skip elements that already have explicit data-i18n
    if (el.hasAttribute('data-i18n')) return;

    // Cache original English text on first visit
    if (!el.hasAttribute('data-original-en')) {
      const orig = el.textContent.trim();
      el.setAttribute('data-original-en', orig);
    }

    const origText = el.getAttribute('data-original-en');
    if (!origText) return;

    if (targetLang === 'en') {
      el.textContent = origText;
      return;
    }

    const mapping = contentMap[origText];
    if (mapping && mapping[targetLang]) {
      el.textContent = mapping[targetLang];
    }
  });
}

/**
 * Initializes language switcher events
 */
function initializeI18n() {
  const currentLang = getCurrentLanguage();
  applyLanguage(currentLang);

  const selectors = document.querySelectorAll('#languageSelector, .language-selector select');
  selectors.forEach((sel) => {
    sel.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  });
}

// Expose globally
window.t = t;
window.applyLanguage = applyLanguage;
window.getCurrentLanguage = getCurrentLanguage;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeI18n);
} else {
  initializeI18n();
}
