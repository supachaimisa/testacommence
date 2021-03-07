const getData = async () => {
    const result = await fetch('list.json')
                        .then(res => res.json())
    return result
}

const FindWeeksPassed = (priorMilli) => {
    let todayMilli = Date.now();
    let milliDelta = todayMilli - priorMilli;
    let milliWeeks = milliDelta / 604800000;
    return Math.floor(milliWeeks);
}
const writeList = async () => {
    let data = await getData()
    let list = document.getElementById('list')
    console.log('data',data);
    
    data.map((items,idx) => {

        items.price = (items.price % items.price === 0) ? items.price+'.00' : items.price 
        let star = `` 
        for (let i = 1; i <= items.vote; i++) {
            star += `<i class="fas fa-star" style="color: red;"></i>`
        }
        let date = items.created_at.split('-')
        // console.log(date[0] , date[1] ,date[2].split(' ')[0])
        let todaydate = new Date();
        let oneJan =  new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2].split(' ')[0]))
        let numberOfDays =  Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000))
        let result = Math.ceil(( todaydate.getDay() + 1 + numberOfDays) / 7);   
        // document.write("Week Numbers of current date (" + todaydate + 
        // ") is: <br>" + result);
        list.innerHTML += `
        <div class="col-md-3" align="center">
            <div class="card border-light mb-3" style="max-width: 18rem;">
                <img src="${items.image_url}" class="card-img-top" alt="...">
                <div class="card-body" align="left">
                    <h5 class="card-title">${items.title}</h5>
                    <p class="card-text">${result} weeks ago</p>
                    <p class="card-text">฿${items.price}</p>
                    ${star}
                </div>
            </div>
        </div>
        `
    })
    
}
writeList()