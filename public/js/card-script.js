const svgTypesPosterContainer = document.getElementById(
    'svg-types-poster-container'
);

svgTypesPosterContainer.innerHTML += svgTypesPoster;

const types = [
    {
        id: 'type-one',
        title: 'Type 1: The Reformer',
        titleDesc:
            'The Rational, Idealistic Type: Principled, Purposeful, Self-Controlled, and Perfectionistic.',
        cards: [
            {
                type: 'SP',
                name: 'Worry',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be correct/right with their families, health, finance, ...',
                fullDesc:
                    'Channels frustration into self-discipline and personal improvement, striving for perfection in daily tasks. They often feel responsible for doing things “the right way” and can become anxious about mistakes.',
            },
            {
                type: 'SO',
                name: 'Non-Adaptable',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be correct/right with their groups and communities.',
                fullDesc:
                    'Focused on improving society by upholding high standards and being a moral example to others. They often resist compromising values, even when it isolates them socially.',
            },
            {
                type: 'SX',
                name: 'CT - Zeal',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be correct/right with their intimate connections.',
                fullDesc:
                    ' Expresses passionate idealism in close relationships and aims to reform others. Their intensity can come off as rigid or controlling but stems from deep conviction.',
            },
        ],
    },
    {
        id: 'type-two',
        title: 'Type 2: The Helper',
        titleDesc:
            'The Caring, Interpersonal Type: Demonstrative, Generous, People-Pleasing, and Possessive',
        cards: [
            {
                type: 'SP',
                name: 'CT - Privilege',
                svg: svgHelper,
                briefDesc:
                    'Focuses on the need to be charming in order to have their physical needs met. ',
                fullDesc:
                    'Wants to be loved for who they are and may act childlike or charming to attract nurturing. They tend to avoid showing how much they actually need others.',
            },
            {
                type: 'SO',
                name: 'Ambition',
                svg: svgHelper,
                briefDesc:
                    'Focuses on the need to be charming with their groups and communities.',
                fullDesc:
                    'Seeks admiration and influence in social groups through strategic helpfulness. They may present a polished persona to rise in status while hiding their deeper emotional needs.',
            },
            {
                type: 'SX',
                name: 'Seduction-Aggression',
                svg: svgHelper,
                briefDesc:
                    'Focuses on the need to be charming with their intimate connections.',
                fullDesc:
                    'Uses emotional intensity to bond deeply with specific individuals, aiming to feel needed and powerful. Their desire to be irreplaceable can become possessive.',
            },
        ],
    },
    {
        id: 'type-three',
        title: 'Type 3: The Achiever',
        titleDesc:
            'The Success-Oriented, Pragmatic Type: Adaptive, Excelling, Driven, and Image- Conscious',
        cards: [
            {
                type: 'SP',
                name: 'CT - Security',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be valuable/admired to have their physical needs met.',
                fullDesc:
                    'Strives for success quietly, focusing more on inner efficiency and productivity than external praise. They may downplay accomplishments while still deeply identifying with performance.',
            },
            {
                type: 'SO',
                name: 'Prestige',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be valuable/admired in their groups and communities.',
                fullDesc:
                    'Wants to be admired for their image, competence, and social value, often tailoring themselves to fit public ideals. They excel in roles that allow visibility and validation.',
            },
            {
                type: 'SX',
                name: 'Charisma',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be valuable/admired by their intimate connections.',
                fullDesc:
                    'Focuses on being attractive and inspiring in one-on-one relationships, using charm to win others over. They may struggle with authenticity when adapting to different expectations.',
            },
        ],
    },
    {
        id: 'type-four',
        title: 'Type 4: The Individualist',
        titleDesc:
            'The Sensitive,	Withdrawn Type: Expressive,	Dramatic, Self-Absorbed, and Temperamental',
        cards: [
            {
                type: 'SP',
                name: 'CT - Tenacity',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be themselves in order to have their physical needs met.',
                fullDesc:
                    'Appears emotionally restrained while enduring deep feelings beneath the surface. They try to prove strength by being self-sufficient despite inner sensitivity.',
            },
            {
                type: 'SO',
                name: 'Shame',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be themselves with their groups and communities.',
                fullDesc:
                    'Feels socially different or flawed and may externalize their suffering to gain understanding and connection. Their emotional vulnerability can become a source of identity.',
            },
            {
                type: 'SX',
                name: 'Competition',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be themselves with their intimate connections.',
                fullDesc:
                    'Pursues deep, emotionally intense relationships with a strong desire to be special or irreplaceable. They may compare themselves constantly and feel driven to stand out.',
            },
        ],
    },
    {
        id: 'type-five',
        title: 'Type 5: The Investigator',
        titleDesc:
            'The Intense, Cerebral Type: Perceptive, Innovative, Secretive, and Isolated',
        cards: [
            {
                type: 'SP',
                name: 'Castle',
                svg: svgInvestigator,
                briefDesc:
                    'Focuses on the need to be competent with their families, health, finances, ...',
                fullDesc:
                    'Withdraws into a private space to conserve energy and avoid being dependent. They minimize needs and emotions, often preferring solitude to connection.',
            },
            {
                type: 'SO',
                name: 'Totem',
                svg: svgInvestigator,
                briefDesc:
                    'Focuses on the need to be competent with their groups and communities.',
                fullDesc:
                    'Seeks belonging through shared intellectual interests, often becoming a valued expert within a group. They value knowledge as a means to gain safety and respect.',
            },
            {
                type: 'SX',
                name: 'CT - Confidence',
                svg: svgInvestigator,
                briefDesc:
                    'Focuses on the need to be competent with their intimate connections.',
                fullDesc:
                    'Desires deep, meaningful one-on-one bonds but fears emotional overwhelm. They may show surprising boldness in intimate settings while remaining guarded elsewhere.',
            },
        ],
    },
    {
        id: 'type-six',
        title: 'Type 6: The Loyalist',
        titleDesc:
            'The Committed, Security-Oriented Type: Engaging, Responsible, Anxious, and Suspicious',
        cards: [
            {
                type: 'SP',
                name: 'Warmth',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be secure/supported within their families, health, ...',
                fullDesc:
                    'Seeks safety in trusted relationships and prefers caution over risk. They can appear friendly and reliable while struggling with inner anxiety.',
            },
            {
                type: 'SO',
                name: 'Duty',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be secure/supported with their groups and communities.',
                fullDesc:
                    'Follows rules and aligns with authority to reduce uncertainty and doubt. They find comfort in contributing to structured systems and group values.',
            },
            {
                type: 'SX',
                name: 'CT - Strength | Beauty',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be secure/supported with their intimate connections.',
                fullDesc:
                    'Faces fear head-on by appearing strong, assertive, or even intimidating. They often rely only on themselves and distrust external structures.',
            },
        ],
    },
    {
        id: 'type-seven',
        title: 'Type 7: The Enthusiast',
        titleDesc:
            'The Busy, Fun-Loving Type: Spontaneous, Versatile, Distractible, and Scattered',
        cards: [
            {
                type: 'SP',
                name: 'Keepers of the Castle',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be satisfied in their families, health, finances, and home.',
                fullDesc:
                    'Seeks comfort and enjoyment through planning and accumulating experiences or resources. They’re often practical yet optimistic, using alliances to secure pleasure.',
            },
            {
                type: 'SO',
                name: 'CT - Sacrifice',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be satisfied with their groups and communities.',
                fullDesc:
                    'Prioritizes group needs and aims to be of service, often downplaying their personal desires. They may feel conflicted between helping others and pursuing their own freedom.',
            },
            {
                type: 'SX',
                name: 'Suggestibility',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be satisfied with their intimate connections.',
                fullDesc:
                    'Chases intense relationships and idealizes romantic partners as a source of joy and excitement. They are highly imaginative and can lose touch with reality in pursuit of pleasure.',
            },
        ],
    },
    {
        id: 'type-eight',
        title: 'Type 8: The Challenger',
        titleDesc:
            'The Powerful, Dominating Type: Self-Confident,	Decisive, Willful, and Confrontational',
        cards: [
            {
                type: 'SP',
                name: 'Satisfaction',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be protective of their families, health, finances, and home.',
                fullDesc:
                    'Protects their territory and loved ones through control and self-reliance, aiming for material security. They often hide vulnerability behind a strong and quiet exterior.',
            },
            {
                type: 'SO',
                name: 'CT - Solidarity',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be protective of their groups and communities.',
                fullDesc:
                    'Leads by defending others and fighting for justice, focusing on fairness over domination. They may soften their power in favor of serving the group.',
            },
            {
                type: 'SX',
                name: 'Possession',
                svg: svgReformer,
                briefDesc:
                    'Focuses on the need to be protective of their intimate connections.',
                fullDesc:
                    'Forms intense, powerful bonds and seeks control within close relationships. Their passion often expresses as dominance and deep emotional attachment.',
            },
        ],
    },
    {
        id: 'type-nine',
        title: 'Type 9: The Peacemaker',
        titleDesc:
            'The Easygoing, Self-Effacing Type: Receptive, Reassuring, Agreeable, and Complacent',
        cards: [
            {
                type: 'SP',
                name: 'Appetite',
                svg: svgPeacemaker,
                briefDesc:
                    'Focuses on the need to be at peace with their families, health, finances, and home.',
                fullDesc:
                    'Seeks comfort in routine and familiar pleasures, avoiding stress by staying in their safe zone. They may procrastinate or disengage to maintain peace.',
            },
            {
                type: 'SO',
                name: 'CT - Participation',
                svg: svgPeacemaker,
                briefDesc:
                    'Focuses on the need to be at peace with their groups and communities.',
                fullDesc:
                    'Engages actively in groups to create harmony, often forgetting personal priorities. They may appear outgoing while repressing inner conflict.',
            },
            {
                type: 'SX',
                name: 'Fusion',
                svg: svgPeacemaker,
                briefDesc:
                    'Focuses On:  The need to be at peace with their intimate connections.',
                fullDesc:
                    'Merges with partners to maintain connection, often losing their own sense of identity. They avoid conflict by aligning completely with others desires or feelings.',
            },
        ],
    },
];

function createCard(cardData) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <div class="card-name">
          <div class="card-type">${cardData.type}</div>
          ${cardData.name}
        </div>
        <div class="card-img">${cardData.svg}</div>
        <div class="card-brief-description">${cardData.briefDesc}</div>
      </div>
      <div class="card-back">
        <div class="card-full-description">${cardData.fullDesc}</div>
      </div>
    </div>
  `;
    return card;
}

function createType(typeData) {
    const typeDiv = document.createElement('div');
    typeDiv.id = typeData.id;
    typeDiv.className = 'type';

    const heading = document.createElement('h3');
    heading.textContent = typeData.title;
    typeDiv.appendChild(heading);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'title-description-container';
    typeDiv.append(infoDiv);

    const infoForDiv = document.createElement('p');
    infoForDiv.textContent = typeData.titleDesc;
    infoDiv.append(infoForDiv);

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    typeData.cards.forEach((cardData) => {
        const card = createCard(cardData);
        cardContainer.appendChild(card);
    });

    typeDiv.appendChild(cardContainer);

    const typeBottom = document.createElement('div');
    typeBottom.className = 'type-bottom';
    typeDiv.appendChild(typeBottom);

    return typeDiv;
}

const container = document.getElementById('types-container-personalities');

types.forEach((typeData) => {
    const typeElement = createType(typeData);
    container.appendChild(typeElement);
});

document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
