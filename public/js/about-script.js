document.addEventListener('DOMContentLoaded', () => {
    const boxOne = document.getElementById('author-box-one');
    const boxTwo = document.getElementById('author-box-two');
    const boxThree = document.getElementById('author-box-three');
    const boxFour = document.getElementById('author-box-four');

    boxOne.innerHTML += svgLoyalist;
    boxTwo.innerHTML += svgInvestigator;
    boxThree.innerHTML += svgIndividualist;
    boxFour.innerHTML += svgEnthusiast;
});
