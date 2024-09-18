let hour = document.getElementById("hour");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let msec = document.getElementById("msec");

let start = document.getElementById("start");
let reset = document.getElementById("reset");

let laps = document.getElementById("laps");

let interval;

let hr = 0;
let mn = 0;
let sc = 0;
let msc = 0;

let tot_hr = 0;
let tot_mn = 0;
let tot_sc = 0;
let tot_msc = 0;

let tot_lap = 0;

let start_resume = 0;

function stopwatch()
{
    msc++;

    if (msc == 100)
    {
        sc++;
        msc = 0;
    }

    if (sc == 60)
    {
        mn++;
        sc = 0;
    }

    if (mn == 60)
    {
        hr++;
        mn = 0;
        sc = 0;
    }

    hour.innerHTML = hr.toString().padStart(2, "0");
    min.innerHTML = mn.toString().padStart(2, "0");
    sec.innerHTML = sc.toString().padStart(2, "0");
    msec.innerHTML = msc.toString().padStart(2, "0");
}

function Start_Resume()
{
    if (start_resume == 0)
    {
        start.innerHTML = "Pause";

        msc++;
        msec.innerHTML = msc.toString().padStart(2, "0");
        interval = setInterval(stopwatch, 10);

        start_resume = 1;
    }

    else if (start_resume == 1)
    {
        start.innerHTML = "Resume";
        clearInterval(interval);

        start_resume = 0;
    }
}

function Reset()
{
    location.reload();
}

function Record_Lap()
{
    clearInterval(interval);

    tot_msc += msc;
    
    if (tot_msc > 100)
    {
        tot_msc %= 100;
        tot_sc++;
    }

    tot_sc += sc;

    if (tot_sc > 60)
    {
        tot_sc %= 60;
        tot_mn++;
    }

    tot_mn += mn;

    if (tot_mn > 60)
    {
        tot_mn %= 60;
        tot_hr++;
    }

    tot_hr += hr;

    tot_lap += 1;

    let row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", "lap_table")

    let lap_1 = document.createElement("div");
    lap_1.setAttribute("class", "laps");
    
    lap_1.innerHTML = "Lap " + tot_lap;
    row.appendChild(lap_1);

    let lap_2 = document.createElement("div");
    lap_2.setAttribute("class", "laps");

    lap_2.innerHTML = String(hr).padStart(2, "0") + " : " + String(mn).padStart(2, "0")+ " : " + 
                      String(sc).padStart(2, "0") + " : " + String(msc).padStart(2, "0");
    row.appendChild(lap_2);

    let lap_3 = document.createElement("div");
    lap_3.setAttribute("class", "laps");

    lap_3.innerHTML = String(tot_hr).padStart(2, "0") + " : " + String(tot_mn).padStart(2, "0") + 
                    " : " + String(tot_sc).padStart(2, "0") + " : " + String(tot_msc).padStart(2, "0");
    row.appendChild(lap_3);

    lap.appendChild(row);

    hr = 0;
    mn = 0;
    sc = 0;
    msc = 0;

    hour.innerHTML = "00";
    min.innerHTML = "00";
    sec.innerHTML = "00";
    msec.innerHTML = "00";

    start_resume = 0;

    start.innerHTML = "Start";

}