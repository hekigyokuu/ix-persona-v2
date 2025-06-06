// << TEST QUESTIONNAIRE ARRAY OF OBJECTS - containing a question and points that corresponds in object >>
const testQuestions = [
    // Type 1 (Reformer) vs Type 7 (Enthusiast)
    {
        statementA:
            "I have strict moral standards and get frustrated when others don't follow rules.",
        statementB:
            'I prefer keeping my options open and avoid being constrained by too many rules.',
        typePointsA: { 'The Reformer': 1 },
        typePointsB: { 'The Enthusiast': 1 },
    },

    // Type 2 (Helper) vs Type 5 (Investigator)
    {
        statementA:
            'I instinctively know what others need and often put their needs before my own.',
        statementB:
            'I need plenty of alone time to analyze things before engaging with others.',
        typePointsA: { 'The Helper': 1 },
        typePointsB: { 'The Investigator': 1 },
    },

    // Type 3 (Achiever) vs Type 9 (Peacemaker)
    {
        statementA:
            'I adapt my personality to impress others and win admiration.',
        statementB:
            "I'm content blending into the background and avoiding competition.",
        typePointsA: { 'The Achiever': 1 },
        typePointsB: { 'The Peacemaker': 1 },
    },

    // Type 4 (Individualist) vs Type 6 (Loyalist)
    {
        statementA:
            'I frequently experience deep emotions and a sense of being different from others.',
        statementB:
            'I seek security through reliable systems and trustworthy authorities.',
        typePointsA: { 'The Individualist': 1 },
        typePointsB: { 'The Loyalist': 1 },
    },

    // Type 8 (Challenger) vs Type 1 (Reformer)
    {
        statementA:
            'I take charge in crises and protect those I care about through direct action.',
        statementB:
            'I lead by setting a perfect example of how things should be done.',
        typePointsA: { 'The Challenger': 1 },
        typePointsB: { 'The Reformer': 1 },
    },

    // Type 7 (Enthusiast) vs Type 5 (Investigator)
    {
        statementA:
            'I crave new experiences and quickly move on when something gets boring.',
        statementB:
            'I immerse myself deeply in subjects that fascinate me for long periods.',
        typePointsA: { 'The Enthusiast': 1 },
        typePointsB: { 'The Investigator': 1 },
    },

    // Type 9 (Peacemaker) vs Type 3 (Achiever)
    {
        statementA:
            'I maintain peace by accommodating others and minimizing conflict.',
        statementB:
            'I push myself to achieve recognition and measurable success.',
        typePointsA: { 'The Peacemaker': 1 },
        typePointsB: { 'The Achiever': 1 },
    },

    // Type 6 (Loyalist) vs Type 8 (Challenger)
    {
        statementA: 'I prepare for worst-case scenarios to feel secure.',
        statementB: 'I confront threats head-on without hesitation.',
        typePointsA: { 'The Loyalist': 1 },
        typePointsB: { 'The Challenger': 1 },
    },

    // Type 4 (Individualist) vs Type 2 (Helper)
    {
        statementA:
            'I express my unique identity even if it makes me stand out.',
        statementB: 'I shape myself to be what others need me to be.',
        typePointsA: { 'The Individualist': 1 },
        typePointsB: { 'The Helper': 1 },
    },
    // Question 11: Type 5 vs Type 8
    {
        statementA:
            'I observe situations carefully before taking action to ensure I understand all variables.',
        statementB:
            'I trust my gut instincts and take immediate action when I see something that needs changing.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Challenger': 1 }, // Type 8
    },

    // Question 12: Type 6 vs Type 9
    {
        statementA:
            "I play devil's advocate to anticipate potential problems in plans.",
        statementB: 'I focus on common ground to help groups reach consensus.',
        typePointsA: { 'The Loyalist': 1 }, // Type 6
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 13: Type 2 vs Type 4
    {
        statementA: "I can quickly sense and adapt to others' emotional needs.",
        statementB:
            'I need others to recognize and appreciate my authentic self.',
        typePointsA: { 'The Helper': 1 }, // Type 2
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 14: Type 3 vs Type 7
    {
        statementA:
            'I carefully cultivate my image to project success and competence.',
        statementB:
            'I pursue exciting opportunities without worrying about how others perceive me.',
        typePointsA: { 'The Achiever': 1 }, // Type 3
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 15: Type 1 vs Type 6
    {
        statementA:
            'I have clear principles about how people should behave in different situations.',
        statementB:
            'I look to trusted authorities or systems to determine the right course of action.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Loyalist': 1 }, // Type 6
    },

    // Question 16: Type 8 vs Type 2
    {
        statementA:
            'I protect vulnerable people by confronting injustice directly.',
        statementB:
            'I support vulnerable people by nurturing their emotional needs.',
        typePointsA: { 'The Challenger': 1 }, // Type 8
        typePointsB: { 'The Helper': 1 }, // Type 2
    },

    // Question 17: Type 4 vs Type 7
    {
        statementA:
            'I explore my complex emotions through creative expression.',
        statementB:
            'I avoid dwelling on negative emotions by staying busy with new activities.',
        typePointsA: { 'The Individualist': 1 }, // Type 4
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 18: Type 5 vs Type 9
    {
        statementA:
            'I withdraw to process information before engaging with the world.',
        statementB: 'I go with the flow rather than overanalyzing situations.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 19: Type 3 vs Type 6
    {
        statementA:
            "I adapt my behavior to excel in whatever environment I'm in.",
        statementB:
            'I seek clear guidelines about expectations in different situations.',
        typePointsA: { 'The Achiever': 1 }, // Type 3
        typePointsB: { 'The Loyalist': 1 }, // Type 6
    },

    // Question 20: Type 1 vs Type 4
    {
        statementA:
            'I strive to meet high standards of correctness in everything I do.',
        statementB:
            'I value authentic self-expression more than getting everything perfect.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 21: Type 7 vs Type 9
    {
        statementA:
            'I constantly seek new experiences to stay stimulated and avoid boredom.',
        statementB:
            'I prefer familiar routines that help me maintain inner peace.',
        typePointsA: { 'The Enthusiast': 1 }, // Type 7
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 22: Type 2 vs Type 8
    {
        statementA:
            'I build connections by being emotionally supportive and accommodating.',
        statementB:
            'I build connections by being direct and protecting my inner circle.',
        typePointsA: { 'The Helper': 1 }, // Type 2
        typePointsB: { 'The Challenger': 1 }, // Type 8
    },

    // Question 23: Type 5 vs Type 3
    {
        statementA: 'I develop deep expertise in niche areas that interest me.',
        statementB:
            'I develop broad competencies that help me advance in visible ways.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Achiever': 1 }, // Type 3
    },

    // Question 24: Type 6 vs Type 7
    {
        statementA: 'I prepare contingency plans for potential problems.',
        statementB: 'I trust that I can improvise solutions if problems arise.',
        typePointsA: { 'The Loyalist': 1 }, // Type 6
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 25: Type 9 vs Type 1
    {
        statementA:
            "I mediate conflicts by helping people understand each other's perspectives.",
        statementB:
            'I resolve conflicts by clarifying right vs. wrong behavior.',
        typePointsA: { 'The Peacemaker': 1 }, // Type 9
        typePointsB: { 'The Reformer': 1 }, // Type 1
    },

    // Question 26: Type 4 vs Type 5
    {
        statementA:
            'I express my identity through unique aesthetic choices and emotional depth.',
        statementB:
            'I express myself through intellectual pursuits and specialized knowledge.',
        typePointsA: { 'The Individualist': 1 }, // Type 4
        typePointsB: { 'The Investigator': 1 }, // Type 5
    },

    // Question 27: Type 8 vs Type 3
    {
        statementA:
            'I speak bluntly and take charge regardless of social consequences.',
        statementB:
            'I strategically present myself in ways that earn respect and admiration.',
        typePointsA: { 'The Challenger': 1 }, // Type 8
        typePointsB: { 'The Achiever': 1 }, // Type 3
    },

    // Question 28: Type 2 vs Type 7
    {
        statementA:
            'I remember important details about people to strengthen our connection.',
        statementB:
            'I enjoy meeting new people and having lighthearted fun together.',
        typePointsA: { 'The Helper': 1 }, // Type 2
        typePointsB: { 'The Enthusiast': 1 }, // Type 7
    },

    // Question 29: Type 1 vs Type 5
    {
        statementA:
            'I organize systems to ensure efficiency and moral correctness.',
        statementB:
            'I develop systems to understand complex ideas and conserve energy.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Investigator': 1 }, // Type 5
    },

    // Question 30: Type 6 vs Type 4
    {
        statementA:
            'I look to traditions or reliable authorities for guidance.',
        statementB:
            "I reject conventions that don't align with my personal truth.",
        typePointsA: { 'The Loyalist': 1 }, // Type 6
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 31: Type 9 vs Type 2
    {
        statementA: "I maintain harmony by accommodating others' preferences.",
        statementB: "I maintain connections by anticipating others' needs.",
        typePointsA: { 'The Peacemaker': 1 }, // Type 9
        typePointsB: { 'The Helper': 1 }, // Type 2
    },

    // Question 32: Type 7 vs Type 5
    {
        statementA:
            'I keep my schedule packed with diverse activities to stay engaged.',
        statementB:
            'I protect my unscheduled time for deep focus on interests.',
        typePointsA: { 'The Enthusiast': 1 }, // Type 7
        typePointsB: { 'The Investigator': 1 }, // Type 5
    },

    // Question 33: Type 3 vs Type 4
    {
        statementA:
            'I work hard to achieve recognition for my accomplishments.',
        statementB:
            'I work hard to create things that express my unique perspective.',
        typePointsA: { 'The Achiever': 1 }, // Type 3
        typePointsB: { 'The Individualist': 1 }, // Type 4
    },

    // Question 34: Type 8 vs Type 9
    {
        statementA: 'I confront problems directly to prevent future issues.',
        statementB:
            'I let minor problems go to maintain positive relationships.',
        typePointsA: { 'The Challenger': 1 }, // Type 8
        typePointsB: { 'The Peacemaker': 1 }, // Type 9
    },

    // Question 35: Type 1 vs Type 2
    {
        statementA:
            "I correct people when they're doing something wrong to help them improve.",
        statementB:
            'I support people unconditionally even when they make mistakes.',
        typePointsA: { 'The Reformer': 1 }, // Type 1
        typePointsB: { 'The Helper': 1 }, // Type 2
    },

    // Question 36: Type 5 vs Type 6
    {
        statementA:
            'I develop knowledge systems to feel prepared intellectually.',
        statementB: 'I develop safety systems to feel prepared practically.',
        typePointsA: { 'The Investigator': 1 }, // Type 5
        typePointsB: { 'The Loyalist': 1 }, // Type 6
    },
];
