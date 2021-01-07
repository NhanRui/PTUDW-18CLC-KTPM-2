
const starsTotal=5;
function getRatings(numberRating, objectRating){
    var num=5
    if (num===null)
    {
        num=5;
    }
    else
    {
        num=parseFloat(numberRating)
    }
    const starPercentage=num/starsTotal *100;
    document.querySelector(`.${objectRating} .stars-inner`).style.width=`${starPercentage}%`;
}