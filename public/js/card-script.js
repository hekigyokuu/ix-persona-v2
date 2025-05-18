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
                briefDesc:
                    'Focuses on the need to be correct/right with their families, their health, their finances, and their homes. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Non-Adaptable',
                briefDesc:
                    'Focuses on the need to be correct/right with their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Zeal(countertype)',
                briefDesc:
                    'Focuses on the need to be correct/right with their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                name: 'Privilege(countertype)',
                briefDesc:
                    'Focuses on the need to be charming in order to have their physical needs met. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Ambition',
                briefDesc:
                    'Focuses on the need to be charming with their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Seduction-Aggression',
                briefDesc:
                    'Focuses on the need to be charming with their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                name: 'Security(countertype)',
                briefDesc:
                    'Focuses on the need to be valuable/admired in order to have their physical needs met. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Prestige',
                briefDesc:
                    'Focuses On:  The need to be valuable/admired in their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Charisma',
                briefDesc:
                    'Focuses on the need to be valuable/admired by their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                name: 'Tenacity(countertype)',
                briefDesc:
                    'Focuses on the need to be themselves in order to have their physical needs met. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Shame',
                briefDesc:
                    'Focuses on the need to be themselves with their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Competition',
                briefDesc:
                    'Focuses on the need to be themselves with their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                briefDesc:
                    'Focuses on the need to be competent with their families, health, finances, and home. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Totem',
                briefDesc:
                    'Focuses on the need to be competent with their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Confidence(countertype)',
                briefDesc:
                    'Focuses on the need to be competent with their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                briefDesc:
                    'Focuses on the need to be secure/supported within their families, health, finances, and home. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Duty',
                briefDesc:
                    'Focuses on the need to be secure/supported with their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Strength/Beauty(countertype)',
                briefDesc:
                    'Focuses on the need to be secure/supported with their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                briefDesc:
                    'Focuses on the need to be satisfied in their families, health, finances, and home. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Sacrifice(countertype)',
                briefDesc:
                    'Focuses on the need to be satisfied with their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Suggestibility',
                briefDesc:
                    'Focuses on the need to be satisfied with their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                briefDesc:
                    'Focuses on the need to be protective of their families, health, finances, and home. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Solidarity(countertype)',
                briefDesc:
                    'Focuses on the need to be protective of their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Possession',
                briefDesc:
                    'Focuses on the need to be protective of their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
                briefDesc:
                    'Focuses on the need to be at peace with their families, health, finances, and home. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SO',
                name: 'Participation(countertype)',
                briefDesc:
                    'Focuses on the need to be at peace with their groups and communities. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
            },
            {
                type: 'SX',
                name: 'Fusion',
                briefDesc:
                    'Focuses On:  The need to be at peace with their intimate connections. Flip card for full details.',
                fullDesc:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus similique saepe quos reprehenderit dicta nemo magni fugit, ducimus voluptatum illum fugiat tempore consequuntur adipisci, maiores recusandae molestias officia incidunt eaque.',
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
        <div class="card-img"></div>
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
