export function getHarshFeedback(question: string, answer: string): any {
  const answerLength = answer.length;
  const answerLower = answer.toLowerCase();
  
  // Ultra-strict STAR Method Detection
  // Situation: Must have clear context or background
  const hasSituation = /(situation|context|background|when|where|at|during|while|in|the time|that time|it was|this was|the project|the team|the company|the organization|the department|the role|the position|the job|the work|the assignment|the task|the challenge|the problem|the issue|the conflict|the disagreement|the difficulty|the obstacle|the barrier|the setback|the failure|the mistake|the error|the bug)/.test(answerLower);
  
  // Task: Must have clear goal or objective
  const hasTask = /(task|goal|objective|target|aim|purpose|mission|responsibility|duty|role|job|work|assignment|project|challenge|problem|issue|conflict|disagreement|difficulty|obstacle|barrier|setback|failure|mistake|error|bug|requirement|specification|expectation|standard|criteria|measure|metric|indicator|sign|signal|clue|hint|tip|pointer|guide|direction|path|route|way)/.test(answerLower);
  
  // Action: Must have specific actions taken
  const hasAction = /(action|what i did|what we did|how i|how we|i implemented|i developed|i created|i built|i designed|i managed|i led|i coordinated|i analyzed|i resolved|i improved|i optimized|i increased|i decreased|i reduced|i enhanced|i streamlined|i facilitated|i collaborated|i communicated|i presented|i delivered|i achieved|i accomplished|i completed|i executed|i launched|i deployed|i tested|i debugged|i refactored|i scaled|i migrated|i integrated|i configured|i customized|i automated|i monitored|i tracked|i measured|i evaluated|i assessed|i reviewed|i audited|i documented|i trained|i mentored|i guided|i supported|i assisted|i helped|i contributed|i participated|i involved|i engaged|i interacted|i negotiated|i persuaded|i influenced|i convinced|i motivated|i inspired|i encouraged|i empowered|i enabled|i facilitated|i coordinated|i organized|i planned|i scheduled|i prioritized|i allocated|i distributed|i assigned|i delegated|i supervised|i oversaw|i managed|i controlled|i governed|i regulated)/.test(answerLower);
  
  // Result: Must have measurable outcomes or impact
  const hasResult = /(result|outcome|impact|effect|consequence|benefit|value|worth|merit|strength|advantage|edge|skill|ability|talent|gift|passion|interest|motivation|drive|ambition|goal|objective|target|aim|purpose|mission|vision|dream|aspiration|hope|wish|desire|want|need|requirement|expectation|standard|criteria|measure|metric|indicator|sign|signal|clue|hint|tip|pointer|guide|direction|path|route|way|increased|decreased|improved|reduced|saved|earned|generated|produced|delivered|achieved|accomplished|completed|executed|launched|deployed|tested|debugged|refactored|scaled|migrated|integrated|configured|customized|automated|monitored|tracked|measured|evaluated|assessed|reviewed|audited|documented|trained|mentored|guided|supported|assisted|helped|contributed|participated|involved|engaged|interacted|negotiated|persuaded|influenced|convinced|motivated|inspired|encouraged|empowered|enabled|facilitated|coordinated|organized|planned|scheduled|prioritized|allocated|distributed|assigned|delegated|supervised|oversaw|managed|controlled|governed|regulated|%|percent|percentage|times|fold|x|multiplied|doubled|tripled|halved|quarter|half|quarter|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|dozen|hundred|thousand|million|billion|trillion|k|m|b|t|kilo|mega|giga|tera|peta|exa|zetta|yotta|deca|hecto|deci|centi|milli|micro|nano|pico|femto|atto|zepto|yocto)/.test(answerLower);
  
  // Ultra-strict STAR method detection - look for actual structure
  const hasProperSituation = /(situation|context|background|when|where|at|during|while|in|the time|that time|it was|this was|the project|the team|the company|the organization|the department|the role|the position|the job|the work|the assignment|the task|the challenge|the problem|the issue|the conflict|the disagreement|the difficulty|the obstacle|the barrier|the setback|the failure|the mistake|the error|the bug)/.test(answerLower);
  
  const hasProperTask = /(task|goal|objective|target|aim|purpose|mission|responsibility|duty|role|job|work|assignment|project|challenge|problem|issue|conflict|disagreement|difficulty|obstacle|barrier|setback|failure|mistake|error|bug|requirement|specification|expectation|standard|criteria|measure|metric|indicator|sign|signal|clue|hint|tip|pointer|guide|direction|path|route|way)/.test(answerLower);
  
  const hasProperAction = /(action|what i did|what we did|how i|how we|i implemented|i developed|i created|i built|i designed|i managed|i led|i coordinated|i analyzed|i resolved|i improved|i optimized|i increased|i decreased|i reduced|i enhanced|i streamlined|i facilitated|i collaborated|i communicated|i presented|i delivered|i achieved|i accomplished|i completed|i executed|i launched|i deployed|i tested|i debugged|i refactored|i scaled|i migrated|i integrated|i configured|i customized|i automated|i monitored|i tracked|i measured|i evaluated|i assessed|i reviewed|i audited|i documented|i trained|i mentored|i guided|i supported|i assisted|i helped|i contributed|i participated|i involved|i engaged|i interacted|i negotiated|i persuaded|i influenced|i convinced|i motivated|i inspired|i encouraged|i empowered|i enabled|i facilitated|i coordinated|i organized|i planned|i scheduled|i prioritized|i allocated|i distributed|i assigned|i delegated|i supervised|i oversaw|i managed|i controlled|i governed|i regulated)/.test(answerLower);
  
  const hasProperResult = /(result|outcome|impact|effect|consequence|benefit|value|worth|merit|strength|advantage|edge|skill|ability|talent|gift|passion|interest|motivation|drive|ambition|goal|objective|target|aim|purpose|mission|vision|dream|aspiration|hope|wish|desire|want|need|requirement|expectation|standard|criteria|measure|metric|indicator|sign|signal|clue|hint|tip|pointer|guide|direction|path|route|way|increased|decreased|improved|reduced|saved|earned|generated|produced|delivered|achieved|accomplished|completed|executed|launched|deployed|tested|debugged|refactored|scaled|migrated|integrated|configured|customized|automated|monitored|tracked|measured|evaluated|assessed|reviewed|audited|documented|trained|mentored|guided|supported|assisted|helped|contributed|participated|involved|engaged|interacted|negotiated|persuaded|influenced|convinced|motivated|inspired|encouraged|empowered|enabled|facilitated|coordinated|organized|planned|scheduled|prioritized|allocated|distributed|assigned|delegated|supervised|oversaw|managed|controlled|governed|regulated|%|percent|percentage|times|fold|x|multiplied|doubled|tripled|halved|quarter|half|quarter|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|dozen|hundred|thousand|million|billion|trillion|k|m|b|t|kilo|mega|giga|tera|peta|exa|zetta|yotta|deca|hecto|deci|centi|milli|micro|nano|pico|femto|atto|zepto|yocto)/.test(answerLower);
  
  // Even stricter STAR method detection - require multiple indicators
  const hasStrictSituation = /(situation|context|background|when|where|at|during|while|in|the time|that time|it was|this was|the project|the team|the company|the organization|the department|the role|the position|the job|the work|the assignment|the task|the challenge|the problem|the issue|the conflict|the disagreement|the difficulty|the obstacle|the barrier|the setback|the failure|the mistake|the error|the bug)/.test(answerLower);
  
  const hasStrictTask = /(task|goal|objective|target|aim|purpose|mission|responsibility|duty|role|job|work|assignment|project|challenge|problem|issue|conflict|disagreement|difficulty|obstacle|barrier|setback|failure|mistake|error|bug|requirement|specification|expectation|standard|criteria|measure|metric|indicator|sign|signal|clue|hint|tip|pointer|guide|direction|path|route|way)/.test(answerLower);
  
  const hasStrictAction = /(action|what i did|what we did|how i|how we|i implemented|i developed|i created|i built|i designed|i managed|i led|i coordinated|i analyzed|i resolved|i improved|i optimized|i increased|i decreased|i reduced|i enhanced|i streamlined|i facilitated|i collaborated|i communicated|i presented|i delivered|i achieved|i accomplished|i completed|i executed|i launched|i deployed|i tested|i debugged|i refactored|i scaled|i migrated|i integrated|i configured|i customized|i automated|i monitored|i tracked|i measured|i evaluated|i assessed|i reviewed|i audited|i documented|i trained|i mentored|i guided|i supported|i assisted|i helped|i contributed|i participated|i involved|i engaged|i interacted|i negotiated|i persuaded|i influenced|i convinced|i motivated|i inspired|i encouraged|i empowered|i enabled|i facilitated|i coordinated|i organized|i planned|i scheduled|i prioritized|i allocated|i distributed|i assigned|i delegated|i supervised|i oversaw|i managed|i controlled|i governed|i regulated)/.test(answerLower);
  
  const hasStrictResult = /(result|outcome|impact|effect|consequence|benefit|value|worth|merit|strength|advantage|edge|skill|ability|talent|gift|passion|interest|motivation|drive|ambition|goal|objective|target|aim|purpose|mission|vision|dream|aspiration|hope|wish|desire|want|need|requirement|expectation|standard|criteria|measure|metric|indicator|sign|signal|clue|hint|tip|pointer|guide|direction|path|route|way|increased|decreased|improved|reduced|saved|earned|generated|produced|delivered|achieved|accomplished|completed|executed|launched|deployed|tested|debugged|refactored|scaled|migrated|integrated|configured|customized|automated|monitored|tracked|measured|evaluated|assessed|reviewed|audited|documented|trained|mentored|guided|supported|assisted|helped|contributed|participated|involved|engaged|interacted|negotiated|persuaded|influenced|convinced|motivated|inspired|encouraged|empowered|enabled|facilitated|coordinated|organized|planned|scheduled|prioritized|allocated|distributed|assigned|delegated|supervised|oversaw|managed|controlled|governed|regulated|%|percent|percentage|times|fold|x|multiplied|doubled|tripled|halved|quarter|half|quarter|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|dozen|hundred|thousand|million|billion|trillion|k|m|b|t|kilo|mega|giga|tera|peta|exa|zetta|yotta|deca|hecto|deci|centi|milli|micro|nano|pico|femto|atto|zepto|yocto)/.test(answerLower);
  
  // Other criteria
  const hasSpecificExamples = /(for example|for instance|specifically|in particular|such as|like when|one time|recently|last year|this month|at my previous job|in my current role|when i worked|during my time|in this project|in that situation)/.test(answerLower);
  const hasNumbers = /\d+/.test(answer);
  const hasTimeframes = /(weeks?|months?|years?|days?|hours?|minutes?|seconds?|ago|recently|last|next|during|while|when|before|after)/.test(answerLower);
  const hasTechnicalTerms = /(algorithm|database|api|framework|method|function|code|system|process|analysis|data|project|team|experience|challenge|solution|problem|result|outcome|improvement|optimization|efficiency|performance|quality|testing|debugging|development|implementation|design|architecture|strategy|approach|methodology|best practice|industry|trend|technology|tool|platform|software|application|service|product|feature|requirement|specification|user|customer|stakeholder|business|goal|objective|metric|kpi|success|failure|lesson|learned|growth|career|professional|leadership|collaboration|communication|presentation|documentation|research|innovation|creativity|adaptability|flexibility|reliability|scalability|security|maintainability|readability)/.test(answerLower);
  const hasActionWords = /(implemented|developed|created|built|designed|managed|led|coordinated|analyzed|resolved|improved|optimized|increased|decreased|reduced|enhanced|streamlined|facilitated|collaborated|communicated|presented|delivered|achieved|accomplished|completed|executed|launched|deployed|tested|debugged|refactored|scaled|migrated|integrated|configured|customized|automated|monitored|tracked|measured|evaluated|assessed|reviewed|audited|documented|trained|mentored|guided|supported|assisted|helped|contributed|participated|involved|engaged|interacted|negotiated|persuaded|influenced|convinced|motivated|inspired|encouraged|empowered|enabled|facilitated|coordinated|organized|planned|scheduled|prioritized|allocated|distributed|assigned|delegated|supervised|oversaw|managed|controlled|governed|regulated)/.test(answerLower);
  const hasQuantifiableResults = /(increased by|decreased by|improved by|reduced by|saved|earned|generated|produced|delivered|achieved|accomplished|completed|executed|launched|deployed|tested|debugged|refactored|scaled|migrated|integrated|configured|customized|automated|monitored|tracked|measured|evaluated|assessed|reviewed|audited|documented|trained|mentored|guided|supported|assisted|helped|contributed|participated|involved|engaged|interacted|negotiated|persuaded|influenced|convinced|motivated|inspired|encouraged|empowered|enabled|facilitated|coordinated|organized|planned|scheduled|prioritized|allocated|distributed|assigned|delegated|supervised|oversaw|managed|controlled|governed|regulated|%|percent|percentage|times|fold|x|multiplied|doubled|tripled|halved|quarter|half|quarter|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|dozen|hundred|thousand|million|billion|trillion|k|m|b|t|kilo|mega|giga|tera|peta|exa|zetta|yotta|deca|hecto|deci|centi|milli|micro|nano|pico|femto|atto|zepto|yocto)/.test(answerLower);
  const hasPersonalExperience = /(i|my|me|myself|we|our|us|ourselves|my team|my company|my organization|my department|my role|my position|my job|my work|my project|my experience|my background|my skills|my knowledge|my expertise|my understanding|my perspective|my opinion|my view|my approach|my method|my strategy|my technique|my process|my workflow|my routine|my habit|my practice|my preference|my choice|my decision|my recommendation|my suggestion|my advice|my tip|my insight|my observation|my finding|my discovery|my learning|my growth|my development|my progress|my improvement|my achievement|my success|my accomplishment|my contribution|my impact|my influence|my effect|my result|my outcome|my benefit|my value|my worth|my merit|my strength|my advantage|my edge|my skill|my ability|my talent|my gift|my passion|my interest|my motivation|my drive|my ambition|my goal|my objective|my target|my aim|my purpose|my mission|my vision|my dream|my aspiration|my hope|my wish|my desire|my want|my need|my requirement|my expectation|my standard|my criteria|my measure|my metric|my indicator|my sign|my signal|my clue|my hint|my tip|my pointer|my guide|my direction|my path|my route|my way)/.test(answerLower);
  const hasEnthusiasm = /(excited|passionate|love|enjoy|thrilled|amazing|incredible|fantastic|wonderful|great|excellent|outstanding|impressive|remarkable|extraordinary|exceptional|brilliant|outstanding|superb|magnificent|spectacular|phenomenal|incredible|amazing|fantastic|wonderful|great|excellent|outstanding|impressive|remarkable|extraordinary|exceptional|brilliant|outstanding|superb|magnificent|spectacular|phenomenal|incredible|amazing|fantastic|wonderful|great|excellent|outstanding|impressive|remarkable|extraordinary|exceptional|brilliant|outstanding|superb|magnificent|spectacular|phenomenal)/.test(answerLower);
  
  // Conciseness check
  const isTooLong = answerLength > 500;
  const isTooShort = answerLength < 100;
  
  // Calculate scores starting from 1 (very poor)
  let relevance = 1;
  let clarity = 1;
  let confidence = 1;
  
  // STAR Method scoring (most important) - use strictest detection
  const starScore = (hasStrictSituation ? 1 : 0) + (hasStrictTask ? 1 : 0) + (hasStrictAction ? 1 : 0) + (hasStrictResult ? 1 : 0);
  
  // Relevance scoring (harsh)
  if (answerLength > 50) relevance += 1;
  if (answerLength > 150) relevance += 1;
  if (hasSpecificExamples) relevance += 1;
  if (hasNumbers) relevance += 1;
  if (hasTimeframes) relevance += 1;
  if (hasTechnicalTerms) relevance += 1;
  if (hasActionWords) relevance += 1;
  if (hasQuantifiableResults) relevance += 2;
  if (hasPersonalExperience) relevance += 1;
  if (starScore >= 3) relevance += 2; // STAR method bonus
  if (starScore === 4) relevance += 1; // Perfect STAR method
  
  // Clarity scoring (harsh)
  if (answerLength > 100) clarity += 1;
  if (answerLength > 250) clarity += 1;
  if (hasSpecificExamples) clarity += 1;
  if (hasNumbers) clarity += 1;
  if (hasTimeframes) clarity += 1;
  if (hasTechnicalTerms) clarity += 1;
  if (hasActionWords) clarity += 1;
  if (hasQuantifiableResults) clarity += 1;
  if (hasPersonalExperience) clarity += 1;
  if (starScore >= 3) clarity += 2; // STAR method bonus
  if (starScore === 4) clarity += 1; // Perfect STAR method
  if (isTooLong) clarity -= 2; // Penalty for being too long
  if (isTooShort) clarity -= 1; // Penalty for being too short
  
  // Confidence scoring (harsh)
  if (answerLength > 100) confidence += 1;
  if (hasSpecificExamples) confidence += 1;
  if (hasNumbers) confidence += 1;
  if (hasTimeframes) confidence += 1;
  if (hasTechnicalTerms) confidence += 1;
  if (hasActionWords) confidence += 1;
  if (hasQuantifiableResults) confidence += 2;
  if (hasPersonalExperience) confidence += 1;
  if (hasEnthusiasm) confidence += 1;
  if (starScore >= 3) confidence += 2; // STAR method bonus
  if (starScore === 4) confidence += 1; // Perfect STAR method
  
  // Cap scores at 10
  relevance = Math.min(10, relevance);
  clarity = Math.min(10, clarity);
  confidence = Math.min(10, confidence);
  
  // Generate harsh, constructive feedback
  const feedback = [];
  
  // STAR Method feedback (most important)
  if (starScore === 0) {
    feedback.push("❌ CRITICAL: Your answer lacks structure. Use the STAR method: Situation, Task, Action, Result.");
  } else if (starScore === 1) {
    feedback.push("⚠️ POOR: Your answer is missing key STAR elements. Clearly explain the Situation, Task, Action, and Result.");
  } else if (starScore === 2) {
    feedback.push("⚠️ NEEDS WORK: Your answer partially follows STAR method but is missing important elements.");
  } else if (starScore === 3) {
    feedback.push("✅ GOOD: Your answer mostly follows STAR method. Add the missing element for a complete response.");
  } else if (starScore === 4) {
    feedback.push("✅ EXCELLENT: Perfect STAR method structure!");
  }
  
  // Length feedback
  if (isTooShort) {
    feedback.push("❌ TOO SHORT: Your answer is too brief. Interviewers expect detailed responses (150-400 words).");
  } else if (isTooLong) {
    feedback.push("⚠️ TOO LONG: Your answer is too verbose. Be more concise while maintaining detail.");
  }
  
  // Specific examples feedback
  if (!hasSpecificExamples) {
    feedback.push("❌ MISSING: No specific examples provided. Interviewers want concrete, real-world examples.");
  } else if (hasSpecificExamples) {
    feedback.push("✅ GOOD: You provided specific examples.");
  }
  
  // Quantifiable results feedback
  if (!hasQuantifiableResults) {
    feedback.push("❌ MISSING: No quantifiable results or metrics. Use numbers to show your impact.");
  } else if (hasQuantifiableResults) {
    feedback.push("✅ EXCELLENT: Great use of quantifiable results!");
  }
  
  // Action words feedback
  if (!hasActionWords) {
    feedback.push("⚠️ WEAK: Use stronger action verbs to describe your accomplishments.");
  } else if (hasActionWords) {
    feedback.push("✅ GOOD: Strong action-oriented language.");
  }
  
  // Personal experience feedback
  if (!hasPersonalExperience) {
    feedback.push("❌ MISSING: Your answer lacks personal experience. Use 'I' statements to show ownership.");
  } else if (hasPersonalExperience) {
    feedback.push("✅ GOOD: Personal experience included.");
  }
  
  // Enthusiasm feedback
  if (!hasEnthusiasm) {
    feedback.push("⚠️ FLAT: Show more enthusiasm and passion for your work.");
  } else if (hasEnthusiasm) {
    feedback.push("✅ EXCELLENT: Great enthusiasm and engagement!");
  }
  
  // Technical depth feedback
  if (!hasTechnicalTerms && answerLength > 100) {
    feedback.push("⚠️ SHALLOW: Add more technical depth to demonstrate your expertise.");
  } else if (hasTechnicalTerms) {
    feedback.push("✅ GOOD: Technical depth included.");
  }
  
  // Default feedback for very poor answers
  if (feedback.length === 0) {
    feedback.push("❌ INSUFFICIENT: Your answer needs significant improvement in structure, detail, and examples.");
  }
  
  // Generate harsh overall assessment
  let overall = "";
  const avgScore = (relevance + clarity + confidence) / 3;
  
  if (avgScore >= 8.5) {
    overall = "🏆 OUTSTANDING: Excellent interview answer! You demonstrated strong technical knowledge, used STAR method effectively, and communicated with confidence. This is what interviewers want to see.";
  } else if (avgScore >= 7.0) {
    overall = "✅ GOOD: Solid answer with good structure and examples. Minor improvements needed to make it exceptional.";
  } else if (avgScore >= 5.5) {
    overall = "⚠️ AVERAGE: Your answer is acceptable but needs significant improvement. Focus on STAR method, specific examples, and quantifiable results.";
  } else if (avgScore >= 4.0) {
    overall = "❌ POOR: This answer would not impress most interviewers. You need to completely restructure using STAR method and add concrete examples.";
  } else {
    overall = "🚫 UNACCEPTABLE: This answer is far below interview standards. You must practice the STAR method and provide detailed, specific examples with quantifiable results.";
  }
  
  return {
    relevance,
    clarity,
    confidence,
    feedback,
    overall
  };
}
