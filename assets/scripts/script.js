// Use 24 hour not 12 hour for values
const [start,end] = [9,18];

const tbody = $("tbody");
const currentTime = moment();
const currentDayEl = $("#currentDay")
// Rendered in header
const currentDayText = currentTime.format("dddd MMMM Do YYYY, h:mm:ss a")
currentDayEl.text(currentDayText);
// Need to round down to whole number for the for loop below
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
    hour.addClass("col-2 hour");
    // displays 12 at noon, converts to 12 hour measurement for display
    hour.text(i===12?12:i%12);
    hour.data("hour",i)
    const item = $("<td>");
    item.addClass("col-9 "+bgColor+" item ");
    const input = $("<textarea>")
    input.addClass(color)
    input.addClass("col-12")
    input.attr("data-hour",i)
    // schedule is an object taken from local storage. Keys are integers, values are strings
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
    const el = $("textarea[data-hour='"+hour+"']")
    const text = el.val()
    schedule[hour]=text;
    localStorage.setItem("schedule",JSON.stringify(schedule))
}