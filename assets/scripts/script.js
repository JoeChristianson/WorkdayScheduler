const [start,end] = [8,18];

const tbody = $("tbody");
const currentTime = moment();
const currentDayEl = $("#currentDay")
const currentDayText = currentTime.format("dddd MMMM Do YYYY, h:mm:ss a")
currentDayEl.text(currentDayText);
const currentHour = Math.floor(currentTime.hour());
let schedule = JSON.parse(localStorage.getItem("schedule"))||{};


for (i=start;i<end;i++){
    let bgColor;
    let color=""
    if (i<currentHour){
        bgColor = "past";
    }
    else if(i===currentHour){
        bgColor = "present"
    }
    else {
        bgColor = "future";
    }
    const row = $("<tr>");
    const hour = $("<td>");
    hour.addClass("col-2");
    hour.text(i===12?12:i%12);
    hour.data("hour",i)
    const item = $("<td>");
    item.addClass("col-9 "+bgColor+" item ");
    const input = $("<textarea>")
    input.addClass(color)
    input.addClass("col-12")
    input.attr("data-hour",i)
    input.val(schedule[i])
    item.append(input)
    const saveBtn = $("<td>");
    saveBtn.text("💾")
    saveBtn.data("hour",i)
    saveBtn.addClass("col-1 bg-primary text-white"+" custom-save-btn");
    
    [hour,item,saveBtn].forEach(el=>{
        row.append(el)
    })
    tbody.append(row)
}

tbody.on("click",".custom-save-btn",(e)=>{
    const el = $(e.target)
    save(el.data().hour)
})

function save(hour){
    console.log(hour)
    const el = $("textarea[data-hour='"+hour+"']")
    const text = el.val()
    schedule[hour]=text;
    localStorage.setItem("schedule",JSON.stringify(schedule))
}