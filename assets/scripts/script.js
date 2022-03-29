const [start,end] = [9,18];
const currentTime = 12;
const tbody = $("tbody");
console.log(tbody)

for (i=start;i<end;i++){
    let bgColor;
    if (i<currentTime){
        bgColor = "bg-light"
    }
    else if(i===currentTime){
        bgColor = "bg-danger"
    }
    else bgColor = "bg-success";
    const row = $("<tr>");
    const hour = $("<td>");
    hour.addClass("col-2")
    hour.text(i===12?12:i%12);
    const item = $("<td>");
    item.addClass("col-9 "+bgColor);
    const input = $("<textarea>")
    input.addClass("col-12")
    item.append(input)
    const saveBtn = $("<td>");
    saveBtn.text("#128274")
    saveBtn.addClass("col-1 bg-primary text-white");
    [hour,item,saveBtn].forEach(el=>{
        row.append(el)
    })
    tbody.append(row)
}